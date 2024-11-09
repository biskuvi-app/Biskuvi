import { BookmarkIcon } from "../../helpers/constant";
import { RsOk } from "../../helpers/result";
import { rootSelect } from "../../helpers/root";
import { NavState } from "./state";

export function findMsgBtmNav() {
  let msgBtmNav = rootSelect(
    "#root > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(3):has(> svg)",
  );
  if (msgBtmNav && !NavState.bottom.isShown) {
    let classes = msgBtmNav.classList;
    if (classes.contains("bd")) {
      return;
    }
    classes.add("bd");
    NavState.bottom.isShown = true;
    return msgBtmNav;
  }
  if (NavState.bottom.isShown) {
    NavState.bottom.isShown = false;
  }
}

export function insertBmBtmNav(msgBtmNav: Node) {
  let bmBtmNav = msgBtmNav.cloneNode(true) as HTMLElement;

  let path = RsOk<SVGPathElement>(bmBtmNav.querySelector("path"));
  path.setAttribute("d", BookmarkIcon.normalSvgData);
  RsOk<Element>(path.parentNode).setAttribute(
    "viewBox",
    BookmarkIcon.svgViewBox,
  );

  RsOk<Node>(msgBtmNav.parentNode).insertBefore(
    bmBtmNav,
    msgBtmNav.nextSibling,
  );
}
