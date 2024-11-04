import { State } from "../../helpers/config";
import { BookmarkIcon, CssVars } from "../../helpers/constant";
import { expect } from "../../helpers/nullish";
import type { BookmarkStorage } from "../bookmark/interface";

export async function bmBtnOnClick(e: Event) {
  e.preventDefault();

  let currTarget =
    (e.currentTarget as HTMLElement) ?? expect<HTMLDivElement>("currTarget");

  let postBody =
    (currTarget.parentNode?.parentNode?.parentNode as HTMLDivElement) ??
    expect<HTMLDivElement>("postBody");

  let bmSvgPath = currTarget.querySelector("path");
  if (!bmSvgPath) {
    throw "bmBtnOnClick: bmSvgPath is null";
  }

  bmSvgPath.setAttribute("fill", `var(${CssVars.btnText})`);

  let storage = State.storage ?? expect<BookmarkStorage>("storage");
  if (!(await storage.isBookmarked(postBody))) {
    try {
      bmSvgPath.setAttribute("d", BookmarkIcon.bookmarkedSvgData);
      await storage.addBookmark(postBody);
      bmSvgPath.setAttribute("fill", `var(${CssVars.btnTextBmed})`);
    } catch (error: any) {
      bmSvgPath.setAttribute("d", BookmarkIcon.normalSvgData);
      bmSvgPath.setAttribute("fill", `var(${CssVars.btnTextErr})`);
      throw `Error adding bookmark: ${error.message}`;
    }
  } else {
    try {
      bmSvgPath.setAttribute("d", BookmarkIcon.normalSvgData);
      await storage.removeBookmark(postBody);
      bmSvgPath.setAttribute("fill", `var(${CssVars.btnText})`);
    } catch (error: any) {
      bmSvgPath.setAttribute("d", BookmarkIcon.bookmarkedSvgData);
      bmSvgPath.setAttribute("fill", `var(${CssVars.btnTextErr})`);
      throw `Error removing bookmark: ${error.message}`;
    }
  }
}
