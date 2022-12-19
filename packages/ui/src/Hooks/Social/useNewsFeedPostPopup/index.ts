import { useRecoilState } from "recoil";
import { newsFeedPostIdState } from "@UI";

export const useNewsFeedPostPopup = () => {
  const [postId, setPostId] = useRecoilState(newsFeedPostIdState);

  function setCurrentPost(id: string) {
    console.log("set");
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
