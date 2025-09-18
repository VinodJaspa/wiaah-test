import { ShareMotheds } from "types";
import { useShareWithModal } from "@UI";

export const useHandlePostSharing = () => {
  const { openShareModal } = useShareWithModal();

  function handleShare(ShareMothed: ShareMotheds, postId: string) {
    switch (ShareMothed) {
      case "followers":
        openShareModal(postId);
        break;

      default:
        break;
    }
  }

  return { handleShare };
};
