import { Browser } from "../../helpers/browser";
import { shortEnglishHumanizer } from "../../helpers/datetime";
import { RsOk } from "../../helpers/result";
import type { EmbedData } from "../../helpers/type";
import { waitElement, log } from "../../helpers/utils";

export async function handleEmbedPage() {
  let uri = window.location.href.split("/embed/")[1];
  let atUri = "at://" + uri;
  await Browser.storage.local.remove(atUri);
  waitElement("div.w-full").then(async (divRootChild) => {
    let divRootChildAnchor = RsOk<Node>(divRootChild.firstChild);
    let divRootChildDiv = RsOk<Node>(divRootChildAnchor.nextSibling);
    let content = RsOk<Node>(divRootChildDiv.firstChild);

    let header = RsOk<Node>(content.firstChild);
    if (header.firstChild) {
      let text = RsOk<HTMLElement>(header.nextSibling);
      let embed = RsOk<HTMLElement>(text.nextSibling);
      let dateTimeAnchor = RsOk<Node>(embed.nextSibling);
      let buttons = RsOk<Node>(dateTimeAnchor.nextSibling);

      // pfp
      let headerPfpAnchor = RsOk<HTMLAnchorElement>(header.firstChild);
      let headerPfpAnchorDiv = RsOk<Node>(headerPfpAnchor.firstChild);
      let headerPfpImg = RsOk<HTMLImageElement>(headerPfpAnchorDiv.firstChild);

      // user & handle
      let headerUserHandle = RsOk<Node>(headerPfpAnchor.nextSibling);

      let userAnchor = RsOk<HTMLAnchorElement>(headerUserHandle.firstChild);
      let userPara = RsOk<HTMLParagraphElement>(userAnchor.firstChild);

      let handleAnchor = RsOk<HTMLAnchorElement>(userAnchor.nextSibling);
      let handlePara = RsOk<HTMLParagraphElement>(handleAnchor.firstChild);

      // date
      let dateTime = RsOk<HTMLTimeElement>(dateTimeAnchor.firstChild);

      // buttons
      let likeBtnFrame = RsOk<Node>(buttons.firstChild);
      let likeIcon = RsOk<Node>(likeBtnFrame.firstChild);
      let likeCount = RsOk<HTMLElement>(likeIcon.nextSibling);

      let repostBtnFrame = RsOk<Node>(likeBtnFrame.nextSibling);
      let repostIcon = RsOk<Node>(repostBtnFrame.firstChild);
      let repostCount = RsOk<HTMLElement>(repostIcon.nextSibling);

      let spacer = RsOk<Node>(repostBtnFrame.nextSibling);

      let replyPara = RsOk<HTMLElement>(spacer.nextSibling);

      let duration = shortEnglishHumanizer(
        new Date().getTime() - new Date(dateTime.dateTime).getTime(),
        { spacer: "" },
      );

      if (duration.indexOf(",") > -1) {
        duration = duration.split(",")[0];
      }

      let embedData: EmbedData = {
        user: {
          href: headerPfpAnchor.href,
          name: userPara.innerText.trim(),
          handle: handlePara.innerText.trim(),
          img: headerPfpImg.src,
        },
        post: {
          date: dateTime.dateTime,
          formattedDate: dateTime.innerText.trim(),
          duration: duration,
          content: text.innerHTML,
          embed: embed.outerHTML,
        },
        buttons: {
          replies: replyPara.innerText.trim(),
          reposts: repostCount.innerText.trim(),
          likes: likeCount.innerText.trim(),
        },
      };

      let data: { [key: string]: EmbedData } = {};
      data[atUri] = embedData;
      await Browser.storage.local.set(data);
      log(`Stored atUri embed: ${atUri}`);
    } else {
      let uriSplit = uri.split("/");
      let postId = uriSplit[uriSplit.length - 1];
      let handle = uriSplit[0];
      let profileUrl = `/profile/${handle}`;
      let postUrl = `${profileUrl}/post/${postId}`;
      let embedData: EmbedData = {
        user: {
          href: profileUrl,
          name: "Post is not allowed in embed",
          handle: handle,
          img: "",
        },
        post: {
          date: "",
          formattedDate: "",
          duration: "0",
          content: "Click here to view bookmarked post",
          embed: "",
        },
        buttons: {
          replies: "",
          reposts: "",
          likes: "",
        },
      };
      let data: { [key: string]: EmbedData } = {};
      data[atUri] = embedData;
      await Browser.storage.local.set(data);
      log(`Stored atUri embed (post require sign in): ${atUri}`);
    }
  });
}
