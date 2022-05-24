import React from "react";
import { useTranslation } from "react-i18next";
import { StepperStepType } from "types";
import {
  SectionHeader,
  SectionContainer,
  Button,
  ModalExtendedWrapper,
  ModalButton,
  Stepper,
  StepperContent,
  StepperNextButton,
  StepperPreviousButton,
} from "ui";
import {
  Checkbox,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Textarea,
} from "../../../../partials";

export const AccountDeletionSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SectionContainer
      header={
        <SectionHeader
          sectionTitle={t("account_deletion", "Account Deletion")}
        />
      }
    >
      <div className="flex flex-col gap-4">
        <div className="hstack justify-between">
          <span className="font-semibold text-lg">
            {t("delete_account", "Delete Account")}
          </span>
          <ModalExtendedWrapper modalKey="5">
            <ModalButton>
              <Button colorScheme="danger">{t("delete", "Delete")}</Button>
            </ModalButton>
            <AccountDeletionModal />
          </ModalExtendedWrapper>
        </div>
        <div className="hstack justify-between">
          <span className="font-semibold text-lg">
            {t("suspend", "Suspend")}
          </span>
          <Button outline colorScheme="danger">
            {t("suspend", "Suspend")}
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export const AccountDeletionModal: React.FC = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function handleCancel() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} onOpen={handleOpen}>
      <ModalOverlay />
      <ModalContent className="w-[min(100%,25rem)]">
        <Stepper stepsLength={4}>
          {({ nextStep, currentStepIdx }) => {
            return (
              <div className="flex flex-col gap-8">
                {currentStepIdx !== 0 && (
                  <span className="font-bold text-4xl ">
                    {t("delete_profile", "Delete Profile")}
                  </span>
                )}
                <StepperContent>
                  <DeleteAccountConfirmation onDelete={nextStep} />
                  <div className="flex flex-col gap-4">
                    <div className="hstack">
                      <input type={"radio"} />
                      <span>
                        {t("something_was_broken", "Something was broken")}
                      </span>
                    </div>
                    <div className="hstack">
                      <input type={"radio"} />
                      <span>
                        {t(
                          "i'm_not_getting_any_invites",
                          "I'm not getting any invites"
                        )}
                      </span>
                    </div>
                    <div className="hstack">
                      <input type={"radio"} />
                      <span>
                        {t(
                          "i_have_privacy_concern",
                          "I have a privacy concern"
                        )}
                      </span>
                    </div>
                    <div className="hstack">
                      <input type={"radio"} />
                      <span>{t("other", "Other")}</span>
                    </div>
                  </div>
                  <div className="flex text-lg flex-col gap-16">
                    <p>
                      {t(
                        "share_what_was_working",
                        "Can you please share to  us what was not working? We are fixing bugs as soon as we spot them. if something slipped though our fingers, we'd be so grateful to be aware of it and fix it"
                      )}
                    </p>
                    <Textarea
                      className="min-h-[8rem]"
                      placeholder={
                        t(
                          "your_explanation_is_entirely_optional",
                          "Your explanation is entirely optional"
                        ) + "..."
                      }
                    />
                    <StepperNextButton>
                      <Button className="uppercase">
                        {t("continue", "continue")}
                      </Button>
                    </StepperNextButton>
                  </div>
                  <div className="flex flex-col gap-8">
                    <p>
                      {t(
                        "request_your_account_data_advise",
                        "It's advisable for you to request your data to be sent to your email."
                      )}
                    </p>
                    <div className="hstack">
                      <Checkbox />
                      <span>
                        {t("yes", "Yes")},{" "}
                        {t(
                          "send_my_data_to_my_email",
                          "send my data to my email"
                        )}
                      </span>
                    </div>
                    <Divider className="my-2" />
                    <StepperNextButton>
                      <Button className="uppercase">
                        {t("confirm_deletion", "Confirm Deletion")}
                      </Button>
                    </StepperNextButton>
                    <p className="text-gray-600">
                      {t(
                        "account_deletion_no_turning_back_warning",
                        "You will permanently lose all your reviews, conttacts, messages, and profile info. after this. there is no turning back."
                      )}
                    </p>
                  </div>
                </StepperContent>
              </div>
            );
          }}
        </Stepper>
      </ModalContent>
    </Modal>
  );
};

export interface DeleteAccountConfirmationModalProps {}

export const DeleteAccountConfirmationModal: React.FC<DeleteAccountConfirmationModalProps> =
  () => {
    const { handleClose, handleOpen, isOpen } = useModalDisclouser({});
    return (
      <Modal isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>testcomwdawd</ModalContent>
      </Modal>
    );
  };

interface useModalDisclouserProps {
  onClose?: () => any;
  onOpen?: () => any;
}

interface useModalDisclouserReturn {
  isOpen: boolean;
  handleOpen: () => any;
  handleClose: () => any;
}

const useModalDisclouser = (
  props: useModalDisclouserProps
): useModalDisclouserReturn => {
  const { onClose, onOpen } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function handleClose() {
    setIsOpen(false);
    onClose && onClose();
  }

  function handleOpen() {
    setIsOpen(true);
    onOpen && onOpen();
  }

  return {
    isOpen,
    handleClose,
    handleOpen,
  };
};

export const DeleteAccountConfirmation: React.FC<{ onDelete: () => any }> = ({
  onDelete,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col text-xl gap-8 p-4">
      <span className="text-3xl text-primary-500">
        {t(
          "account_deletion_confimation_msg",
          "Are you sure you want to delete this account?"
        )}
      </span>
      <p className="text-gray-600">
        {t(
          "account_deletion_warning",
          "This action can't be undone. When you delete all your data, it will be erased from our system."
        )}
      </p>
      <div className="hstack">
        <Button onClick={() => onDelete && onDelete()}>
          {t("delete", "Delete")}
        </Button>
        <ModalButton key="5" close>
          <Button colorScheme="gray">{t("cancel", "Cancel")}</Button>
        </ModalButton>
      </div>
    </div>
  );
};
