import { useRecoilState } from "recoil";
import { newsFeedPostIdState } from "ui";

export const useNewsFeedPostPopup = () => {
  const [postId, setPostId] = useRecoilState(newsFeedPostIdState);

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
