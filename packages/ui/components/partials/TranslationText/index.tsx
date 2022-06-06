import { Text, TextProps } from "@chakra-ui/react";
import React, { HtmlHTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
import { useTranslation } from "react-i18next";
import { TranslationTextType } from "types";

export interface TranslationTextProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  translationObject: TranslationTextType | string;
}

export const TranslationText: React.FC<TranslationTextProps> = ({
  translationObject,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <span {...props} className={`${props.className}`}>
      {typeof translationObject === "object"
        ? t(translationObject.translationKey, translationObject.fallbackText)
        : translationObject}
    </span>
  );
};
