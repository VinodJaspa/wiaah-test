import { useRecoilState } from "recoil";
import { postsCommentsPostIdState } from "ui";

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
