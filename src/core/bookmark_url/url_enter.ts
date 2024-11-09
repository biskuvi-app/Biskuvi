import { Config, State } from "../../helpers/config";
import { RsOk } from "../../helpers/result";
import { pollFind } from "../../helpers/utils";
import { insertBookmarksPage } from "../bookmark_page/bm_page";
import { BookmarkUrlState } from "./state";
import { pollNavigateAway } from "./url_away";

export function pollEnterPage() {
  BookmarkUrlState.hasEntered = false;
  BookmarkUrlState.hasNavigatedAway = false;
  pollFind(findEnterPage, handleEnterPage, 250);
}

function handleEnterPage() {
  BookmarkUrlState.hasEntered = true;
  history.replaceState(null, "", Config.bookmarkPageUrlAlias);
  insertBookmarksPage();
  pollNavigateAway();
}

function findEnterPage() {
  let href = document.location.href;
  let right = href.split(Config.bskyUrl)[1];
  return right === RsOk<string>(State.bookmarkPageUrl);
}
