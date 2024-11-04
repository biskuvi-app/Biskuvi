import type { BookmarkStorage } from "./interface";
import { getPostAtUri } from "./bm_utils";

export class LocalStorage implements BookmarkStorage {
  storage =
    window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
      ? // @ts-expect-error
        browser.storage.local
      : // @ts-expect-error
        chrome.storage.local;

  async getBookmarks(): Promise<{ [keys: string]: string } | undefined | null> {
    let storage: { bookmarks: { [keys: string]: string } } =
      (await this.storage.get("bookmarks")) ?? { bookmarks: {} };

    let bookmarks = storage.bookmarks;
    return bookmarks;
  }

  async setBookmarks(bookmarks: { [keys: string]: string }) {
    let storage = { bookmarks: bookmarks };
    await this.storage.set(storage);
  }

  async isBookmarked(postBody: HTMLDivElement) {
    let url = await getPostAtUri(postBody);
    let bookmarks = await this.getBookmarks();
    if (!bookmarks) {
      return false;
    }
    return url in bookmarks;
  }

  async addBookmark(postBody: HTMLDivElement) {
    let bookmarks = await this.getBookmarks();
    if (!bookmarks) {
      bookmarks = {};
    }
    bookmarks[await getPostAtUri(postBody)] = "1";
    await this.setBookmarks(bookmarks);
  }

  async removeBookmark(postBody: HTMLDivElement) {
    let bookmarks = await this.getBookmarks();
    if (!bookmarks) {
      return;
    }
    delete bookmarks[await getPostAtUri(postBody)];
    await this.setBookmarks(bookmarks);
  }
}
