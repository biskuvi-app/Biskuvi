import { Config, State } from "../../helpers/config";
import { expect } from "../../helpers/nullish";
import { rootSelect } from "../../helpers/root";
import { log } from "../../helpers/utils";
import { getEmbed } from "../bookmark/bm_utils";
import type { BookmarkStorage } from "../bookmark/interface";

export async function insertBmPage() {
  let bmPageInterval = null as Timer | null;

  // window.addEventListener("popstate", (event: PopStateEvent) => {
  // if (event.state) {
  // let Location = document.location.href;
  // alert(
  // `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
  // );
  // }
  // });

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
        pauseBmPageInterval();
        history.replaceState(null, "", Config.bookmarkPageUrlAlias);
        log("found");

        let likeBtnWithFrame =
          likeBtn.parentNode ?? expect<Node>("likeBtnWithFrame");
        let postButtons =
          likeBtnWithFrame.parentNode ?? expect<Node>("postButtons");
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
        log(postItemWithTopFrame);
        let bmListDiv =
          postItemWithTopFrame.parentNode ?? expect<Node>("bmListDiv");
        let postItemRef = postItemWithTopFrame.parentNode!.removeChild(
          postItemWithTopFrame,
        ) as HTMLDivElement;

        let bmListLastChild =
          bmListDiv.lastChild ?? expect<Node>("bmListLastChild");

        let storage =
          State.storage ?? expect<BookmarkStorage>("Invalid storage");
        let bookmarks = (await storage.getBookmarks())!;
        if (bookmarks) {
          let i = 0;
          for (let atUri in bookmarks) {
            if (i > 2) {
              break;
            }
            log(atUri);
            let removedPrefixUri = atUri.replace("at://", "");
            let slashSplitUri = removedPrefixUri.split("/");
            let did = slashSplitUri[0];
            let postId = slashSplitUri[slashSplitUri.length - 1];
            let newPostItem = postItemRef.cloneNode(true);

            let newPostContentwithPfp =
              newPostItem.firstChild ?? expect<Node>("newPostContentwithPfp 1");
            newPostContentwithPfp =
              newPostItem.firstChild ?? expect<Node>("newPostContentwithPfp 2");
            newPostContentwithPfp =
              newPostItem.firstChild ?? expect<Node>("newPostContentwithPfp 3");
            newPostContentwithPfp =
              newPostItem.firstChild ?? expect<Node>("newPostContentwithPfp 4");
            newPostContentwithPfp =
              newPostItem.firstChild ?? expect<Node>("newPostContentwithPfp 5");

            let iframe = document.createElement("iframe");

            iframe.addEventListener("load", function () {
              log("loaded");
              let doc = iframe.contentDocument
                ? iframe.contentDocument
                : iframe.contentWindow!.document;
              let root = doc.querySelector("div#root");
              log(root);
              function handler() {
                for (let item of root!.querySelectorAll(
                  "div[data-testid]",
                ) as NodeListOf<HTMLDivElement>) {
                  let dataTestId = item.getAttribute("data-testid");
                  if (
                    dataTestId &&
                    dataTestId.startsWith("postThreadItem-by-")
                  ) {
                    console.log(dataTestId);
                    bmListDiv.replaceChild(item, newPostItem);
                  }
                }
              }

              setTimeout(handler, 3000);
            });

            iframe.src = `https://bsky.app/profile/${did}/post/${postId}`;
            iframe.setAttribute(
              "style",
              "position: absolute; width:100%;height:0;border: 0;border: none;",
            );

            newPostContentwithPfp.replaceChild(
              iframe,
              newPostContentwithPfp.lastChild!,
            );

            // let embed = await getEmbed(atUri);
            // for (let item in embed) {
            //   log(item);
            //   i++;
            // }

            bmListDiv.insertBefore(newPostItem, bmListLastChild);

            postItemRef.onclick = () => {
              history.pushState("", State.bookmarkPageUrl!);
              startBmPageInterval();
            };
          }
        } else {
          log("No bookmarks");
        }

        (postItemWithTopFrame as HTMLElement).remove(); // no longer used here
      }
    }
  }

  startBmPageInterval();
}
