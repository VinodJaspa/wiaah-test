import { useRecoilState } from "recoil";
import { ShareWithPostIdState } from "@UI";

const useShareWithModal = () => {
  const [postId, setPostId] = useRecoilState(ShareWithPostIdState);

  function ShareWith(id: typeof postId) {
    setPostId(id);
  }

  function cancelShare() {
    setPostId(null);
  }

  return {
    postId,
    ShareWith,
    cancelShare,
  };
};
