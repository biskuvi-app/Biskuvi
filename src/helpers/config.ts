import type { BookmarkStorage } from "../core/bookmark/interface";

export const Config = {
  bskyUrl: "https://bsky.app",
  bookmarkPageUrlAlias: "/bookmarks",
  handleResolverUrl: "https://bsky.social",
  embedUrl: "https://embed.bsky.app/embed",
};

export const State = {
  log: { enable: true, tracing: false } as {
    enable: boolean;
    tracing: boolean;
  },
  storage: null as BookmarkStorage | null,
  root: null as Element | null,
  bookmarkPageUrl: null as string | null,
  locale: "en",
  polls: {},
};
