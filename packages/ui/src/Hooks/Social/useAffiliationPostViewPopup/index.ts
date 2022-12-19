import { useRecoilState } from "recoil";
import { AffiliationPostIdState } from "@UI";

export const useAffiliationPostViewPopup = () => {
  const [postId, setPostId] = useRecoilState(AffiliationPostIdState);

  function setCurrentPost(id: string) {
    setPostId(id);
  }

  function removeCurrentPost() {
    setPostId(undefined);
  }

  return {
    postId,
    setCurrentPost,
    removeCurrentPost,
  };
};
