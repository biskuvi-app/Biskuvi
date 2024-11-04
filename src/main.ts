import { getStorage } from "./core/bookmark/storage";
import { insertBmNav } from "./core/bookmark_nav/bm_nav";
import { insertBmPage } from "./core/bookmark_page/bm_page";
import { Config, State } from "./helpers/config";
import { StorageMode } from "./helpers/constant";
import { addCss, waitElement } from "./helpers/utils";
import { createBmBtnWithFrame } from "./core/bookmark_button/bm_btn_with_frame";
import { rootSelectAll } from "./helpers/root";
import { expect } from "./helpers/nullish";

(async () => {
  State.storage = await getStorage(StorageMode.localStorage);
  State.root = await waitElement("div#root");
  State.bookmarkPageUrl =
    "/profile/did:plc:qvmvynssslo5yhstrnc2cwv6/lists/3l7xwyfscqk2k";
  insertBmNav();
  await insertBmPage();
  addCss(Config.css);

  let insertBtnsInterval = null as Timer | null;

  async function insertBmBtns() {
    let likeBtns = rootSelectAll(
      "div:not(.bd)[data-testid='likeBtn']",
    ) as NodeListOf<HTMLDivElement>;

    if (likeBtns) {
      pauseinsertBtnsInterval();
      for (let likeBtn of likeBtns) {
        (async () => {
          // mark to exclude from next rootSelectAll
          likeBtn.classList.add("bd");
          let bmBtnWithFrame =
            (await createBmBtnWithFrame(likeBtn)) ??
            expect<Node>("bmBtnWithFrame");
          let postDdBtnFrame =
            likeBtn.parentNode ?? expect<Node>("postDdBtnFrame");
          postDdBtnFrame.parentNode?.insertBefore(
            bmBtnWithFrame,
            postDdBtnFrame.nextSibling,
          ) ?? expect<Node>("Error inserting bookmark button");
        })();
      }
    }
  }

  function startinsertBtnsInterval() {
    insertBtnsInterval = setInterval(insertBmBtns, Config.interval);
  }
  function pauseinsertBtnsInterval() {
    if (insertBtnsInterval) {
      clearInterval(insertBtnsInterval);
    }
    setTimeout(startinsertBtnsInterval, 2500);
  }

  startinsertBtnsInterval();
})();
