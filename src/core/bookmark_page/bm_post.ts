import { Browser } from "../../helpers/browser";
import { Config } from "../../helpers/config";
import { CssVars } from "../../helpers/constant";
import { RsOk } from "../../helpers/result";
import type { EmbedData } from "../../helpers/type";
import { log, err, pollFind } from "../../helpers/utils";
import { Url } from "../bookmark/store_dm";

export function createBmPostItem(atUri: string, postItemRef: Node) {
  let bmPostItem = postItemRef.cloneNode(true) as HTMLElement;

  //// querySelector wont work, use firstChild or similar method instead

  bmPostItem.style.display = "block";
  // log("bmPostItem");
  // log(bmPostItem);

  let newItemWFrame2 = RsOk<HTMLElement>(bmPostItem.firstChild);
  // log("newItemWFrame2");
  // log(newItemWFrame2);

  let newWFrame1 = RsOk<HTMLElement>(newItemWFrame2.firstChild);
  // log("newWFrame1");
  // log(newWFrame1);

  let newContentWPfpWSpacing = RsOk<HTMLElement>(newWFrame1.firstChild);
  // log("newContentWPfpWSpacing");
  // log(newContentWPfpWSpacing);

  let newPostSpacingEmpty = RsOk<HTMLElement>(
    newContentWPfpWSpacing.firstChild,
  );
  // log("newPostContentwithPfp");
  // log(newPostSpacingEmpty);
  let newPostSpacingEmpty2 = RsOk<HTMLElement>(newPostSpacingEmpty.nextSibling);
  // log("newPostContentwithPfp2");
  // log(newPostSpacingEmpty2);

  let newPostContentwithPfp = RsOk<HTMLElement>(
    newPostSpacingEmpty2.nextSibling,
  );
  // log("newPostContentwithPfp2");
  // log(newPostSpacingEmpty2);

  let newPostPfp = RsOk<HTMLElement>(newPostContentwithPfp.firstChild);
  // log("newPostPfp");
  // log(newPostPfp);

  let newPostPfpChild = RsOk<HTMLElement>(newPostPfp.firstChild);
  // log("newPostPfpChild");
  // log(newPostPfpChild);

  let newPostPfpChildChild = RsOk<HTMLElement>(newPostPfpChild.firstChild);
  // log("newPostPfpChildChild");
  // log(newPostPfpChildChild);

  let newPostPfpAnchor = RsOk<HTMLElement>(newPostPfpChildChild.firstChild);
  // log("newPostPfpAnchor");
  // log(newPostPfpAnchor);
  // newPostPfpAnchor: change href, aria label

  let newPostPfpAnchorChild = RsOk<HTMLElement>(newPostPfpAnchor.firstChild);
  // log("newPostPfpAnchorChild");
  // log(newPostPfpAnchorChild);

  let newPostPfpCircleBorder = RsOk<HTMLElement>(
    newPostPfpAnchorChild.firstChild,
  );
  // log("newPostPfpCircleBorder");
  // log(newPostPfpCircleBorder);
  // newPostPfpCircleBorder: change border color

  let newPostPfpAnchorBgImgDiv = RsOk<HTMLElement>(
    newPostPfpCircleBorder.firstChild,
  );
  // log("newPostPfpAnchorBgImgDiv");
  // log(newPostPfpAnchorBgImgDiv);
  // newPostPfpAnchorBgImgDiv: change style bgImage

  let newPostPfpAnchorImg = RsOk<HTMLElement>(
    newPostPfpAnchorBgImgDiv.nextSibling,
  );
  // log("newPostPfpAnchorImg");
  // log(newPostPfpAnchorImg);
  // newPostPfpAnchorImg: change img src

  let newPostContent = RsOk<HTMLElement>(newPostPfp.nextSibling);
  // log("newPostContent");
  // log(newPostContent);

  let newPostUserHandleDate = RsOk<HTMLElement>(newPostContent.firstChild);
  // log("newPostUserHandleDate");
  // log(newPostUserHandleDate);

  let newPostUserHandle = RsOk<HTMLElement>(newPostUserHandleDate.firstChild);
  // log("newPostUserHandle");
  // log(newPostUserHandle);

  let newPostUserHandleChild = RsOk<HTMLElement>(newPostUserHandle.firstChild);
  // log("newPostUserHandleChild");
  // log(newPostUserHandleChild);

  let newPostUserHandleChildChild = RsOk<HTMLElement>(
    newPostUserHandleChild.firstChild,
  );
  // log("newPostUserHandleChildChild");
  // log(newPostUserHandleChildChild);

  let newPostUserAnchor = RsOk<HTMLElement>(
    newPostUserHandleChildChild.firstChild,
  );
  // log("newPostUserAnchor");
  // log(newPostUserAnchor);
  // newPostUserAnchor: change href

  let newPostUserSpan = RsOk<HTMLElement>(newPostUserAnchor.firstChild);
  // log("newPostUserSpan");
  // log(newPostUserSpan);
  // newPostUserSpan: change inner text

  let newPostHandleAnchor = RsOk<HTMLElement>(newPostUserAnchor.nextSibling);
  // log("newPostHandleAnchor");
  // log(newPostHandleAnchor);
  // newPostHandleAnchor: change href

  let newPostHandleSpan = RsOk<HTMLElement>(newPostHandleAnchor.firstChild);
  // log("newPostHandleSpan");
  // log(newPostHandleSpan);
  // newPostHandleSpan: change inner text

  let newPostDot = RsOk<HTMLElement>(newPostUserHandle.nextSibling);
  // log("newPostDot");
  // log(newPostDot);
  // newPostDate:
  // - change style display

  let newPostDate = RsOk<HTMLElement>(newPostDot.nextSibling);
  // log("newPostDate");
  // log(newPostDate);
  // newPostDate: change href, inner text

  let newPostInnerContentHider = RsOk<HTMLElement>(
    newPostUserHandleDate.nextSibling,
  );
  // log("newPostInnerContentHider");
  // log(newPostInnerContentHider);

  let newPostInnerContentHiderChild = RsOk<HTMLElement>(
    newPostInnerContentHider.firstChild,
  );
  // log("newPostInnerContentHiderChild");
  // log(newPostInnerContentHiderChild);

  let newPostInnerContent = RsOk<HTMLElement>(
    newPostInnerContentHiderChild.firstChild,
  );
  // log("newPostInnerContent");
  // log(newPostInnerContent);
  // newPostInnerContent: change inner content (html + media)

  let newPostButtons = RsOk<HTMLElement>(newPostInnerContentHider.nextSibling);
  // log("newPostButtons");
  // log(newPostButtons);

  let newReplyBtnFrame = RsOk<HTMLElement>(newPostButtons.firstChild);
  // log("newReplyBtnFrame");
  // log(newReplyBtnFrame);

  let newReplyBtnInnerFrame = RsOk<HTMLElement>(newReplyBtnFrame.firstChild);
  // log("newReplyBtnInnerFrame");
  // log(newReplyBtnInnerFrame);
  // newReplyBtnInnerFrame: change reply button counts

  let newRepostBtnFrame = RsOk<HTMLElement>(newReplyBtnFrame.nextSibling);
  // log("newRepostBtnFrame");
  // log(newRepostBtnFrame);

  let newRepostBtnInnerFrame = RsOk<HTMLElement>(newRepostBtnFrame.firstChild);

  // log("newRepostBtnInnerFrame");
  // log(newRepostBtnInnerFrame);
  // newRepostBtnInnerFrame: change repost button counts

  let newLikeBtnFrame = RsOk<HTMLElement>(newRepostBtnFrame.nextSibling);
  // log("newLikeBtnFrame");
  // log(newLikeBtnFrame);

  let newLikeBtnInnerFrame = RsOk<HTMLElement>(newLikeBtnFrame.firstChild);
  // log("newLikeBtnInnerFrame");
  // log(newLikeBtnInnerFrame);
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
  // newPostPfpCircleBorder.style.border = "0px solid black";

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

  //// show placeholder
  newPostContent.insertBefore(
    postContentPlaceholder,
    RsOk<Node>(newPostContent.firstChild),
  );

  //// mark atUri for bookmark button ----
  newPostContent.setAttribute("atUri", atUri);

  // async insert data from embed
  let uri = atUri.split("at://")[1];

  async function insertDataFromEmbed() {
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.addEventListener("load", async () => {
      let data: { [key: string]: EmbedData } | null = null;
      let timer: Timer | null = null;

      let count = 0;
      function findEmbedInStorage() {
        count += 1;
        // timeout
        if (count > 20) {
          clearInterval(RsOk<Timer>(timer));
          err(`Timeout getting data for atUri ${atUri}`);
          return;
        }
        // found
        if (data != null && data != undefined) {
          return data as { [key: string]: EmbedData };
        }

        try {
          Browser.storage.local
            .get(atUri)
            .then((result: { [key: string]: EmbedData } | null) => {
              if (result) {
                data = result;
              }
            });
        } catch (e) {
          err(`Error getting data for atUri ${atUri}:\n${e}`);
        }
      }

      async function handleFoundEmbedData(foundData: {
        [key: string]: EmbedData;
      }) {
        try {
          newPostContent.removeChild(postContentPlaceholder);
        } catch (e: any) {
          err(e);
        }
        let embedData = foundData[atUri];
        log(`Found stored embed for ${atUri}`);
        log(embedData);
        newPostPfpAnchor.setAttribute("href", embedData.user.href);
        newPostPfpAnchor.setAttribute("aria-label", embedData.user.name);
        newPostPfpAnchorBgImgDiv.style.backgroundImage = `url("${embedData.user.img}")`;
        newPostPfpAnchorImg.setAttribute("src", embedData.user.img);
        newPostUserAnchor.setAttribute("href", embedData.user.href);
        newPostUserSpan.innerText = embedData.user.name;
        newPostHandleAnchor.setAttribute("href", embedData.user.href);
        newPostHandleSpan.innerText = embedData.user.handle;
        newPostDot.style.display = "block";
        let url = `${Config.bskyUrl}/profile/${uri}`;
        newPostDate.setAttribute("href", url);
        newPostDate.innerHTML = embedData.post.date;
        newPostInnerContent.innerHTML =
          embedData.post.content + embedData.post.embed;
      }

      timer = pollFind<{ [key: string]: EmbedData }>(
        findEmbedInStorage,
        handleFoundEmbedData,
        500,
      );

      // done
    });

    iframe.src = Url.getEmbed(uri);
    bmPostItem.appendChild(iframe);
  }

  insertDataFromEmbed();

  return bmPostItem;
}
