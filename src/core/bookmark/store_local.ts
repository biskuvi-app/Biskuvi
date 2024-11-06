import type { BookmarkStorage } from "./interface";
import { getPostAtUri } from "./bm_utils";
import { Browser } from "../../helpers/browser";

export class LocalStorage implements BookmarkStorage {
  async getBookmarks(): Promise<{ [keys: string]: string } | undefined | null> {
    let storage: { bookmarks: { [keys: string]: string } } =
      (await Browser.storage.local.get("bookmarks")) ?? { bookmarks: {} };

    let bookmarks = storage.bookmarks;
    return bookmarks;
  }

  async setBookmarks(bookmarks: { [keys: string]: string }) {
    let storage = { bookmarks: bookmarks };
    await Browser.storage.local.set(storage);
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
