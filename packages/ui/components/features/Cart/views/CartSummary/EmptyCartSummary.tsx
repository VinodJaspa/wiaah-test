
import React from "react";
import { colorPalette } from "ui/components/helpers/colorPalette";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { ShadCnButton, ShadcnFlex, ShadcnText } from "@UI/components/shadcn-components";

export const EmptyCartSummary: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <ShadcnFlex className="flex flex-col justify-between items-end h-full">
      <ShadcnText className="w-full">There are no items in this cart!</ShadcnText>
      <ShadCnButton
        className={`w-fit bg-[${colorPalette.PrimaryGreen}] hover:bg-[${colorPalette.PrimaryGreen}] text-[${colorPalette.whiteText}]`}
        onClick={() => router.push("/")}
      >
        {t("continue_shopping", "Continue Shopping")}
     </ShadCnButton>
    </ShadcnFlex>
    
  );
};
