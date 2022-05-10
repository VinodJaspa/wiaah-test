import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useCommentReportModal } from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { TranslationText } from "types";

export interface CommentReportModalProps {}

const reportReasons: {
  reason: TranslationText;
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
    <Modal
      autoFocus={false}
      isCentered
      isOpen={!!commentId}
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{t("report_user", "Report User")}</Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Flex w="100%" gap="1rem" direction={"column"}>
            <Textarea
              w="100%"
              resize={"vertical"}
              h="15rem"
              borderBottomWidth={"1px"}
              borderBottomColor="gray"
              placeholder={t("enter_reason", "Enter Reason")}
            />
            <Flex direction={"column"}>
              <Text>
                {t(
                  "i_want_to_report",
                  "I want to report this link because i think its a"
                )}
                :
              </Text>
              <RadioGroup onChange={setReasonsValue} value={reasonsValue}>
                <Flex gap="1rem" direction={"column"}>
                  {reportReasons.map(
                    (
                      { reason: { translationKey, fallbackText }, reasonId },
                      i
                    ) => (
                      <Radio value={reasonId} key={i}>
                        {t(translationKey, fallbackText)}
                      </Radio>
                    )
                  )}
                </Flex>
              </RadioGroup>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter gap="0.5rem">
          <Button
            onClick={closeModal}
            colorScheme={"blackAlpha"}
            bgColor="gray"
          >
            {t("close", "Close")}
          </Button>
          <Button>{t("report_user", "Report User")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
