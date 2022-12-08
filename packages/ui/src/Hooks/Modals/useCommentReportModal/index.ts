import { useRecoilState } from "recoil";
import { CommentReportModalIdState } from "ui";
export const useCommentReportModal = () => {
  const [commentId, setCommentId] = useRecoilState(CommentReportModalIdState);

  function openModalWithId(id: string) {
    setCommentId(id);
  }

  function closeModal() {
    setCommentId(null);
  }

  return {
    commentId,
    openModalWithId,
    closeModal,
  };
};
