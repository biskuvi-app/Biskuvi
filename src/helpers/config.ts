import type { BookmarkStorage } from "../core/bookmark/interface";
import { CssVars } from "./constant";

export const Config = {
  interval: 500,
  bookmarkPageUrlAlias: "/bookmarks",
  handleResolverUrl: "https://bsky.social",
  oEmbedUrl: "https://embed.bsky.app/oembed",
  css: `
    html{
      ${CssVars.btnTextBmed}: #0085ff;
      ${CssVars.btnTextErr}: red;
    }
    html.theme--light{
      ${CssVars.btnText}: rgb(111, 134, 159);
      ${CssVars.btnHover}: rgb(241, 243, 245);
    }
    html.theme--dark{
      ${CssVars.btnText}: rgb(111, 134, 159);
      ${CssVars.btnHover}: rgb(20, 27, 35);
    }
    html.theme--dim{
      ${CssVars.btnText}: rgb(120, 142, 165);
      ${CssVars.btnHover}: rgb(30, 41, 54);
    }
    .bm:hover{
      background-color: var(${CssVars.btnHover});
    }
  `,
};

export const State = {
  storage: null as BookmarkStorage | null,
  root: null as Element | null,
  bookmarkPageUrl: null as string | null,
  locale: "en",
};
