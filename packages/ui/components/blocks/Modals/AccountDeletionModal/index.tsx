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
  StepperFormController,
  Radio,
  StepperFormHandler,
} from "@UI";
import * as yup from "yup";

export const AccountDeletionModal: React.FC<{
  onSubmit: (data: any) => any;
}> = ({ onSubmit }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

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
        <StepperFormController
          stepsNum={3}
          onFormComplete={(data) => onSubmit(data)}
        >
          {({ currentStepIdx, goToStep, nextStep }) => (
            <Stepper controls={{ onChange: goToStep, value: currentStepIdx }}>
              return (
              <div className="flex flex-col gap-8">
                {currentStepIdx !== 0 && (
                  <span className="font-bold text-4xl ">
                    {t("delete_profile", "Delete Profile")}
                  </span>
                )}
                <StepperContent>
                  <DeleteAccountConfirmation onDelete={nextStep} />
                  <StepperFormHandler
                    handlerKey="reason"
                    validationSchema={yup.object({
                      reason: yup.string().required(),
                    })}
                  >
                    {({ validate }) => (
                      <div className="flex flex-col gap-4">
                        {[
                          "Something was broken",
                          "I'm not getting any invites",
                          "I have a privacy concern",
                          "Other",
                        ].map((v, i) => (
                          <div key={i} className="hstack">
                            <Radio
                              name="reason"
                              onChange={(e) => {
                                e.target.checked
                                  ? validate({ reason: v })
                                  : null;
                              }}
                            />
                            <span>{t(v)}</span>
                          </div>
                        ))}
                        <StepperNextButton>
                          <Button>{t("Next")}</Button>
                        </StepperNextButton>
                      </div>
                    )}
                  </StepperFormHandler>
                  <StepperFormHandler
                    validationSchema={yup.object({
                      otherReason: yup.string(),
                    })}
                    handlerKey="otherReason"
                  >
                    {({ validate }) => (
                      <div className="flex text-lg flex-col gap-16">
                        <p>
                          {t(
                            "Can you please share to  us what was not working? We are fixing bugs as soon as we spot them. if something slipped though our fingers, we'd be so grateful to be aware of it and fix it"
                          )}
                        </p>
                        <Textarea
                          className="min-h-[8rem]"
                          onChange={(v) =>
                            validate({
                              otherReason: v,
                            })
                          }
                          placeholder={
                            t("Your explanation is entirely optional") + "..."
                          }
                        />
                        <StepperNextButton>
                          <Button className="uppercase">
                            {t("continue", "continue")}
                          </Button>
                        </StepperNextButton>
                      </div>
                    )}
                  </StepperFormHandler>
                  <StepperFormHandler
                    validationSchema={yup.object({
                      sendData: yup.boolean().default(false),
                    })}
                    handlerKey="send_data"
                  >
                    {({ validate }) => (
                      <div className="flex flex-col gap-8">
                        <p>
                          {t(
                            "It's advisable for you to request your data to be sent to your email."
                          )}
                        </p>
                        <div className="hstack">
                          <Checkbox
                            onChange={(v) =>
                              validate({
                                sendData: v.target.checked,
                              })
                            }
                          />
                          <span>
                            {t("Yes")}, {t("send my data to my email")}
                          </span>
                        </div>
                        <Divider className="my-2" />
                        <ModalExtendedWrapper modalKey="2">
                          <ModalButton>
                            <Button className="uppercase">
                              {t("Confirm Deletion")}
                            </Button>
                          </ModalButton>
                          <DeleteAccountConfirmationModal />
                        </ModalExtendedWrapper>
                        <p className="text-gray-600">
                          {t(
                            "You will permanently lose all your reviews, conttacts, messages, and profile info. after this. there is no turning back."
                          )}
                        </p>
                      </div>
                    )}
                  </StepperFormHandler>
                </StepperContent>
              </div>
              );
            </Stepper>
          )}
        </StepperFormController>
      </ModalContent>
    </Modal>
  );
};
