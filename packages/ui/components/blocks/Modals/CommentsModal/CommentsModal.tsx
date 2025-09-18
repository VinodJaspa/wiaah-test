import { usePaginationControls } from "@blocks/Navigating";
import { PostCommentCard } from "@blocks/Social";
import { ContentHostType } from "@features/API";
import { useAdminGetContentCommentsQuery } from "@features/Social";
import { Modal, ModalContent, Pagination } from "@partials";
import { mapArray } from "utils";
import React from "react";

export const AdminCommentsModal: React.FC<{
  contentId?: string;
  contentType?: ContentHostType;
}> = ({ contentId, contentType }) => {
  const { pagination, controls } = usePaginationControls();
  const { data } = useAdminGetContentCommentsQuery(
    {
      contentId,
      contentType,
      pagination,
    } as any,
    !!contentId && !!contentType,
  );

  return (
    <Modal isOpen={!!contentId && !!contentId} onClose={() => { }}>
      <ModalContent>
        {mapArray(data, (v) => (
          <PostCommentCard comment={v as any} />
        ))}
        <Pagination  />
      </ModalContent>
    </Modal>
  );
};
