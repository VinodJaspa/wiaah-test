import { useRecoilState } from "recoil";
import { AffiliationPostIdState } from "ui";

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
