import {
  Button,
  CloseIcon,
  Modal,
  ModalContent,
  ModalOverlay,
  useCommentReportModal,
} from "@UI";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface CommentReportModalProps {}

const reportOptions = [
  {
    titleKey: "not_interested",
    fallbackTitle: "I'm not interested in this post",
  },
  {
    titleKey: "spam",
    fallbackTitle: "It's spam",
    subtitleKey: "spam_subtitle",
    fallbackSubtitle: "Misleading or repetitive posts",
  },
  {
    titleKey: "scam_or_fraud",
    fallbackTitle: "Scam or fraud",
    subtitleKey: "scam_subtitle",
    fallbackSubtitle: "Deceptive content intended to deceive people",
  },
  {
    titleKey: "hate_speech_or_symbols",
    fallbackTitle: "Hate speech or symbols",
    subtitleKey: "hate_speech_subtitle",
    fallbackSubtitle: "Racist, homophobic or sexist content",
    nestedOptions: [
      { titleKey: "hate_speech", fallbackTitle: "Hate speech or symbols" },
      { titleKey: "harassment", fallbackTitle: "Harassment or bullying" },
      { titleKey: "violent_orgs", fallbackTitle: "Violent organizations" },
    ],
  },
  {
    titleKey: "false_information",
    fallbackTitle: "False information",
    subtitleKey: "false_info_subtitle",
    fallbackSubtitle: "Health, climate, political or social",
    nestedOptions: [
      { titleKey: "health", fallbackTitle: "Health" },
      { titleKey: "politics", fallbackTitle: "Politics" },
      { titleKey: "social_issue", fallbackTitle: "Social issue" },
    ],
  },
];

export const CommentReportModal: React.FC<CommentReportModalProps> = () => {
  const { commentId, closeModal } = useCommentReportModal();
const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [previousSelections, setPreviousSelections] = useState<string[]>([]);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [selectedOptionsByLayer, setSelectedOptionsByLayer] = useState<any[]>(
    [],
  );

  useEffect(() => {
    if (!commentId) {
      setSelectedOption(null);
      setPreviousSelections([]);
      setSelectedOptionsByLayer([]);
      setCurrentLayer(1);
    }
  }, [commentId]);

  const handleOptionClick = (option: any) => {
    if (option.nestedOptions) {
      setPreviousSelections((prev:any) => [
        ...prev,
        t(option.titleKey, option.fallbackTitle),
      ]);
      setSelectedOptionsByLayer((prev) => [...prev, option]);
      setSelectedOption(option);
      setCurrentLayer(2);
    } else {
      setPreviousSelections((prev:any) => [
        ...prev,
        t(option.titleKey, option.fallbackTitle),
      ]);
      setSelectedOptionsByLayer((prev) => [...prev, null]);
      setSelectedOption(null);
      setCurrentLayer(3);
    }
  };

  const handleBack = () => {
    if (currentLayer === 2) {
      setSelectedOption(null);
      setCurrentLayer(1);
    } else if (currentLayer === 3) {
      if (
        selectedOptionsByLayer[selectedOptionsByLayer.length - 2]?.nestedOptions
      ) {
        setSelectedOption(
          selectedOptionsByLayer[selectedOptionsByLayer.length - 2],
        );
        setCurrentLayer(2);
      } else {
        setSelectedOption(null);
        setCurrentLayer(1);
      }
    }

    setPreviousSelections((prev) => prev.slice(0, -1));
    setSelectedOptionsByLayer((prev) => prev.slice(0, -1));
  };

  const reasonPath = previousSelections.join(" → ");

  const handleSubmitReason = () => {
    const selectedReasons = [...previousSelections];

    if (selectedOption) {
      selectedReasons.push(
        t(selectedOption.titleKey, selectedOption.fallbackTitle) as string,
      );
    }

    // console.log("Selected reasons:", selectedReasons);
  };

  return (
    <Modal isOpen={!!commentId} onClose={closeModal} z={999}>
      <ModalOverlay />
      <ModalContent className="w-[400px]">
        <div className="flex justify-between items-center py-2 px-4 relative">
          {currentLayer !== 1 && (
            <ChevronLeft
              className="absolute left-4 cursor-pointer text-lg"
              onClick={handleBack}
            />
          )}
          <div className="flex-1 flex justify-center">
            <p className="font-semibold text-lg">
              {currentLayer === 3 && reasonPath
                ? t("submit_report", "Submit report")
                : currentLayer === 1
                  ? t("report", "Report")
                  : t("select_a_reason", "Select a reason")}
            </p>
          </div>
          <CloseIcon
            className="absolute right-4 cursor-pointer text-lg"
            onClick={closeModal}
          />
        </div>

        {currentLayer === 1 && (
          <div className="flex flex-col gap-2 p-4">
            {/* First Layer: Reason Selection */}
            {reportOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 pr-0 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                <div>
                  <p className="font-medium">
                    {t(option.titleKey, option.fallbackTitle)}
                  </p>
                  {option.subtitleKey && (
                    <p className="text-sm text-gray-500">
                      {t(option.subtitleKey, option.fallbackSubtitle)}
                    </p>
                  )}
                </div>
                <ChevronRight className="text-lg text-gray-500" />
              </div>
            ))}
          </div>
        )}

        {currentLayer === 2 && selectedOption && (
          <div className="flex flex-col gap-2 p-4">
            {/* Second Layer: Sub-reason Selection */}
            {(selectedOption.nestedOptions || []).map((subOption, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 pr-0 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(subOption)}
              >
                <div>
                  <p className="font-medium">
                    {t(subOption.titleKey, subOption.fallbackTitle)as string}
                  </p>
                </div>
                <ChevronRight className="text-lg text-gray-500" />
              </div>
            ))}
          </div>
        )}

        {currentLayer === 3 && reasonPath && (
          <div className="flex flex-col gap-2 p-4">
            {/* Third Layer: Confirmation */}
            <p className="text-center font-medium">
              {t(
                "are_you_sure_report",
                "Are you sure you want to submit this report?",
              )}
            </p>
            <p className="text-sm text-gray-500 text-center">
              {t("selected_reason", "Selected reason:")} {reasonPath}
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <Button
                onClick={handleSubmitReason}
                className="w-full font-medium"
                colorScheme="danger"
              >
                {t("submit_report", "Submit report")}
              </Button>
              <Button
                className="w-full font-medium"
                colorScheme="white"
                onClick={closeModal}
              >
                {t("cancel", "Cancel")}
              </Button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
