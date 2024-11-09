import { getStorage } from "./core/bookmark/storage";
import { insertBookmarksNavigations } from "./core/bookmark_navs/navigations";
import { Config, State } from "./helpers/config";
import { StorageMode } from "./helpers/constant";
import { log, waitElement } from "./helpers/utils";
import { Browser } from "./helpers/browser";
import { insertBookmarkButtons } from "./core/bookmark_button/bm_btns";
import { RsOk } from "./helpers/result";
import { handleBookmarkPageUrl } from "./core/bookmark_url/handle_url";

// TODO: config page
async function loadConfig() {
  State.storage ??= await getStorage(StorageMode.localStorage);
  State.bookmarkPageUrl ??=
    "/profile/did:plc:qvmvynssslo5yhstrnc2cwv6/lists/3l7xwyfscqk2k";
}

async function handleEmbedPage() {
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

function handleBskyPage() {
  handleBookmarkPageUrl();
  waitElement("div#root").then((root) => {
    State.root = root;
    insertBookmarkButtons();
    insertBookmarksNavigations();
  });
}

function main() {
  let href = window.location.href;
  log(href);
  if (window.self !== window.top) {
    if (href.startsWith(Config.embedUrl)) {
      log("handleEmbedPage");
      handleEmbedPage();
    }
  } else if (href.startsWith(Config.bskyUrl)) {
    loadConfig().then(() => {
      let right = href.split(Config.bskyUrl)[1];
      if (right === Config.bookmarkPageUrlAlias) {
        //TODO: redirect to bookmarks page alias cuz "/bookmarks" is not yet availble
        let url = RsOk<string>(State.bookmarkPageUrl);
        log(`Redirecting to: ${url}`);
        window.location.replace(url);
      } else {
        log("handleBskyPage");
        handleBskyPage();
      }
    });
  }
}

main();
