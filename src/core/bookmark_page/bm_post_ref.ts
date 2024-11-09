import { RsOk } from "../../helpers/result";

export function getPostItemRef(likeBtn: Node): HTMLElement[] {
  let likeBtnWithFrame = RsOk<Node>(likeBtn.parentNode);
  let postButtons = RsOk<Node>(likeBtnWithFrame.parentNode);
  let postContent = RsOk<Node>(postButtons.parentNode);
  let postContentwithPfp = RsOk<Node>(postContent.parentNode);
  let postContentwithPfpWithSpacing = RsOk<Node>(postContentwithPfp.parentNode);
  let postItemWithFrame1 = RsOk<Node>(postContentwithPfpWithSpacing.parentNode);
  let postItemWithFrame2 = RsOk<Node>(postItemWithFrame1.parentNode);
  let postItemWithTopFrame = RsOk<Node>(postItemWithFrame2.parentNode);
  return [
    postItemWithTopFrame.parentNode! as HTMLElement,
    postItemWithTopFrame.parentNode!.removeChild(
      postItemWithTopFrame,
    ) as HTMLElement,
  ];
}
