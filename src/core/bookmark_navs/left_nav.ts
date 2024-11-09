import { Config, State } from "../../helpers/config";
import { BookmarkIcon } from "../../helpers/constant";
import { locale } from "../../helpers/locale";
import { RsOk } from "../../helpers/result";
import { rootSelect } from "../../helpers/root";
import { NavState } from "./state";

export function findMsgLeftNav() {
  let msgLeftNav = rootSelect(
    '#root > div > div > div:nth-child(1) > div > div > div > a:not(.bd)[href="/messages"]',
  );
  if (msgLeftNav && !NavState.left.isShown) {
    let classes = msgLeftNav.classList;
    if (classes.contains("bd")) {
      return;
    }
    classes.add("bd");
    NavState.left.isShown = true;
    return msgLeftNav;
  }
  if (NavState.left.isShown) {
    NavState.left.isShown = false;
  }
}

export function insertBmLeftNav(msgLeftNav: Node) {
  let bmLeftNav = msgLeftNav.cloneNode(true) as HTMLAnchorElement;
  bmLeftNav.classList.add("bm");
  bmLeftNav.href = Config.bookmarkPageUrlAlias;
  bmLeftNav.onclick = () => {
    window.location.href = RsOk<string>(State.bookmarkPageUrl);
    return false;
  };

  let bmNavText = RsOk<HTMLElement>(bmLeftNav.lastChild);
  bmNavText.innerText = locale("Bookmarks");

  let bmLeftNavPath = RsOk<SVGPathElement>(bmLeftNav.querySelector("path"));
  bmLeftNavPath.setAttribute("d", BookmarkIcon.normalSvgData);
  RsOk<HTMLElement>(bmLeftNavPath.parentNode).setAttribute(
    "viewBox",
    BookmarkIcon.svgViewBox,
  );

  function setCssBmNav() {
    if (window.location.href.endsWith(Config.bookmarkPageUrlAlias)) {
      if (bmNavText.style.fontWeight !== "800") {
        bmLeftNavPath.setAttribute("d", BookmarkIcon.bookmarkedSvgData);
        bmNavText.style.fontWeight = "800";
      }
    } else {
      if (bmNavText.style.fontWeight !== "400") {
        bmLeftNavPath.setAttribute("d", BookmarkIcon.normalSvgData);
        bmNavText.style.fontWeight = "400";
      }
    }
  }

  setInterval(setCssBmNav, 50);

  RsOk<Node>(msgLeftNav.parentNode).insertBefore(
    bmLeftNav,
    msgLeftNav.nextSibling,
  );
}
