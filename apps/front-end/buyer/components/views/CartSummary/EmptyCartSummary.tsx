
import React from "react";
import { colorPalette } from "ui/components/helpers/colorPalette";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { ShadCnButton, ShadcnFlex, ShadcnText } from "@UI";

export const EmptyCartSummary: React.FC = () => {
  const router = useRouter();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <ShadcnFlex
      className="flex flex-col justify-between items-end h-full"
    >
      <ShadcnText className="w-full">
        There are no items in this cart!
      </ShadcnText>
      <ShadCnButton
        className={`w-fit bg-[${colorPalette.PrimaryGreen}] hover:bg-[${colorPalette.PrimaryGreen}] text-[${colorPalette.whiteText}]`}
        onClick={() => router.push("/")}>
        {t("continue_shopping", "Continue Shopping")}
      </ShadCnButton>
    </ShadcnFlex>

  );
};
