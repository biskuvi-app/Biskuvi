import { State } from "../../helpers/config";
import { BookmarkIcon, CssVars } from "../../helpers/constant";
import { locale } from "../../helpers/locale";
import { RsOk } from "../../helpers/result";
import type { BookmarkStorage } from "../bookmark/interface";
import { bmBtnOnClick } from "./bm_btn_onclick";

export async function createBmBtnWithFrame(likeBtnWFrame: Node) {
  let bmBtnFrame = likeBtnWFrame.cloneNode(true);
  let bmBtn = RsOk<HTMLElement>(bmBtnFrame.firstChild);
  bmBtn.setAttribute("aria-label", locale("Bookmark"));
  bmBtn.removeAttribute("data-testid");

  // remove like counts
  while (bmBtn.children.length > 1) {
    bmBtn.removeChild(bmBtn.lastChild!);
  }

  let postButtons = RsOk<Node>(likeBtnWFrame.parentNode);
  let postBody = RsOk<Element>(postButtons.parentNode);
  setBmIcon(postBody, bmBtn);

  // set css .bm:hover
  bmBtn.classList.add("bm");
  bmBtn.onclick = bmBtnOnClick;

  return bmBtnFrame;
}

async function setBmIcon(postBody: Element, bmBtn: Element) {
  let bmSvgPath = RsOk<SVGPathElement>(bmBtn.querySelector("path"));
  let storage = RsOk<BookmarkStorage>(State.storage);

  if (await storage.isBookmarked(postBody)) {
    bmSvgPath.setAttribute("fill", `var(${CssVars.btnTextBmed})`);
    bmSvgPath.setAttribute("d", BookmarkIcon.bookmarkedSvgData);
  } else {
    bmSvgPath.setAttribute("fill", `var(${CssVars.btnText})`);
    bmSvgPath.setAttribute("d", BookmarkIcon.normalSvgData);
  }

  let svg = RsOk<Element>(bmSvgPath.parentNode);
  svg.setAttribute("viewBox", BookmarkIcon.svgViewBoxSmall);
}
