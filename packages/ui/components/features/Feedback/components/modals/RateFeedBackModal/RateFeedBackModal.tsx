import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalContent, ModalOverlay, Textarea, Button } from "@UI";
import { Rate } from "antd";

export interface RateFeedBackModalProps {
  variant: "product" | "service";
}

export const RateFeedBackModal: React.FC<RateFeedBackModalProps> = ({
  variant,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-8">
        <p className="font-bold text-xl">{t("Give feedback")}</p>
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold">{t("How did we do?")}</p>
          <Rate value={4} allowHalf />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p>{t("Care to share more about it?")}</p>
          <Textarea className="h-56" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button>{t("PUBLISH FEEDBACK")}</Button>
          <p>
            {t(
              `Your review will be posted to the ${
                variant === "product" ? "product" : "service"
              } reviews`
            )}
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};
