import {
  Button,
  CloseIcon,
  HStack,
  Modal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  SelectOption,
} from "@partials";
import React from "react";
import { useAdminGetPost, useAdminUpdatePostMutation } from "@features/Social";
import { useForm } from "utils";
import { useTranslation } from "react-i18next";
import { CommentsVisibility, PostVisibility } from "@features/API";
import { startCase } from "lodash";

export const AdminUpdatePostSettingsModal: React.FC<{
  postId: string;
  onClose: () => any;
}> = ({ postId, onClose }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { data } = useAdminGetPost(postId);

  const { mutate } = useAdminUpdatePostMutation();

  const { form, selectProps } = useForm<Parameters<typeof mutate>[0]>(
    {
      id: data?.id || "",
      userId: data?.userId || "",
      visibility: data?.visibility,
      commentsVisibility: data?.commentsVisibility,
      enableComments: data?.enableComments,
    },
    {},
    { addLabel: true }
  );

  const submit = () => {
    if (data?.id && data?.userId) {
      mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <Modal isOpen={!!postId} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-4">
        <HStack className="justify-between items-center">
          <p className="font-bold text-xl">{t("Update Post")}</p>
          <ModalButton>
            <CloseIcon />
          </ModalButton>
        </HStack>
        <Select {...selectProps("visibility")}>
          {Object.values(PostVisibility).map((v) => (
            <SelectOption value={v}>{startCase(v)}</SelectOption>
          ))}
        </Select>

        <Select {...selectProps("commentsVisibility")}>
          {Object.values(CommentsVisibility).map((v) => (
            <SelectOption value={v}>{startCase(v)}</SelectOption>
          ))}
        </Select>

        <Select {...selectProps("enableComments")}>
          <SelectOption value={true}>{t("Enabled")}</SelectOption>
          <SelectOption value={false}>{t("Disabled")}</SelectOption>
        </Select>
        <ModalFooter>
          <HStack className="justify-end">
            <Button onClick={() => onClose()} colorScheme="danger">
              {t("Cancel")}
            </Button>
            <Button onClick={submit}>{t("Submit")}</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
