import { ShareMotheds } from "types";
import { useShareWithModal } from "@UI";

export const useHandlePostSharing = () => {
  const { OpenModal } = useShareWithModal();

  function handleShare(ShareMothed: ShareMotheds, postId: string) {
    switch (ShareMothed) {
      case "followers":
        OpenModal(postId);
        break;

      default:
        break;
    }
  }

  return { handleShare };
};
