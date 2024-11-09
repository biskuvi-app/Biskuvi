import { RsOk } from "../../helpers/result";
import { log } from "../../helpers/utils";
import { Url } from "./store_dm";

export async function getEmbed(atUri: string): Promise<JSON> {
  let resolveHandleUrl = Url.getEmbed(atUri);
  try {
    log(resolveHandleUrl);
    const response = await fetch(resolveHandleUrl);
    if (!response.ok) {
      throw `response: ${response.status}`;
    }
    log("pass");
    let body = response.body;
    log(body);
    let json = await response.json();
    log(json);
    return json;
  } catch (error: any) {
    throw `getEmbed: ${error}`;
  }
}

async function getDid(atProtoHandle: string) {
  let resolveHandleUrl = Url.resolveHandle(atProtoHandle);
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

  let atProtoHandle = RsOk<string>(splitPostFromUrl[0]);
  let postId = RsOk<string>(splitPostFromUrl[1]);

  let did = await getDid(atProtoHandle);

  return `at://${did}/app.bsky.feed.post/${postId}`;
}

export async function getPostAtUri(postBody: Element) {
  let atUri = postBody.getAttribute("atUri");
  if (!atUri) {
    atUri = await getAtUri(getPostUrl(postBody));
  }
  postBody.setAttribute("atUri", atUri);
  return atUri;
}

function getPostUrl(postBody: Element) {
  let postUrl = postBody.getAttribute("postUrl");
  if (postUrl) {
    return postUrl;
  }

  function hasProfile(href: string) {
    return href.indexOf("/profile/") > -1;
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
      if (windowUrl.indexOf(anchor.href) > -1) {
        return windowUrl;
      }
    }
  }

  throw "no post url";
}
