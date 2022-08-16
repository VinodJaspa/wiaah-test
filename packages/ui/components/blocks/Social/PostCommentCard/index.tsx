import { PostCommentType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import { PostAttachment, Verified, EllipsisText } from "ui";
import { useCommentReportModal, useDateDiff, useLoginPopup } from "ui";
import {
  HashTags,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Divider,
  Avatar,
  HStack,
} from "ui";

export interface PostCommentCardProps extends PostCommentType {
  onReply?: (message: string) => void;
  onLike?: () => void;
  main?: boolean;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  content,
  createdAt,
  likes,
  replies,
  attachment,
  user,
  hashTags,
  main,
  id,
}) => {
  const { openModalWithId } = useCommentReportModal();
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(createdAt),
    to: new Date(Date.now()),
  });
  const since = getSince();

  function handleMoreCommentOptions() {}
  const { OpenLoginPopup } = useLoginPopup();
  function handleOpenLogin() {
    OpenLoginPopup;
  }
  return (
    <div className="flex bg-white w-full gap-2">
      <Avatar src={user.thumbnail} name={user.name} />
      <div className="w-full flex flex-col">
        <div
          className={`w-full flex pb-2 px-2 flex-col rounded-xl ${
            main ? "bg-white" : "bg-primary-light"
          }`}
        >
          <div className="flex items-center gap-2 justify-between">
            <HStack>
              <p className="text-lg font-bold">{user.name}</p>
              {user.verified && <Verified className="text-primary" />}
            </HStack>
            <HStack>
              <Menu>
                <MenuButton>
                  {/* <Button
                    onClick={() => {
                      openModalWithId(id);
                    }}
                    size={"xs"}

                  >
                    {t("report", "Report")}
                  </Button> */}
                  <HiDotsHorizontal className="cursor-pointer text-2xl fill-primary" />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <p onClick={() => openModalWithId(id)}>
                      {t("report_user", "Report User")}
                    </p>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </div>
          <div className="py-2">
            <EllipsisText
              showMoreColor={main ? "white" : undefined}
              content={content}
              maxLines={4}
            />
          </div>

          {hashTags && (
            <HashTags
              style={{ mb: "0.5rem" }}
              color="primary.main"
              tags={hashTags}
            />
          )}
          {attachment && (
            <PostAttachment
              src={attachment.src}
              type={attachment.type}
              alt={user.name}
            />
          )}
        </div>
        <div className="flex px-2 w-full items-center justify-between">
          {/* like,reply, and replies count */}
          {!main && (
            <HStack>
              <p onClick={handleOpenLogin} className="text-primary">
                {t("Like")}
              </p>
              <p onClick={handleOpenLogin}>{t("Reply")}</p>
              <div className="flex whitespace-nowrap gap-1 h-full items-end">
                <MdOutlineReply className="text-lg fill-primary" />
                <p className="text-gray-500">
                  {replies} {t("Replies")}
                </p>
              </div>
            </HStack>
          )}
          <HStack className="whitespace-nowrap text-xs text-gray-500">
            {!main && (
              <>
                <p>{likes}</p>
                <p>{t("Likes")}</p>
              </>
            )}
            <p>
              {!main && "|"} {since.value} {since.timeUnit} {t("ago", "ago")}
            </p>
          </HStack>
        </div>
      </div>
    </div>
  );
};
