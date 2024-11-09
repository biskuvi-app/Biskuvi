import { State } from "../../helpers/config";
import { pollFind } from "../../helpers/utils";
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
  let postItemWithTopFrame = getPostItemRef(likeBtn);

  let bmListDiv = postItemWithTopFrame[0];
  let postItemRef = postItemWithTopFrame[1];
  postItemRef.style.display = "none";

  let bmListLastEmptyDiv = RsOk<Node>(bmListDiv.lastChild);

  function insertBookmarks(
    bookmarks: { [keys: string]: string } | undefined | null,
  ) {
    if (bookmarks) {
      let count = 0;
      for (let atUri in bookmarks) {
        count += 1;
        log(`${count} - ${atUri}`);
        let bmPostItem = createBmPostItem(atUri, postItemRef);
        bmListDiv.insertBefore(bmPostItem, bmListLastEmptyDiv);
      }
    } else {
      log("No bookmarks");
    }
  }

  let storage = RsOk<BookmarkStorage>(State.storage);
  storage.getBookmarks().then(insertBookmarks);
}
