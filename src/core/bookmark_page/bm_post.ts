import { Browser } from "../../helpers/browser";
import { CssVars } from "../../helpers/constant";
import { RsOk } from "../../helpers/result";
import { log, err } from "../../helpers/utils";
import { Url } from "../bookmark/store_dm";

export function createBmPostItem(atUri: string, postItemRef: Node) {
  let bmPostItem = postItemRef.cloneNode(true) as HTMLElement;

  //// querySelector wont work, use firstElementChild or similar method instead

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

  let newPostPfpChild = RsOk<HTMLElement>(newPostPfp.firstElementChild);
  log("newPostPfpChild");
  log(newPostPfpChild);

  let newPostPfpChildChild = RsOk<HTMLElement>(
    newPostPfpChild.firstElementChild,
  );
  log("newPostPfpChildChild");
  log(newPostPfpChildChild);

  let newPostPfpAnchor = RsOk<HTMLElement>(
    newPostPfpChildChild.firstElementChild,
  );
  log("newPostPfpAnchor");
  log(newPostPfpAnchor);
  // newPostPfpAnchor: change href, aria label

  let newPostPfpAnchorChild = RsOk<HTMLElement>(
    newPostPfpAnchor.firstElementChild,
  );
  log("newPostPfpAnchorChild");
  log(newPostPfpAnchorChild);

  let newPostPfpCircleBorder = RsOk<HTMLElement>(
    newPostPfpAnchorChild.firstElementChild,
  );
  log("newPostPfpCircleBorder");
  log(newPostPfpCircleBorder);
  // newPostPfpCircleBorder: change border color

  let newPostPfpAnchorBgImgDiv = RsOk<HTMLElement>(
    newPostPfpCircleBorder.firstElementChild,
  );
  log("newPostPfpAnchorBgImgDiv");
  log(newPostPfpAnchorBgImgDiv);
  // newPostPfpAnchorBgImgDiv: change style bgImage

  let newPostPfpAnchorImg = RsOk<HTMLElement>(
    newPostPfpAnchorBgImgDiv.nextElementSibling,
  );
  log("newPostPfpAnchorImg");
  log(newPostPfpAnchorImg);
  // newPostPfpAnchorImg: change img src

  let newPostContent = RsOk<HTMLElement>(newPostPfp.nextElementSibling);
  log("newPostContent");
  log(newPostContent);

  let newPostUserHandleDate = RsOk<HTMLElement>(
    newPostContent.firstElementChild,
  );
  log("newPostUserHandleDate");
  log(newPostUserHandleDate);

  let newPostUserHandle = RsOk<HTMLElement>(
    newPostUserHandleDate.firstElementChild,
  );
  log("newPostUserHandle");
  log(newPostUserHandle);

  let newPostUserHandleChild = RsOk<HTMLElement>(
    newPostUserHandle.firstElementChild,
  );
  log("newPostUserHandleChild");
  log(newPostUserHandleChild);

  let newPostUserHandleChildChild = RsOk<HTMLElement>(
    newPostUserHandleChild.firstElementChild,
  );
  log("newPostUserHandleChildChild");
  log(newPostUserHandleChildChild);

  let newPostUserAnchor = RsOk<HTMLElement>(
    newPostUserHandleChildChild.firstElementChild,
  );
  log("newPostUserAnchor");
  log(newPostUserAnchor);
  // newPostUserAnchor: change href

  let newPostUserSpan = RsOk<HTMLElement>(newPostUserAnchor.firstElementChild);
  log("newPostUserSpan");
  log(newPostUserSpan);
  // newPostUserSpan: change inner text

  let newPostHandleAnchor = RsOk<HTMLElement>(
    newPostUserAnchor.nextElementSibling,
  );
  log("newPostHandleAnchor");
  log(newPostHandleAnchor);
  // newPostHandleAnchor: change href

  let newPostHandleSpan = RsOk<HTMLElement>(
    newPostHandleAnchor.firstElementChild,
  );
  log("newPostHandleSpan");
  log(newPostHandleSpan);
  // newPostHandleSpan: change inner text

  let newPostDot = RsOk<HTMLElement>(newPostUserHandle.nextSibling);
  log("newPostDot");
  log(newPostDot);
  // newPostDate:
  // - change style display

  let newPostDate = RsOk<HTMLElement>(newPostDot.nextSibling);
  log("newPostDate");
  log(newPostDate);
  // newPostDate: change href, inner text

  let newPostInnerContentHider = RsOk<HTMLElement>(
    newPostUserHandleDate.nextElementSibling,
  );
  log("newPostInnerContentHider");
  log(newPostInnerContentHider);

  let newPostInnerContentHiderChild = RsOk<HTMLElement>(
    newPostInnerContentHider.firstElementChild,
  );
  log("newPostInnerContentHiderChild");
  log(newPostInnerContentHiderChild);

  let newPostInnerContent = RsOk<HTMLElement>(
    newPostInnerContentHiderChild.firstElementChild,
  );
  log("newPostInnerContent");
  log(newPostInnerContent);
  // newPostInnerContent: change inner content (html + media)

  let newPostButtons = RsOk<HTMLElement>(
    newPostInnerContentHider.nextElementSibling,
  );
  log("newPostButtons");
  log(newPostButtons);

  let newReplyBtnFrame = RsOk<HTMLElement>(newPostButtons.firstElementChild);
  log("newReplyBtnFrame");
  log(newReplyBtnFrame);

  let newReplyBtnInnerFrame = RsOk<HTMLElement>(
    newReplyBtnFrame.firstElementChild,
  );
  log("newReplyBtnInnerFrame");
  log(newReplyBtnInnerFrame);
  // newReplyBtnInnerFrame: change reply button counts

  let newRepostBtnFrame = RsOk<HTMLElement>(
    newReplyBtnFrame.nextElementSibling,
  );
  log("newRepostBtnFrame");
  log(newRepostBtnFrame);

  let newRepostBtnInnerFrame = RsOk<HTMLElement>(
    newRepostBtnFrame.firstElementChild,
  );

  log("newRepostBtnInnerFrame");
  log(newRepostBtnInnerFrame);
  // newRepostBtnInnerFrame: change repost button counts

  let newLikeBtnFrame = RsOk<HTMLElement>(newRepostBtnFrame.nextElementSibling);
  log("newLikeBtnFrame");
  log(newLikeBtnFrame);

  let newLikeBtnInnerFrame = RsOk<HTMLElement>(
    newLikeBtnFrame.firstElementChild,
  );
  log("newLikeBtnInnerFrame");
  log(newLikeBtnInnerFrame);
  // newLiInnerkeBtn: change like button counts

  //// Hide ref content ----

  // newPostPfpAnchor:
  //  - change href
  //  - aria label
  newPostPfpAnchor.setAttribute("href", "");
  newPostPfpAnchor.setAttribute("aria-label", "");

  // newPostPfpCircleBorder:
  //  - change border color
  // todo:
  // let defaultBorderColor = newPostPfpCircleBorder.style.borderColor;
  // let loadingBorderColor = newPostPfpCircleBorder.style.backgroundColor;

  newPostPfpCircleBorder.style.border = "0px solid black";
  // newPostPfpAnchorBgImgDiv:
  //  - change style bgImage
  newPostPfpAnchorBgImgDiv.style.backgroundImage = "";

  // newPostPfpAnchorImg:
  //  - change img src
  newPostPfpAnchorImg.setAttribute("src", "");

  // newPostUserAnchor:
  //  - change href
  newPostUserAnchor.setAttribute("href", "");

  // newPostUserSpan:
  //  - change inner text
  newPostUserSpan.innerText = "";

  // newPostHandleAnchor:
  //  - change href
  newPostHandleAnchor.setAttribute("href", "");

  // newPostHandleSpan:
  //  - change inner text
  newPostHandleSpan.innerText = "";

  // newPostDate:
  // - change style display
  newPostDot.style.display = "none";

  // newPostDate:
  // - change href, inner text
  newPostDate.setAttribute("href", "");
  newPostDate.innerText = "";

  // newPostInnerContent:
  //  - change inner content (html + media)
  newPostInnerContent.innerText = "";

  // newReplyBtn:
  //  - change reply button counts
  if (newReplyBtnInnerFrame.children.length == 2) {
    RsOk<HTMLElement>(newReplyBtnInnerFrame.lastChild).style.display = "none";
  }
  let newReplyBtnIconFrame = RsOk<HTMLElement>(
    newReplyBtnInnerFrame.firstChild,
  );

  // newRepostBtn:
  //  - change repost button counts
  if (newRepostBtnInnerFrame.children.length == 2) {
    RsOk<HTMLElement>(newRepostBtnInnerFrame.lastChild).style.display = "none";
  }
  let newRepostBtnIconFrame = RsOk<HTMLElement>(
    newRepostBtnInnerFrame.firstChild,
  );

  // newLikeBtn:
  //  - change like button counts
  if (newLikeBtnInnerFrame.children.length == 2) {
    RsOk<HTMLElement>(newLikeBtnInnerFrame.lastChild).style.display = "none";
  }
  let newLikeBtnIconFrame = RsOk<HTMLElement>(newLikeBtnInnerFrame.firstChild);

  //// Show placeholder content ----
  // newPostUserHandle
  let postContentPlaceholder = document.createElement("div");

  let postUserHandlePlaceholder = document.createElement("div");
  postUserHandlePlaceholder.style.width = "8em";
  postUserHandlePlaceholder.style.height = ".4em";
  postUserHandlePlaceholder.style.backgroundColor = `var(${CssVars.btnHover})`;
  postUserHandlePlaceholder.style.borderRadius = "0.5em";
  postUserHandlePlaceholder.style.marginTop = "0.3em";
  postUserHandlePlaceholder.style.marginBottom = "0.6em";

  postContentPlaceholder.appendChild(postUserHandlePlaceholder);

  let postInnerContentPlaceholder =
    postUserHandlePlaceholder.cloneNode() as HTMLElement;
  postInnerContentPlaceholder.style.width = "100%";

  postContentPlaceholder.appendChild(postInnerContentPlaceholder.cloneNode());
  postContentPlaceholder.appendChild(postInnerContentPlaceholder.cloneNode());
  postContentPlaceholder.appendChild(postInnerContentPlaceholder);

  newPostContent.insertBefore(
    postContentPlaceholder,
    RsOk<Node>(newPostContent.firstChild),
  );

  //// mark atUri for bookmark button ----
  newPostContent.setAttribute("atUri", atUri);

  // async insert data from embed
  async function insertDataFromEmbed() {
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
        log(`Found stored embed for ${atUri}`);
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(value, "text/html");

        xmlDoc;

        if (findEmbedInStorageInterval) {
          clearInterval(findEmbedInStorageInterval);
        }
      }

      findEmbedInStorageInterval = setInterval(findEmbedInStorage, 500);
    });

    iframe.src = Url.getEmbed(atUri.split("at://")[1]);
    bmPostItem.appendChild(iframe);
  }

  insertDataFromEmbed();

  return bmPostItem;
}
