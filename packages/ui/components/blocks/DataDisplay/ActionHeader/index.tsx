import React from "react";
import { Avatar, EllipsisText, HashTags, Button, ShadcnIcon } from "@UI";
import { useTranslation } from "react-i18next";
import { HiLocationMarker } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HtmlDivProps } from "types";

import { MdPlace } from "react-icons/md";

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
          <div className="flex gap-0.5 ">
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
        <button className="bg-[#3CD399] text-white px-4 py-1 font-semibold rounded-full">
          {t("follow", "follow")}
        </button>
      </div>
      {actionTitle && <EllipsisText maxLines={2} content={actionTitle} />}
      <HashTags tags={actionHashtags || []} />
      <div className="text-2xl flex items-center py-1 mt-1 justify-between bg-opacity-10 bg-black">
        {actionLocation && (
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => onLocationClick && onLocationClick(actionLocation)}
          >
        <ShadcnIcon as={MdPlace} className="text-base" />

            <span className="text-lg">{actionLocation}</span>
          </div>
        )}
        {userName && (
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => onProfileClick && onProfileClick(userName)}
          >
            <HiUser />
            <span className="text-lg">watch</span>
          </div>
        )}
      </div>
    </div>
  );
};
