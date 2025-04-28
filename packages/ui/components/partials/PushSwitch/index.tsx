
import { ShadcnSwitch } from "@UI/components/shadcn-components";
import React, { HtmlHTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
import { useTranslation } from "react-i18next";

export interface PushSwitch
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const PushSwitch: React.FC = ({ ...props }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      {/* @ts-ignore */}
      <ShadcnSwitch {...props} />
      <p>{t("push", "Push")}</p>
    </div>
  );
};
