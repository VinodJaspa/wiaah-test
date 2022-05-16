import { Switch } from "@chakra-ui/react";
import React, { HtmlHTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
import { useTranslation } from "react-i18next";

export interface PushSwitch
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const PushSwitch: React.FC = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <Switch {...props} />
      <p>{t("push", "Push")}</p>
    </div>
  );
};
