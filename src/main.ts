import { getStorage } from "./core/bookmark/storage";
import { insertBmNav } from "./core/bookmark_nav/bm_nav";
import { insertBmPage } from "./core/bookmark_page/bm_page";
import { Config, State } from "./helpers/config";
import { StorageMode } from "./helpers/constant";
import { addCss, log, waitElement } from "./helpers/utils";
import { createBmBtnWithFrame } from "./core/bookmark_button/bm_btn_with_frame";
import { rootSelectAll } from "./helpers/root";
import { expect } from "./helpers/nullish";
import type { PostEmbed } from "./helpers/type";
import { Browser } from "./helpers/browser";

(async () => {
  // TODO: messy! refactor this!
  if (window.self !== window.top) {
    if (window.location.href.startsWith(Config.oEmbedUrl)) {
      let pre =
        document.body.querySelector("pre") ?? expect<HTMLPreElement>("pre");
      let embedJson: PostEmbed = JSON.parse(pre.innerHTML);
      let htmlUnicodeString = embedJson.html;
      document.body.innerHTML = htmlUnicodeString;
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(htmlUnicodeString, "text/xml");
      let blockQuote =
        (xmlDoc.querySelector("blockquote") as HTMLElement) ??
        expect<HTMLElement>("blockquote");
      let atUri =
        blockQuote.getAttribute("data-bluesky-uri") ??
        expect<string>("embed atUri");
      let data: { [key: string]: string } = {};
      data[atUri] = document.body.innerHTML;
      await Browser.storage.local.set(data);

      log(`Stored atUri oEmbed: ${atUri}`);
    } else if (window.location.href.startsWith(Config.embedUrl)) {
      let atUri = "at://" + window.location.href.split("/embed/")[1];
      await Browser.storage.local.remove(atUri);
      waitElement("div.w-full").then(async (a) => {
        let div = a.parentElement! as HTMLElement;
        let data: { [key: string]: string } = {};
        data[atUri] = div.getHTML();
        await Browser.storage.local.set(data);
        log(`Stored atUri embed: ${atUri}`);
      });
    }
    return;
  }
  if (!window.location.href.startsWith("https://bsky.app")) {
    return;
  }

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
