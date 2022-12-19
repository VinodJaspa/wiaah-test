import {
  useCommentReportModal,
  Modal,
  ModalContent,
  ModalOverlay,
  Radio,
  ModalHeader,
  ModalCloseButton,
  CloseIcon,
  Button,
  Textarea,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { TranslationTextType } from "types";

export interface CommentReportModalProps {}

const reportReasons: {
  reason: TranslationTextType;
  reasonId: string;
}[] = [
  {
    reason: {
      translationKey: "fake_account",
      fallbackText: "Fake account",
    },
    reasonId: "1",
  },
  {
    reason: {
      translationKey: "explicit_content",
      fallbackText: "Sexually, pornography explicit content",
    },
    reasonId: "2",
  },
  {
    reason: {
      translationKey: "spam_or_scam",
      fallbackText: "Spam or scam",
    },
    reasonId: "3",
  },
  {
    reason: {
      translationKey: "violence",
      fallbackText: "Violence and Harful behavior",
    },
    reasonId: "4",
  },
  {
    reason: {
      translationKey: "hate_speech_or_personal_attack",
      fallbackText: "Hate speech or personal attack",
    },
    reasonId: "5",
  },
  {
    reason: {
      translationKey: "other",
      fallbackText: "other",
    },
    reasonId: "6",
  },
];

export const CommentReportModal: React.FC<CommentReportModalProps> = () => {
  const [reasonsValue, setReasonsValue] = React.useState<string>();
  const { commentId, closeModal } = useCommentReportModal();

  const { t } = useTranslation();
  return (
    <Modal isOpen={!!commentId} onOpen={() => {}} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader title="">
          <p>{t("report_user", "Report User")}</p>
          <ModalCloseButton>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <div className="flex w-full gap-4 flex-col">
          <Textarea
            className="w-full resize-y h-60 border-b-gray-500 border-b-[1px]"
            placeholder={t("enter_reason", "Enter Reason")}
          />
          <div className="flex flex-col">
            <p>
              {t(
                "i_want_to_report",
                "I want to report this link because i think its a"
              )}
              :
            </p>
            {/* <RadioGroup onChange={setReasonsValue} value={reasonsValue}> */}
            <div className="flex flex-col gap-4">
              {reportReasons.map(({ reason, reasonId }, i) => (
                <Radio
                  value={reasonId}
                  name="reason"
                  onChange={() => setReasonsValue(reasonId)}
                  key={i}
                >
                  {typeof reason === "object" &&
                    t(reason.translationKey, reason.fallbackText)}
                </Radio>
              ))}
            </div>
            {/* </RadioGroup> */}
          </div>
        </div>
        <div className="flex items-center">
          <Button onClick={closeModal} className="bg-gray-500">
            {t("close", "Close")}
          </Button>
          <Button>{t("report_user", "Report User")}</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
