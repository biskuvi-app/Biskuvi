import { State } from "../../helpers/config";
import { err, pollFind } from "../../helpers/utils";
import { RsOk } from "../../helpers/result";
import { rootSelect } from "../../helpers/root";
import { log } from "../../helpers/utils";
import type { BookmarkStorage } from "../bookmark/interface";
import { createBmPostItem } from "./bm_post";
import { getPostItemRef } from "./bm_post_ref";

export async function insertBookmarksPage() {
  pollFind(findLikeBtn, handleLikeBtn, 500);
}

function findLikeBtn() {
  return rootSelect("button.bd[data-testid='likeBtn']");
}

function handleLikeBtn(likeBtn: HTMLElement) {
  let postItemRef = getPostItemRef(likeBtn);
  postItemRef.style.display = "none";
  let bmListDiv = RsOk<HTMLElement>(postItemRef.parentNode);

  let postItemRefClone = postItemRef.cloneNode(true) as HTMLElement;

  try {
    bmListDiv.removeChild(postItemRef);
  } catch (e: any) {
    err(e);
  }

  let bmListLastEmptyDiv = RsOk<Node>(bmListDiv.lastChild);

  function insertBookmarks(
    bookmarks: { [keys: string]: string } | undefined | null,
  ) {
    if (bookmarks) {
      let count = 0;
      for (let atUri in bookmarks) {
        count += 1;
        log(`${count} - ${atUri}`);
        if (count == 2) {
          postItemRefClone.style.borderColor = bmListDiv.style.borderColor;
        }
        let bmPostItem = createBmPostItem(atUri, postItemRefClone);
        bmListDiv.insertBefore(bmPostItem, bmListLastEmptyDiv);
      }
    } else {
      log("No bookmarks");
    }
  }

  let storage = RsOk<BookmarkStorage>(State.storage);
  storage.getBookmarks().then(insertBookmarks);
}
