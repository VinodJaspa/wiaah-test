import { ShareMotheds } from "types";
import { useShareWithModal } from "ui";

export const useHandlePostSharing = () => {
  const { ShareWith } = useShareWithModal();

  function handleShare(ShareMothed: ShareMotheds, postId: string) {
    switch (ShareMothed) {
      case "followers":
        ShareWith(postId);
        break;

      default:
        break;
    }
  }

  return { handleShare };
};
