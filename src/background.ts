import { getEmbed } from "./core/bookmark/bm_utils";
import { Url } from "./core/bookmark/store_dm";
import { Browser } from "./helpers/browser";
import { err, log } from "./helpers/utils";

try {
  Browser.runtime.onMessage.addListener(
    (data: { request: string; atUri: string }, _sender: any) => {
      log("message");
      if (data.request === "get_embed") {
        return Promise.resolve(Url.getEmbed(data.atUri));
      }
      return;
    },
  );
} catch (e) {
  err(e);
}
