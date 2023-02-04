import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import { Comment, ContentHostType } from "@features/API";
import {
  PostAttachment,
  Verified,
  EllipsisText,
  useLikeContent,
  useCommentReportModal,
  useDateDiff,
  CommentInput,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Avatar,
  HStack,
  useCommentOnContent,
  useOutsideClick,
} from "@UI";

export interface PostCommentCardProps {
  onReply?: (message: string) => void;
  onLike?: () => void;
  main?: boolean;
  comment: Comment;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  comment,
  main,
}) => {
  const { openModalWithId } = useCommentReportModal();
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(comment.createdAt),
    to: new Date(Date.now()),
  });
  const since = getSince();
  const { mutate } = useLikeContent();
  const { mutate: createComment } = useCommentOnContent();

  const [reply, setReply] = React.useState<boolean>(false);

  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setReply(false);
  });

  function handleLikeComment() {
    mutate({
      args: {
        authorProfileId: comment?.author?.id || "",
        contentId: comment.id,
        contentType: ContentHostType.Comment,
      },
    });
  }

  const profile = comment.author;

  return (
    <div ref={ref} className="flex bg-white w-full gap-2">
      <Avatar src={profile?.photo} name={profile?.username} />
      <div className="w-full flex flex-col">
        <div
          className={`w-full flex pb-2 px-2 flex-col rounded-xl ${
            main ? "bg-white" : "bg-primary-light"
          }`}
        >
          <div className="flex items-center gap-2 justify-between">
            <HStack>
              <p className="text-lg font-bold">{profile?.username}</p>
              {profile?.verified && <Verified className="text-primary" />}
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
                    <p onClick={() => openModalWithId(profile?.id || "")}>
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
              content={comment.content}
              maxLines={4}
            />
          </div>

          {comment.attachment && (
            <PostAttachment
              src={comment.attachment.src}
              type={comment.attachment.type}
              alt={profile?.username}
            />
          )}
        </div>
        <div className="flex px-2 w-full items-center justify-between">
          {/* like,reply, and replies count */}
          {!main && (
            <HStack>
              <p onClick={handleLikeComment} className="text-primary">
                {t("Like")}
              </p>
              <p onClick={() => setReply(true)}>{t("Reply")}</p>
              <div className="flex whitespace-nowrap gap-1 h-full items-end">
                <MdOutlineReply className="text-lg fill-primary" />
                <p className="text-gray-500">
                  {comment.replies} {t("Replies")}
                </p>
              </div>
            </HStack>
          )}
          <HStack className="whitespace-nowrap text-xs text-gray-500">
            {!main && (
              <>
                <p>{comment.likes}</p>
                <p>{t("Likes")}</p>
              </>
            )}
            <p>
              {!main && "|"} {since.value} {since.timeUnit} {t("ago", "ago")}
            </p>
          </HStack>
        </div>
        {reply ? (
          <CommentInput
            onCommentSubmit={(v) => {
              createComment({
                authorProfileId: comment.authorProfileId,
                authorUserId: comment.userId,
                content: v,
                contentId: comment.id,
                contentType: ContentHostType.Comment,
                mentions: [],
              });
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
