import React from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeftAlt1Icon,
  HStack,
  useModalDisclouser,
  useResponsive,
  useSocialControls,
} from "@UI";
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
import { useRouting } from "@UI/../routing";

export const AccountDeletionSection: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { isMobile } = useResponsive();
  const { back } = useRouting();
  const { mutate, data } = useSuspendAccountMutation();
  const { mutate: deleteAccount } = useDeleteMyAccountMutation();
  const { showAccountDeletionConfirmation, showAccountSuspendConfirmation } =
    useSocialControls();

  return isMobile ? (
    <div className="flex flex-col gap-10 p-2">
      <HStack className="justify-center relative">
        <button
          onClick={() => back()}
          className="absolute left-1 top-1/2 -translate-y-1/2"
        >
          <ArrowLeftAlt1Icon />
        </button>
        <p className="text-lg font-semibold">{t("Account Deletion")}</p>
      </HStack>

      <div className="flex flex-col gap-4">
        <HStack className="p-4 justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-lg">{t("Delete Account")}</p>
            <p className="text-sm">
              {t("We do our best to give you a great experience")}
            </p>
          </div>
          <Button
            onClick={() => showAccountDeletionConfirmation()}
            className="min-w-[7rem]"
            colorScheme="danger"
          >
            {t("Delete")}
          </Button>
        </HStack>
        <HStack className="p-4 justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">{t("Suspend Account")}</p>
            <p className="text-sm">{t("You can suspend your account")}</p>
          </div>
          <Button
            onClick={() => showAccountSuspendConfirmation()}
            className="min-w-[7rem]"
            outline
            colorScheme="danger"
          >
            {t("Suspend")}
          </Button>
        </HStack>
      </div>
    </div>
  ) : (
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
          <Button
            onClick={() => showAccountDeletionConfirmation()}
            className="px-7"
            colorScheme="danger"
          >
            {t("delete", "Delete")}
          </Button>
          <AccountDeletionModal
            {...setTestid("delete-modal")}
            onSubmit={(data) => deleteAccount(data)}
          />
        </div>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">{t("Suspend")}</span>
            <span>{t("You can suspend your account.")}</span>
          </div>
          <Button
            data-testid="SuspendAccountBtn"
            onClick={() => showAccountSuspendConfirmation()}
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
  const {
    value,
    showAccountDeletionConfirmation,
    hideAccountDeletionConfirmation,
  } = useSocialControls("showAccountDeletionConfirmation");
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <Modal
      isOpen={!!value}
      onOpen={showAccountDeletionConfirmation}
      onClose={hideAccountDeletionConfirmation}
    >
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
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
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
