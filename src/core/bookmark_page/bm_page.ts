import { State } from "../../helpers/config";
import {
  err,
  getScrollProgress,
  pollFind,
  waitElement,
} from "../../helpers/utils";
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

  if (!State.cssIsSet) {
    State.cssIsSet = true;
    let postBorderColor = bmListDiv.style.borderColor;
    let style = getComputedStyle(document.body);
    if (style.getPropertyValue("--postBorder") !== postBorderColor) {
      document.documentElement.setAttribute(
        "style",
        `--postBorder: ${postBorderColor}`,
      );
    }
  }

  let postItemRefClone = postItemRef.cloneNode(true) as HTMLElement;

  try {
    for (let child of postItemRef.children) {
      postItemRef.removeChild(child);
    }
  } catch (e: any) {
    err(e);
  }

  let bmListLastEmptyDiv = RsOk<HTMLElement>(bmListDiv.lastChild);

  function insertBookmarks(
    bookmarks: { [keys: string]: string } | undefined | null,
  ) {
    if (bookmarks) {
      let keys = Object.keys(bookmarks);
      let length = keys.length;
      log(`Found${length} bookmarks`);

      let count = 0;
      let take = 5;

      let lastScroll = new Date();
      let taking = false;
      let done = false;

      function insertTakenBookmarks() {
        for (let i = 0; i < take && count < length; i++) {
          let atUri = keys[i + count];
          count += 1;
          log(`${count} - ${atUri}`);

          if (count == 2) {
            postItemRefClone.style.borderColor = bmListDiv.style.borderColor;
          }

          let bmPostItem = createBmPostItem(atUri, postItemRefClone);
          bmListDiv.insertBefore(bmPostItem, bmListLastEmptyDiv);
        }
      }
      insertTakenBookmarks();

      document.addEventListener("scroll", (event) => {
        if (count < length) {
          let progress = getScrollProgress();
          log(progress);
          if (progress > 0.75) {
            let newLastScroll = new Date();
            let duration = newLastScroll.getSeconds() - lastScroll.getSeconds();
            lastScroll = newLastScroll;
            if (duration > 2) {
              insertTakenBookmarks();
            } else {
              if (!taking) {
                taking = true;
                log(`Take at ${count}, ${length}`);
                setTimeout(() => {
                  insertTakenBookmarks();
                  taking = false;
                }, 2000);
              }
            }
          }
        } else {
          if (!done) {
            done = true;
            bmListLastEmptyDiv.style.textAlign = "center";
            bmListLastEmptyDiv.style.color = "var(--btnText)";
            bmListLastEmptyDiv.style.paddingTop = "12px";
            bmListLastEmptyDiv.style.paddingBottom = "12px";
            bmListLastEmptyDiv.style.marginBottom = "24px";
            bmListLastEmptyDiv.style.borderTop = "1px";
            bmListLastEmptyDiv.style.borderStyle = "solid";
            bmListLastEmptyDiv.style.borderColor = "var(--postBorder)";
            bmListLastEmptyDiv.innerText = "No new bookmarks";
          }
        }
      });
    } else {
      log("No bookmarks");
    }
  }

  let storage = RsOk<BookmarkStorage>(State.storage);
  storage.getBookmarks().then(insertBookmarks);
}
