
import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import { CommentData } from "types";
import {
  useDateDiff,
  useLoginPopup,
  EllipsisText,
  Verified,
  HashTags,
  PostAttachment,
} from "@UI";

export interface CommentAltProps extends CommentData {
  main?: boolean;
}

export const CommentAlt: React.FC<CommentAltProps> = ({
  content,
  createdAt,
  hashTags,
  user,
  description,
  main,
}) => {
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(createdAt),
    to: new Date(Date.now()),
  });
  const since = getSince();

  function handleMoreCommentOptions() { }

  return (
    <div className="flex w-full gap-4">
    <div className="w-12 h-12 rounded-full bg-black overflow-hidden flex-shrink-0">
      <img src={user.thumbnail} alt={user.name} className="w-full h-full object-cover" />
    </div>
  
    <div className="w-full flex flex-col">
      <div className={`w-full p-2 pb-2 rounded-xl ${main ? "bg-white" : "bg-primary-light"} flex flex-col`}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">{user.name}</p>
            {user.verifed && <Verified className="w-5 h-5 text-primary-main" />}
          </div>
          <HiDotsHorizontal
            onClick={handleMoreCommentOptions}
            className="cursor-pointer text-primary-main text-xl"
          />
        </div>
  
        <div className="py-2">
          <EllipsisText showMoreColor={main ? "white" : undefined} content={content} maxLines={4} />
        </div>
  
        {hashTags && (
          <HashTags props={{ className: "mb-2 text-primary-main" }} tags={hashTags} />
        )}
      </div>
  
      <p>{since.value} {since.timeUnit} {t("ago", "ago")}</p>
    </div>
  </div>
  
  );
};
