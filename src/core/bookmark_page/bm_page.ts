import { State } from "../../helpers/config";
import { err, pollFind, waitElement } from "../../helpers/utils";
import { RsOk } from "../../helpers/result";
import { rootSelect } from "../../helpers/root";
import { log } from "../../helpers/utils";
import type { BookmarkStorage } from "../bookmark/interface";
import { createBmPostItem } from "./bm_post";
import { getPostItemRef } from "./bm_post_ref";
import { locale } from "../../helpers/locale";

export async function insertBookmarksPage() {
  pollFind(findLikeBtn, handleLikeBtn, 500);

  waitElement("button[data-testid='likeBtn']").then((div) => {
    let postItemRef = getPostItemRef(div);
    postItemRef.style.display = "none";
  });

  waitElement("div[role=tab]").then((div) => {
    RsOk<HTMLElement>(div.parentNode).style.display = "none";
  });

  waitElement("button[data-testid=pinBtn]").then((div) => {
    let btns = RsOk<HTMLElement>(div.parentNode);
    let panel = RsOk<HTMLElement>(btns.parentNode);
    panel.style.paddingTop = "8px";
    panel.style.paddingBottom = "8px";
    panel.style.paddingLeft = "16px";
    panel.style.paddingRight = "16px";
    panel.style.fontSize = "150%";
    panel.style.fontWeight = "600";
    panel.innerText = locale("Bookmarks");
  });
}

function findLikeBtn() {
  return rootSelect("button.bd[data-testid='likeBtn']");
}

function handleLikeBtn(likeBtn: HTMLElement) {
  let postItemRef = getPostItemRef(likeBtn);
  let bmListDiv = RsOk<HTMLElement>(postItemRef.parentNode);

  let postItemRefClone = postItemRef.cloneNode(true) as HTMLElement;

  try {
    for (let child of postItemRef.children) {
      postItemRef.removeChild(child);
    }
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
