import { Browser } from "../../helpers/browser";
import { RsOk } from "../../helpers/result";
import { log, err } from "../../helpers/utils";
import { Url } from "../bookmark/store_dm";

export function createBmPostItem(atUri: string, postItemRef: Node) {
  let bmPostItem = postItemRef.cloneNode(true) as HTMLElement;
  bmPostItem.style.display = "block";
  log("bmPostItem");
  log(bmPostItem);

  let newItemWFrame2 = RsOk<HTMLElement>(bmPostItem.firstElementChild);
  log("newItemWFrame2");
  log(newItemWFrame2);

  let newWFrame1 = RsOk<HTMLElement>(newItemWFrame2.firstElementChild);
  log("newWFrame1");
  log(newWFrame1);

  let newContentWPfpWSpacing = RsOk<HTMLElement>(newWFrame1.firstElementChild);
  log("newContentWPfpWSpacing");
  log(newContentWPfpWSpacing);

  let newPostSpacingEmpty = RsOk<HTMLElement>(
    newContentWPfpWSpacing.firstElementChild,
  );
  log("newPostContentwithPfp");
  log(newPostSpacingEmpty);
  let newPostSpacingEmpty2 = RsOk<HTMLElement>(
    newPostSpacingEmpty.nextElementSibling,
  );
  log("newPostContentwithPfp2");
  log(newPostSpacingEmpty2);

  let newPostContentwithPfp = RsOk<HTMLElement>(
    newPostSpacingEmpty2.nextElementSibling,
  );
  log("newPostContentwithPfp2");
  log(newPostSpacingEmpty2);

  let newPostPfp = RsOk<HTMLElement>(newPostContentwithPfp.firstElementChild);
  log("newPostPfp");
  log(newPostPfp);
  // let img = RsOk<Element>(
  //   newPostPfp.firstChild!.firstChild!.firstChild!.firstChild!.firstChild!
  //     .firstChild,
  // );

  let newPostContent = RsOk<HTMLElement>(newPostPfp.nextElementSibling);
  log("newPostContent");
  log(newPostContent);

  let newPostTitleDate = RsOk<HTMLElement>(newPostContent.firstElementChild);
  log("newPostTitleDate");

  log(newPostTitleDate);
  let newPostBody = RsOk<HTMLElement>(newPostTitleDate.nextElementSibling);
  log(newPostBody);
  let newPostButtons = RsOk<HTMLElement>(newPostBody.nextElementSibling);
  log(newPostButtons);

  let iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.addEventListener("load", async () => {
    let data: { [key: string]: string } | null = null;

    let count = 0;
    let findEmbedInStorageInterval: Timer | null;
    async function findEmbedInStorage() {
      count += 1;
      if (count > 20) {
        if (findEmbedInStorageInterval) {
          clearInterval(findEmbedInStorageInterval);
        }
        return;
      }
      try {
        data = await Browser.storage.local.get(atUri);
      } catch (e) {
        err(`Error getting data ${e}`);
      }
      if (!data) {
        return;
      }
      let value = data[atUri];
      log(`Found stored embed ${atUri} :\n ${value}`);
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(value, "text/html");

      // // TODO: put data into its boxes
      // // also yeah querySelector wont work, use firstElementChild or similar instead

      // let newPfp = xmlDoc.querySelector("img");
      // if (newPfp) {
      //   (img as HTMLElement).style.backgroundImage = newPfp.src;
      // }
      // newPostContentwithPfp.appendChild(xmlDoc);
      if (findEmbedInStorageInterval) {
        clearInterval(findEmbedInStorageInterval);
      }
    }

    findEmbedInStorageInterval = setInterval(findEmbedInStorage, 500);
  });

  iframe.src = Url.getEmbed(atUri.split("at://")[1]);
  bmPostItem.appendChild(iframe);
  return bmPostItem;
}
