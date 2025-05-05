
import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, ShadCnButton, ShadcnFlex, ShadcnText } from "ui";
import { SubscribersUserInfo } from "types";

export interface SubscriberCardProps extends SubscribersUserInfo {
  onFollow?: () => any;
  onProfileClick?: (profileUrl: string) => any;
  children?: React.ReactNode;
}

export const SubscriberCard: React.FC<SubscriberCardProps> = ({
  avatar,
  name,
  profileUrl,
  children,
  onFollow,
  onProfileClick,
}) => {
const { t } = useTranslation();
  return (
    <ShadcnFlex justify="between" align="center" gap={4} className="p-6 bg-gray-200">


      <ShadcnFlex
        data-testid="UserInfo"
        onClick={() => onProfileClick && onProfileClick(profileUrl)}
        gap={2} // Equivalent to "0.5rem" (Tailwind `gap-2`)
      >
        <Avatar data-testid="UserPhoto" name={name} photoSrc={avatar} />
        <ShadcnText data-testid="Username" className="text-lg font-semibold">
          {name}
        </ShadcnText>
      </ShadcnFlex>
      <ShadCnButton
        data-testid="FollowBtn"
        className="w-full md:w-fit rounded-full bg-primary text-white hover:bg-primary/80 focus:ring-0 transition-colors duration-200"
        onClick={() => onFollow && onFollow()}
      >
        {t("follow", "Follow")}
      </ShadCnButton>

    </ShadcnFlex>
  );
};
