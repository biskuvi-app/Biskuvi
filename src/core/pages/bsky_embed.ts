import { Browser } from "../../helpers/browser";
import { waitElement, log } from "../../helpers/utils";

export async function handleEmbedPage() {
  let atUri = "at://" + window.location.href.split("/embed/")[1];
  await Browser.storage.local.remove(atUri);
  waitElement("div.w-full").then(async (a) => {
    let div = a.parentElement! as HTMLElement;
    let data: { [key: string]: string } = {};
    data[atUri] = div.getHTML();
    await Browser.storage.local.set(data);
    log(`Stored atUri embed: ${atUri}`);
  });
}
