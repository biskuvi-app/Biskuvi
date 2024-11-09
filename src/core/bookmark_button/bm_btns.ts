import { log, pollFind } from "../../helpers/utils";
import { RsOk } from "../../helpers/result";
import { rootSelectAll } from "../../helpers/root";
import { createBmBtnWithFrame } from "./bm_btn_with_frame";

export function insertBookmarkButtons() {
  pollFind(findLikeBtns, insertBmBtns, 500, 2500);
}

function findLikeBtns() {
  let btns = rootSelectAll("button:not(.bd)[data-testid='likeBtn']");
  if (btns && btns.length > 0) {
    return btns;
  }
}

function insertBmBtns(likeBtns: NodeListOf<HTMLElement>) {
  log(`found ${likeBtns.length} likeBtn(s)`);
  for (let likeBtn of likeBtns) {
    // mark to exclude from next select
    likeBtn.classList.add("bd");
    let likeBtnWFrame = RsOk<Node>(likeBtn.parentNode);

    // async insertion
    createBmBtnWithFrame(likeBtnWFrame).then((bmBtnWithFrame) => {
      let postButtons = RsOk<Node>(likeBtnWFrame.parentNode);
      if (postButtons.insertBefore(bmBtnWithFrame, likeBtnWFrame.nextSibling)) {
      }
    });
  }
}
