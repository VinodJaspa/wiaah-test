import { Text, TextProps } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { TranslationTextType } from "types";

export interface TranslationTextProps extends TextProps {
  translationObject: TranslationTextType;
}

export const TranslationText: React.FC<TranslationTextProps> = ({
  translationObject: { fallbackText, translationKey },
  ...props
}) => {
  const { t } = useTranslation();
  return <Text {...props}>{t(translationKey, fallbackText)}</Text>;
};
