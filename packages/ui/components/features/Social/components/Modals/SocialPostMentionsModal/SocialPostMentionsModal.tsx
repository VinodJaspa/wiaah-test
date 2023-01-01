import React from "react";
import {
  Modal,
  ModalCloseButton,
  CloseIcon,
  ModalContent,
  ModalOverlay,
  useGetPostMentionsQuery,
  usePaginationControls,
  SpinnerFallback,
  Avatar,
  Button,
  Divider,
} from "@UI";
import { useReactPubsubModal } from "react-pubsub";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";

export const useSocialPostMentionsModal = (sub?: boolean) =>
  useReactPubsubModal<{ postId: string; postType: string }>(
    () => "postMentionsModal",
    sub
  );

export const SocialPostMentionsModal: React.FC = () => {
  const { close, isOpen, value } = useSocialPostMentionsModal(true);
  const { pagination } = usePaginationControls();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetPostMentionsQuery(
    value as { postId: string; postType: string },
    pagination,
    {
      enabled: !!value,
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent className="h-[90%]">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          <div className="flex justify-between items-center gap-4">
            <span></span>
            <p className="font-semibold text-xl">{t("Mentioned Pepole")}</p>
            <ModalCloseButton>
              <CloseIcon className="text-xl" />
            </ModalCloseButton>
          </div>
          <Divider />
          <div className="flex flex-col h-[calc(100%-2rem)] px-2 overflow-scroll thinScroll gap-4">
            {mapArray(
              data?.data,
              ({ note, profielId, thumbnail, userId, username }, i) => (
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <Avatar
                      className="w-[4rem]"
                      src={thumbnail}
                      alt={username}
                    />
                    <div className="flex flex-col 1">
                      <p className="font-bold text-lg">{username}</p>
                      <p className="text-grayText">{note}</p>
                    </div>
                  </div>
                  <div>
                    <Button>{t("Follow")}</Button>
                  </div>
                </div>
              )
            )}
          </div>
        </SpinnerFallback>
      </ModalContent>
    </Modal>
  );
};
