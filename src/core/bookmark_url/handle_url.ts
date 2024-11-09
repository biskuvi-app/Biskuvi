import { Config } from "../../helpers/config";
import { log } from "../../helpers/utils";
import { BookmarkUrlState } from "./state";
import { pollEnterPage } from "./url_enter";

export function handleBookmarkPageUrl() {
  pollEnterPage();

  window.addEventListener("popstate", (event: PopStateEvent) => {
    let href = window.location.href;
    log(`Popstate\n -href: ${window.location.href}\n -state: ${event.state}`);
    log(
      `BookmarkUrlState:
- hasNavigatedAway: ${BookmarkUrlState.hasNavigatedAway}
- hasEntered: ${BookmarkUrlState.hasEntered}
`,
    );
    // TODO: skip 404 for bookmarks alias page (/bookmarks)
    // let right = href.split(Config.bskyUrl)[1];
    // if (
    //   right === "/" &&
    //   !BookmarkUrlState.hasNavigatedAway &&
    //   BookmarkUrlState.hasEntered
    // ) {
    //   log("skip bookmark alias page");
    //   history.go(-2);
    // }
  });
}
