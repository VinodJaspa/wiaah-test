import React from "react";
import { Avatar, EllipsisText, HashTags, Button } from "@UI";
import { useTranslation } from "react-i18next";
import { HiLocationMarker } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HtmlDivProps } from "types";

export interface ActionHeaderProps extends HtmlDivProps {
  userName: string;
  subName?: string;
  userThumbnail: string;
  actionTitle?: string;
  actionHashtags: string[];
  actionLocation?: string;
  onLocationClick?: (location: string) => any;
  onProfileClick?: (name: string) => any;
  onTitleClick?: (title: string) => any;
}

export const ActionHeader: React.FC<ActionHeaderProps> = ({
  actionHashtags,
  actionTitle,
  userName,
  userThumbnail,
  actionLocation,
  subName,
  onLocationClick,
  onTitleClick,
  onProfileClick,
  className,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${className || ""} w-full flex gap-1 flex-col`} {...props}>
      <div className="w-full flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            onClick={() => onProfileClick && onProfileClick(userName)}
            name={userName}
            photoSrc={userThumbnail}
          />
          <div className="flex flex-col">
            <span>{userName}</span>

            {subName && (
              <span
                className="cursor-pointer"
                onClick={() => onTitleClick && onTitleClick(subName)}
              >
                {subName}
              </span>
            )}
          </div>
        </div>
        <Button className="capitalize">{t("follow", "follow")}</Button>
      </div>
      {actionTitle && <EllipsisText maxLines={2} content={actionTitle} />}
      <HashTags tags={actionHashtags || []} />
      <div className="text-2xl flex items-center gap-2">
        {actionLocation && (
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => onLocationClick && onLocationClick(actionLocation)}
          >
            <HiLocationMarker />
            <span className="text-lg">{actionLocation}</span>
          </div>
        )}
        {userName && (
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => onProfileClick && onProfileClick(userName)}
          >
            <HiUser />
            <span className="text-lg">{userName}</span>
          </div>
        )}
      </div>
    </div>
  );
};
