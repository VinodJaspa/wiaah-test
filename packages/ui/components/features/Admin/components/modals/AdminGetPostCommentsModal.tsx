import {
  AdminListTable,
  AdminTableCellTypeEnum,
  usePaginationControls,
} from "@blocks";
import { ContentHostType } from "@features/API";
import {
  useAdminGetContentCommentsQuery,
  useGetContentCommentsQuery,
} from "@features/Social";
import {
  Button,
  CloseIcon,
  HStack,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TrashIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdCheckmark } from "react-icons/io";

export const AdminGetPostCommentsModal: React.FC<{
  postId: string;
  contentType: string;
  onClose: () => any;
}> = ({ onClose, postId, contentType }) => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();

  const { data, isLoading } = useAdminGetContentCommentsQuery({
    contentId: postId,
    contentType: contentType as ContentHostType,
    pagination,
  });

  const isOpen = !!postId && !!contentType;

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent className="min-w-[min(100%,80rem)] overflow-y-scroll thinScroll">
        <ModalHeader
          className="font-smibold text-xl"
          title={t("Post Comments")}
        />
        <AdminListTable
          pagination={controls}
          title={t("Comments")}
          headers={[
            {
              type: AdminTableCellTypeEnum.avatar,
              value: t("photo"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("username"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("content"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("likes"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("replies"),
            },
            {
              type: AdminTableCellTypeEnum.date,
              value: t("commented At"),
            },
            {
              type: AdminTableCellTypeEnum.action,
              value: t("Action"),
            },
          ]}
          data={
            data?.map((v, i) => ({
              id: v.id,
              cols: [
                {
                  type: AdminTableCellTypeEnum.avatar,
                  value: v.author?.photo,
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: v.author?.username,
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: v.content,
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: v.likes.toString(),
                },
                {
                  type: AdminTableCellTypeEnum.text,
                  value: v.replies.toString(),
                },
                {
                  type: AdminTableCellTypeEnum.date,
                  value: new Date(v.commentedAt).toDateString(),
                },
                {
                  type: AdminTableCellTypeEnum.action,
                  actionBtns: [
                    <DeleteCommentActionButtons
                      onDeletion={() => {}}
                    ></DeleteCommentActionButtons>,
                  ],
                },
              ],
            })) || []
          }
        />
      </ModalContent>
    </Modal>
  );
};

const DeleteCommentActionButtons: React.FC<{ onDeletion: () => any }> = ({
  onDeletion,
}) => {
  const [confirm, setConfirm] = React.useState(false);
  return (
    <HStack>
      {confirm ? (
        <>
          <Button onClick={onDeletion} center className="p-2">
            <IoMdCheckmark></IoMdCheckmark>
          </Button>
          <Button
            colorScheme="danger"
            onClick={() => setConfirm(false)}
            center
            className="p-2"
          >
            <CloseIcon></CloseIcon>
          </Button>
        </>
      ) : (
        <Button
          colorScheme="danger"
          onClick={() => setConfirm(true)}
          className="p-2"
          center
        >
          <TrashIcon />
        </Button>
      )}
    </HStack>
  );
};
