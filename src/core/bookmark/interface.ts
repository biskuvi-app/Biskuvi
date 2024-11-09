export interface BookmarkStorage {
  getBookmarks: () => Promise<{ [keys: string]: string } | undefined | null>;
  isBookmarked: (postBody: Element) => Promise<boolean>;
  addBookmark: (postBody: Element) => Promise<void>;
  removeBookmark: (postBody: Element) => Promise<void>;
}
