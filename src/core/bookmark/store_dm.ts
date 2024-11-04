import type { BookmarkStorage } from "./interface";
import { expect } from "../../helpers/nullish";
import {
  deleteMessageForSelf,
  getCid,
  getDid,
  sendMessage,
} from "./store_dm_fetch";
import { getPostAtUri } from "./bm_utils";
import { Config } from "../../helpers/config";

async function getBmDid() {
  // "qvmvynssslo5yhstrnc2cwv6";
  return "<BmDid>";
}

async function getConvoId() {
  // "3l7swygaejx22";
  return "<ConvoId>";
}

export async function getPdsUrl() {
  // "https://shiitake.us-east.host.bsky.network";
  return "<PdsUrl>";
}

const DmState = {
  pdsUrl: null as string | null,
  convoId: null as string | null,
  bookmarkAccDid: null as string | null,
};

export const Url = {
  getEmbed: (atUri: string) => `${Config.oEmbedUrl}?url=${atUri}`,
  resolveHandle: (atProtoHandle: string) =>
    `${Config.handleResolverUrl}/xrpc/com.atproto.identity.resolveHandle?handle=${atProtoHandle}`,
  sendMessage: () => `${DmState.pdsUrl}/xrpc/chat.bsky.convo.sendMessage`,
  deleteMessageForSelf: () =>
    `${DmState.pdsUrl ?? expect<string>("deleteMessageForSelf")}/xrpc/chat.bsky.convo.deleteMessageForSelf`,
  getConvoForMembers: () =>
    `${DmState.pdsUrl ?? expect<string>("getConvoForMembers")}/xrpc/chat.bsky.convo.getConvoForMembers?members=${DmState.bookmarkAccDid}`,
  getPosts: (did: string, postId: string) =>
    `${DmState.pdsUrl ?? expect<string>("getPosts")}/xrpc/app.bsky.feed.getPosts?uris=at%3A%2F%2F${did}%2Fapp.bsky.feed.post%2F${postId}`,
};

export async function loadState() {
  let bmDid = getBmDid();
  let pdsUrl = getPdsUrl();
  let convoId = getConvoId();

  let values = await Promise.all([bmDid, pdsUrl, convoId]);
  DmState.bookmarkAccDid = values[0];
  DmState.pdsUrl = values[1];
  DmState.convoId = values[2];
}

export class DmStorage implements BookmarkStorage {
  async getBookmarks(): Promise<{ [keys: string]: string } | undefined | null> {
    throw "not implemented";
  }
  async isBookmarked(postBody: HTMLDivElement): Promise<boolean> {
    throw "not implemented";
  }
  async addBookmark(postBody: HTMLDivElement) {
    let atUri = await getPostAtUri(postBody);
    let cid = await getCid(atUri);
    let messageId = await sendMessage(atUri, cid);
    postBody.setAttribute("messageId", messageId);
  }

  async removeBookmark(postBody: HTMLElement) {
    let messageId =
      postBody.getAttribute("messageId") ?? expect<string>("messageId");
    await deleteMessageForSelf(messageId);
  }
}
