import { StorageMode } from "../../helpers/constant";
import type { BookmarkStorage } from "./interface";
import { DmStorage, loadState } from "./store_dm";
import { LocalStorage } from "./store_local";

export async function getStorage(mode: StorageMode): Promise<BookmarkStorage> {
  switch (mode) {
    case StorageMode.localStorage:
      return new LocalStorage();
    case StorageMode.directMessage:
      await loadState();
      return new DmStorage();
  }
  throw "Not implemented";
}
