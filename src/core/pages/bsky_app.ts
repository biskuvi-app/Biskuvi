import { State } from "../../helpers/config";
import { waitElement } from "../../helpers/utils";
import { insertBookmarkButtons } from "../bookmark_button/bm_btns";
import { insertBookmarksNavigations } from "../bookmark_navs/navigations";
import { handleBookmarkPageUrl } from "../bookmark_url/handle_url";

export function handleBskyPage() {
  handleBookmarkPageUrl();
  waitElement("div#root").then((root) => {
    State.root = root;
    insertBookmarkButtons();
    insertBookmarksNavigations();
  });
}
