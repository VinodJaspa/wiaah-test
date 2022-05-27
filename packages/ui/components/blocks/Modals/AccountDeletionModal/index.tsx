import React from "react";
import { useTranslation } from "react-i18next";
import {
  Stepper,
  StepperContent,
  StepperNextButton,
  ModalExtendedWrapper,
  ModalButton,
  DeleteAccountConfirmation,
  DeleteAccountConfirmationModal,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  Textarea,
  Checkbox,
  Divider,
} from "ui";

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
      <ModalContent className="w-[min(100%,40rem)]">
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
                    <StepperNextButton>
                      <Button>{t("next", "Next")}</Button>
                    </StepperNextButton>
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
                    <ModalExtendedWrapper modalKey="2">
                      <ModalButton>
                        <Button className="uppercase">
                          {t("confirm_deletion", "Confirm Deletion")}
                        </Button>
                      </ModalButton>
                      <DeleteAccountConfirmationModal />
                    </ModalExtendedWrapper>
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
