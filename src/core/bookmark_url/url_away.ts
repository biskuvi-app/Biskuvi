import { Config, State } from "../../helpers/config";
import { RsOk } from "../../helpers/result";
import { pollFind } from "../../helpers/utils";
import { BookmarkUrlState } from "./state";
import { pollEnterPage } from "./url_enter";

export function pollNavigateAway() {
  pollFind(findNavigateAway, handleNavigateAway, 250);
}

function findNavigateAway() {
  let href = document.location.href;
  let right = href.split(Config.bskyUrl)[1];
  if (right !== Config.bookmarkPageUrlAlias) {
    return href;
  }
}

function handleNavigateAway(href: string) {
  BookmarkUrlState.hasNavigatedAway = true;
  history.replaceState(null, "", RsOk<string>(State.bookmarkPageUrl));
  history.pushState(null, "", href);
  pollEnterPage();
}
