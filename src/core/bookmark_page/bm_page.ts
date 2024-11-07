import { Browser } from "../../helpers/browser";
import { Config, State } from "../../helpers/config";
import { expect } from "../../helpers/nullish";
import { rootSelect } from "../../helpers/root";
import { err, log } from "../../helpers/utils";
import type { BookmarkStorage } from "../bookmark/interface";
import { Url } from "../bookmark/store_dm";

export async function insertBmPage() {
  let bmPageInterval = null as Timer | null;
  window.addEventListener("popstate", (event: PopStateEvent) => {
    if (event.state) {
      let Location = document.location.href;
      startBmPageInterval();

      alert(
        `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
      );
    }
  });

  function startBmPageInterval() {
    bmPageInterval = setInterval(activeOnBmUrl, 50);
  }

  function pauseBmPageInterval() {
    if (bmPageInterval) {
      clearInterval(bmPageInterval);
    }
  }

  async function activeOnBmUrl() {
    if (
      window.location.href.endsWith(
        State.bookmarkPageUrl ?? expect<string>("endsWith"),
      )
    ) {
      let likeBtn = rootSelect("div.bd[data-testid='likeBtn']")!;
      if (likeBtn) {
        log("found like btn");
        pauseBmPageInterval();
        history.replaceState("", Config.bookmarkPageUrlAlias);

        let postItemWithTopFrame = getPostItemRef(likeBtn);

        let bmListDiv = postItemWithTopFrame[0];
        let postItemRef = postItemWithTopFrame[1];

        let bmListLastChild =
          bmListDiv.lastChild ?? expect<Node>("bmListLastChild");

        let storage =
          State.storage ?? expect<BookmarkStorage>("Invalid storage");
        let bookmarks = (await storage.getBookmarks())!;

        if (bookmarks) {
          let i = 0;
          log("Bookmarks:");
          for (let atUri in bookmarks) {
            i += 1;
            log(`${i} - ${atUri}`);
            let bmPostItem = createBmPostItem(atUri, postItemRef);
            bmListDiv.insertBefore(bmPostItem, bmListLastChild);

            postItemRef.onclick = () => {
              history.pushState("", State.bookmarkPageUrl!);
            };
          }
        } else {
          log("No bookmarks");
        }
      }
    }
  }

  startBmPageInterval();
}

function getPostItemRef(likeBtn: Node) {
  let likeBtnWithFrame = likeBtn.parentNode ?? expect<Node>("likeBtnWithFrame");
  let postButtons = likeBtnWithFrame.parentNode ?? expect<Node>("postButtons");
  let postContent = postButtons.parentNode ?? expect<Node>("postContent");
  let postContentwithPfp =
    postContent.parentNode ?? expect<Node>("postContentwithPfp");
  let postContentwithPfpWithSpacing =
    postContentwithPfp.parentNode ??
    expect<Node>("postContentwithPfpWithSpacing");
  let postItemWithFrame1 =
    postContentwithPfpWithSpacing.parentNode ??
    expect<Node>("postItemWithFrame1");
  let postItemWithFrame2 =
    postItemWithFrame1.parentNode ?? expect<Node>("postItemWithFrame2");
  let postItemWithTopFrame =
    postItemWithFrame2.parentNode ?? expect<Node>("postItemWithTopFrame");
  return [
    postItemWithTopFrame.parentNode! as HTMLElement,
    postItemWithTopFrame.parentNode!.removeChild(
      postItemWithTopFrame,
    ) as HTMLElement,
  ];
}

function createBmPostItem(atUri: string, postItemRef: Node) {
  let bmPostItem = postItemRef.cloneNode(true) as HTMLElement;

  let newPostItemWithFrame2 =
    bmPostItem.firstElementChild ??
    expect<HTMLElement>("newPostItemWithFrame2");
  let newPostItemWithFrame1 =
    newPostItemWithFrame2.firstElementChild ??
    expect<HTMLElement>("newPostItemWithFrame1");
  let newPostContentwithPfpWithSpacing =
    newPostItemWithFrame1.firstElementChild ??
    expect<HTMLElement>("newPostContentwithPfpWithSpacing");
  let newPostContentwithPfp =
    newPostContentwithPfpWithSpacing.firstElementChild?.nextElementSibling ??
    expect<HTMLElement>("newPostContentwithPfp");
  let newPostPfp =
    newPostContentwithPfp.firstElementChild ??
    expect<HTMLElement>("newPostPfp");

  let img =
    newPostPfp.firstElementChild!.firstElementChild!.firstElementChild!
      .firstElementChild!.firstElementChild!.firstElementChild ??
    expect<Element>("img");

  let newPostContent =
    newPostPfp.nextElementSibling ?? expect<HTMLElement>("newPostContent");
  log(newPostContent);

  let newPostTitleDate =
    newPostContent.firstElementChild ?? expect<HTMLElement>("newPostTitleDate");
  log(newPostTitleDate);

  let newPostBody =
    newPostTitleDate.nextElementSibling ?? expect<HTMLElement>("newPostBody");
  log(newPostBody);

  let newPostButtons =
    newPostBody.nextElementSibling ?? expect<HTMLElement>("newPostButtons");
  log(newPostButtons);

  let iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.addEventListener("load", async () => {
    let data: { [key: string]: string } | null = null;

    let count = 0;
    let findEmbedInStorageInterval: Timer | null;
    async function findEmbedInStorage() {
      count += 1;
      if (count > 20) {
        if (findEmbedInStorageInterval) {
          clearInterval(findEmbedInStorageInterval);
        }
        return;
      }
      try {
        data = await Browser.storage.local.get(atUri);
      } catch (e) {
        err(`Error getting data ${e}`);
      }
      if (!data) {
        return;
      }
      let value = data[atUri];
      log(`Found stored embed ${atUri} :\n ${value}`);
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(value, "text/html");

      // // TODO: put data into its boxes
      // // also yeah querySelector wont work, use firstElementChild or similar instead

      // let newPfp = xmlDoc.querySelector("img");
      // if (newPfp) {
      //   (img as HTMLElement).style.backgroundImage = newPfp.src;
      // }
      // newPostContentwithPfp.appendChild(xmlDoc);
      if (findEmbedInStorageInterval) {
        clearInterval(findEmbedInStorageInterval);
      }
    }

    findEmbedInStorageInterval = setInterval(findEmbedInStorage, 500);
  });

  iframe.src = Url.getEmbed(atUri.split("at://")[1]);
  bmPostItem.appendChild(iframe);
  return bmPostItem;
}
