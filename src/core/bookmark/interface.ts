export interface BookmarkStorage {
  getBookmarks: () => Promise<{ [keys: string]: string } | undefined | null>;
  isBookmarked: (postBody: HTMLDivElement) => Promise<boolean>;
  addBookmark: (postBody: HTMLDivElement) => Promise<void>;
  removeBookmark: (postBody: HTMLDivElement) => Promise<void>;
}
