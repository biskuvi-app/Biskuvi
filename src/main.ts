import { getStorage } from "./core/bookmark/storage";
import { Config, State } from "./helpers/config";
import { StorageMode } from "./helpers/constant";
import { log } from "./helpers/utils";
import { RsOk } from "./helpers/result";
import { handleEmbedPage } from "./core/pages/bsky_embed";
import { handleBskyPage } from "./core/pages/bsky_app";

// TODO: config page
async function loadConfig() {
  State.storage ??= await getStorage(StorageMode.localStorage);
  State.bookmarkPageUrl ??=
    "/profile/did:plc:qvmvynssslo5yhstrnc2cwv6/lists/3l7xwyfscqk2k";
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
        //TODO: (not working) redirect to bookmarks page alias cuz "/bookmarks" is not yet available
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
