import { State } from "../../helpers/config";
import { BookmarkIcon, CssVars } from "../../helpers/constant";
import { locale } from "../../helpers/locale";
import { expect } from "../../helpers/nullish";
import type { BookmarkStorage } from "../bookmark/interface";
import { bmBtnOnClick } from "./bm_btn_onclick";

export async function createBmBtnWithFrame(refBtn: HTMLDivElement) {
  let bmBtnFrame =
    refBtn.parentNode?.cloneNode(true) ?? expect<Node>("bmBtnFrame");
  let bmBtn =
    (bmBtnFrame.firstChild as HTMLElement) ?? expect<HTMLElement>("bmBtn");
  bmBtn.setAttribute("aria-label", locale("Bookmark"));
  bmBtn.removeAttribute("data-testid");

  while (bmBtn.children.length > 1) {
    bmBtn.removeChild(bmBtn.lastChild as ChildNode);
  }

  let postBody = refBtn as Node;
  postBody = postBody.parentNode ?? expect<Node>("Invalid parent 1");
  postBody = postBody.parentNode ?? expect<Node>("Invalid parent 2");
  postBody = postBody.parentNode ?? expect<Node>("Invalid parent 3");

  let bmSvgPath =
    bmBtn.querySelector("path") ?? expect<SVGPathElement>("bmSvgPath");
  let storage = State.storage ?? expect<BookmarkStorage>("storage");
  if (await storage.isBookmarked(postBody as HTMLDivElement)) {
    bmSvgPath.setAttribute("fill", `var(${CssVars.btnTextBmed})`);
    bmSvgPath.setAttribute("d", BookmarkIcon.bookmarkedSvgData);
  } else {
    bmSvgPath.setAttribute("fill", `var(${CssVars.btnText})`);
    bmSvgPath.setAttribute("d", BookmarkIcon.normalSvgData);
  }

  (bmSvgPath.parentNode as HTMLElement).setAttribute(
    "viewBox",
    BookmarkIcon.svgViewBoxSmall,
  );
  bmBtn.classList.add("bm"); // set css .bm:hover
  bmBtn.onclick = bmBtnOnClick;

  return bmBtnFrame;
}
