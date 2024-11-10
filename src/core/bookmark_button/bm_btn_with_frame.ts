import { State } from "../../helpers/config";
import { BookmarkIcon, CssVars } from "../../helpers/constant";
import { locale } from "../../helpers/locale";
import { RsOk } from "../../helpers/result";
import { err } from "../../helpers/utils";
import type { BookmarkStorage } from "../bookmark/interface";
import { bmBtnOnClick } from "./bm_btn_onclick";

export async function createBmBtnWithFrame(likeBtnWFrame: Node) {
  let bmBtnFrame = likeBtnWFrame.cloneNode(true);
  let bmBtn = RsOk<HTMLElement>(bmBtnFrame.firstChild);
  bmBtn.style.display = "none";
  bmBtn.setAttribute("aria-label", locale("Bookmark"));
  bmBtn.removeAttribute("data-testid");

  // remove like counts
  while (bmBtn.children.length > 1) {
    try {
      bmBtn.removeChild(RsOk<Node>(bmBtn.lastChild)!);
    } catch (e: any) {
      err(e);
    }
  }

  let postButtons = RsOk<Node>(likeBtnWFrame.parentNode);
  let postBody = RsOk<Element>(postButtons.parentNode);
  await setBmIcon(postBody, bmBtn);
  bmBtn.style.display = "block";

  // set css .bm:hover
  bmBtn.classList.add("bm");
  bmBtn.onclick = bmBtnOnClick;

  return bmBtnFrame;
}

async function setBmIcon(postBody: Element, bmBtn: HTMLElement) {
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
  svg.setAttribute("viewBox", BookmarkIcon.svgViewBox);
}
