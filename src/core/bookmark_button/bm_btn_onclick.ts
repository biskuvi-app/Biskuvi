import { State } from "../../helpers/config";
import { BookmarkIcon, CssVars } from "../../helpers/constant";
import { RsOk } from "../../helpers/result";
import type { BookmarkStorage } from "../bookmark/interface";

export function bmBtnOnClick(e: Event) {
  e.stopPropagation();

  let currTarget = RsOk<HTMLElement>(e.currentTarget);
  let postBody = RsOk<Element>(currTarget.parentNode?.parentNode?.parentNode);
  let bmSvgPath = RsOk<Element>(currTarget.querySelector("path"));

  let storage = RsOk<BookmarkStorage>(State.storage);
  (async () => {
    if (!(await storage.isBookmarked(postBody))) {
      // add to bookmarks
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
      // remove from bookmarks
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
  })();
  return false;
}
