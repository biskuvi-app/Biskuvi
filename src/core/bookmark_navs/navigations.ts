import { pollFind } from "../../helpers/utils";
import { findMsgBtmNav, insertBmBtmNav } from "./btm_nav";
import { findMsgLeftNav, insertBmLeftNav } from "./left_nav";

// insert Bookmarks button on navs
export function insertBookmarksNavigations() {
  // - on the left panel (wide screen: pc, tablet, etc.)
  // TODO: hide title when left nav is smaller
  pollFind(findMsgLeftNav, insertBmLeftNav, 50, 750);
  // - on the bottom panel (for small screen width)
  pollFind(findMsgBtmNav, insertBmBtmNav, 50, 750);
}
