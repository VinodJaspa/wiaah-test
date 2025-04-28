import React from "react";
import { useTranslation } from "react-i18next";
import { Badge, RoundedPlusIcon } from "@UI";

export interface AddBadgeButtonProps {
  onClick: () => any;
  children?: React.ReactNode;
}

export const AddBadgeButton: React.FC<AddBadgeButtonProps> = ({
  onClick,
  children,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <Badge
      variant="success"
      onClick={() => onClick && onClick()}
      className="flex gap-2 items-center text-primary cursor-pointer"
    >
      <RoundedPlusIcon className="border-primary" />
      {/* @ts-ignore */}
      <div>{children}</div>
    </Badge>
  );
};
