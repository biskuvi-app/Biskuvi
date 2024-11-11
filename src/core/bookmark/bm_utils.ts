import { Config } from "../../helpers/config";
import { RsOk } from "../../helpers/result";
import { log } from "../../helpers/utils";
import { Url } from "./store_dm";

async function getDid(profileId: string) {
  if (profileId.startsWith("did:plc:")) {
    return profileId;
  }
  let resolveHandleUrl = Url.resolveHandle(profileId);
  try {
    const response = await fetch(resolveHandleUrl);
    if (!response.ok) {
      throw `response: ${response.status}`;
    }
    const json = await response.json();
    return json["did"] as string;
  } catch (error: any) {
    throw `getDid: ${error.message}`;
  }
}

async function getAtUri(postUrl: string) {
  let splitProfileFromUrl = postUrl.split("/profile/");

  if (splitProfileFromUrl.length != 2) {
    throw "bmBtnOnClick: invalid splitProfileFromUrl.length";
  }

  let splitPostFromUrl = splitProfileFromUrl[1].split("/post/");
  if (splitPostFromUrl.length != 2) {
    throw "bmBtnOnClick: invalid splitPostFromUrl.length";
  }

  let profileId = RsOk<string>(splitPostFromUrl[0]);
  let postId = RsOk<string>(splitPostFromUrl[1]);

  let did = await getDid(profileId);

  return `at://${did}/app.bsky.feed.post/${postId}`;
}

export async function getPostAtUri(postBody: Element) {
  let atUri = postBody.getAttribute("atUri");
  if (!atUri) {
    atUri = await getAtUri(await getPostUrl(postBody));
  }
  postBody.setAttribute("atUri", atUri);
  return atUri;
}

async function getPostUrl(postBody: Element) {
  let postUrl = postBody.getAttribute("postUrl");
  if (postUrl) {
    return postUrl;
  }

  function hasProfile(href: string) {
    return href.startsWith(`${Config.bskyUrl}/profile/`);
  }

  function hasPost(href: string) {
    return href.indexOf("/post/") > -1;
  }

  let profileUrl;
  for (let anchor of postBody.querySelectorAll(
    "a[href]",
  ) as NodeListOf<HTMLAnchorElement>) {
    let href = anchor.href;

    if (hasProfile(href)) {
      if (hasPost(href)) {
        postUrl = href;
      } else {
        profileUrl = href;
      }

      if (profileUrl && postUrl) {
        if (postUrl.indexOf(profileUrl) == 0) {
          return postUrl;
        }
        throw `Mismatch:\n${profileUrl}\n${postUrl}`;
      }
    }
  }

  // todo: add lookup handler for custom domain / redirects
  let windowUrl = window.location.href;
  log(windowUrl);
  if (hasProfile(windowUrl) && hasPost(windowUrl)) {
    postBody = RsOk<Element>(RsOk<Element>(postBody.parentNode).parentNode);
    let postHead = RsOk<HTMLElement>(postBody.firstChild);
    let anchor = RsOk<HTMLAnchorElement>(postHead.querySelector("a"));
    if (hasProfile(anchor.href)) {
      let anchorRight = anchor.href.split("/profile/")[1];
      if (anchorRight.indexOf("/") < 0) {
        let profileId = anchorRight;
        let windowUrlRight = windowUrl.split("/profile/")[1];

        let windowProfileId = windowUrlRight.split("/")[0];
        if (windowProfileId === profileId) {
          return windowUrl;
        } else if (windowProfileId.startsWith("did:plc:")) {
          let did = await getDid(profileId);
          if (windowProfileId === did) {
            return windowUrl;
          }
        }
      }
    }
  }

  throw "No post url";
}
