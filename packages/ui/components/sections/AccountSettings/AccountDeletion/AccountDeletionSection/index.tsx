import React from "react";
import { useTranslation } from "react-i18next";
import { useModalDisclouser } from "@UI";
import {
  AccountDeletionModal,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalButton,
  ModalExtendedWrapper,
  Button,
  Input,
  SectionHeader,
  useSuspendAccountMutation,
} from "@UI";
import { useDeleteMyAccountMutation } from "@features/Accounts/services/useDeleteMyAccount";
import { setTestid } from "utils";

export const AccountDeletionSection: React.FC = () => {
  const { t } = useTranslation();
  const { mutate, data } = useSuspendAccountMutation();
  const { mutate: deleteAccount } = useDeleteMyAccountMutation();

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader sectionTitle={t("Account Deletion")} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">
              {t("delete_account", "Delete Account")}
            </span>
            <span>{t("We do our best to give you a great experience")}</span>
          </div>
          <ModalExtendedWrapper modalKey="5">
            <ModalButton>
              <Button className="px-7" colorScheme="danger">
                {t("delete", "Delete")}
              </Button>
            </ModalButton>
            <AccountDeletionModal
              {...setTestid("delete-modal")}
              onSubmit={(data) => deleteAccount(data)}
            />
          </ModalExtendedWrapper>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">{t("Suspend")}</span>
            <span>{t("You can suspend your account.")}</span>
          </div>
          <Button
            data-testid="SuspendAccountBtn"
            onClick={() => mutate()}
            className="w-24"
            outline
            colorScheme="danger"
          >
            {t("Suspend")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export interface DeleteAccountConfirmationModalProps {}

export const DeleteAccountConfirmationModal: React.FC<
  DeleteAccountConfirmationModalProps
> = () => {
  const { handleClose, handleOpen, isOpen } = useModalDisclouser({});
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="w-[min(100%,25rem)]">
        <div className="flex flex-col gap-4">
          <span>{t("Type Your Password")}</span>
          <Input type={"password"} className="border-2" flushed />
          <ModalButton closeAll>
            <Button colorScheme="danger">{t("Delete")}</Button>
          </ModalButton>
        </div>
      </ModalContent>
    </Modal>
  );
};

export const DeleteAccountConfirmation: React.FC<{ onDelete: () => any }> = ({
  onDelete,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col text-xl gap-8 p-4">
      <span className="text-3xl text-primary-500">
        {t("Are you sure you want to delete this account?")}
      </span>
      <p className="text-gray-600">
        {t(
          "This action can't be undone. When you delete all your data, it will be erased from our system."
        )}
      </p>
      <div className="hstack">
        <Button onClick={() => onDelete && onDelete()}>{t("Delete")}</Button>
        <ModalButton key="5" close>
          <Button colorScheme="gray">{t("Cancel")}</Button>
        </ModalButton>
      </div>
    </div>
  );
};
