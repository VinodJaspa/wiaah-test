import { Flex, Text, Button } from "@chakra-ui/react";
import React from "react";
import { colorPalette } from "ui/components/helpers/colorPalette";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const EmptyCartSummary: React.FC = () => {
  const { t } = useTranslation(); // Destructure the translate function (t)
  const router = useRouter();
  return (
    <div className="flex flex-col items-end h-full justyf-between ">
      <text className="w-full">There are no items in this cart!</text>
      <button
        className={` w-fit bg-[${colorPalette.PrimaryGreen}] hover:bg-[${colorPalette.PrimaryGreen}] text-[${colorPalette.whiteText}`}
        onClick={() => router.push("/")}
      >
        {t("continue_shopping, Continue Shopping")}
      </button>
    </div>
  );
};

export default EmptyCartSummary;
