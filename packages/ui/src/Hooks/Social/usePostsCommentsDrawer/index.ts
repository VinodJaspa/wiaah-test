import { useRecoilState } from "recoil";
import { postsCommentsPostIdState } from "@UI";

export const usePostsCommentsDrawer = () => {
  const [postId, setPostId] = useRecoilState(postsCommentsPostIdState);

  function removePostComments() {
    setPostId(undefined);
  }
  function setCommentsPostId(id: string) {
    setPostId(id);
  }

  return {
    postId,
    setCommentsPostId,
    removePostComments,
  };
};
