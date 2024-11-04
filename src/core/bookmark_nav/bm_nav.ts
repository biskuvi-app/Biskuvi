import { Config, State } from "../../helpers/config";
import { BookmarkIcon } from "../../helpers/constant";
import { locale } from "../../helpers/locale";
import { expect } from "../../helpers/nullish";
import { rootSelect } from "../../helpers/root";

export function insertBmNav() {
  let navInterval: Timer | null = null;
  let isObserving = false;
  let leftNavVisible = false;
  let btmNavVisible = false;

  function startNavInterval() {
    navInterval = setInterval(callback, 50);
  }

  function pauseNavInterval() {
    if (navInterval && isObserving) {
      isObserving = false;
      clearInterval(navInterval);
      setTimeout(startNavInterval, 750);
    }
  }

  function callback() {
    let leftSelector =
      '#root > div > div > div:nth-child(1) > div > div > div > a[href="/messages"]';
    let msgLeftNav = rootSelect(leftSelector)!;

    if (msgLeftNav) {
      if (!leftNavVisible) {
        leftNavVisible = true;
        pauseNavInterval();

        let bmLeftNav = msgLeftNav.cloneNode(true) as HTMLAnchorElement;
        bmLeftNav.classList.add("bm");
        bmLeftNav.href = Config.bookmarkPageUrlAlias;

        let bmNavText =
          (bmLeftNav.lastChild as HTMLDivElement) ??
          expect<HTMLDivElement>("bmNavText");
        bmNavText.innerText = locale("Bookmarks");

        let bmLeftNavPath =
          bmLeftNav.querySelector("path") ??
          expect<SVGPathElement>("bmLeftNavPath");
        bmLeftNavPath.setAttribute("d", BookmarkIcon.normalSvgData);
        (bmLeftNavPath.parentNode as HTMLElement).setAttribute(
          "viewBox",
          BookmarkIcon.svgViewBoxSmall,
        );

        bmLeftNav.onclick = () => {
          window.location.href =
            State.bookmarkPageUrl ?? expect<string>("href");
          return false;
        };

        function activeOnBmUrl() {
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

        setInterval(activeOnBmUrl, 50);

        msgLeftNav.parentNode?.insertBefore(
          bmLeftNav,
          msgLeftNav.nextSibling,
        ) ?? expect<Node>("Error inserting left bookmark nav");
      }
    } else {
      leftNavVisible = false;
    }

    let selector =
      "#root > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(3):has(> svg)";

    let msgBtmNav = rootSelect(selector);
    if (msgBtmNav) {
      if (!btmNavVisible) {
        btmNavVisible = true;
        pauseNavInterval();

        let bmBtmNav = msgBtmNav.cloneNode(true) as HTMLElement;

        let path =
          bmBtmNav.querySelector("path") ?? expect<SVGPathElement>("path");
        path.setAttribute("d", BookmarkIcon.normalSvgData);
        (path.parentNode as HTMLElement).setAttribute(
          "viewBox",
          BookmarkIcon.svgViewBoxSmall,
        );

        msgBtmNav.parentNode?.insertBefore(bmBtmNav, msgBtmNav.nextSibling) ??
          expect<Node>("Error inserting btm bookmark nav");
        return;
      }
    } else {
      btmNavVisible = false;
    }
  }

  startNavInterval();
}
