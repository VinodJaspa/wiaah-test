import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import {
  Attachment,
  Comment,
  CommentsCursorPaginationResponse,
  ContentHostType,
  Maybe,
  Profile,
} from "../../../features/API";
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
} from "ui";
import { FaRegHeart } from "react-icons/fa6";
import { BsFillReplyFill } from "react-icons/bs";

export interface PostCommentCardProps {
  onReply?: (message: string) => void;
  onLike?: () => void;
  main?: boolean;
  comment: { __typename?: "Comment" } & Pick<
    Comment,
    | "id"
    | "content"
    | "commentedAt"
    | "likes"
    | "userId"
    | "hostId"
    | "hostType"
    | "updatedAt"
    | "replies"
  > & {
    attachment?: { __typename?: "Attachment" } & Pick<
      Attachment,
      "src" | "type"
    >;
    author?: { __typename?: "Profile" } & Pick<
      Profile,
      "username" | "photo" | "verified" | "id"
    >;
  };
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  comment,
  main,
}) => {
  const { openModalWithId } = useCommentReportModal();
  const { t } = useTranslation();
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
        contentId: comment.id,
        contentType: ContentHostType.Comment,
      },
    });
  }

  const profile = comment.author;

  const TimeDiff = (createdAt: string) => {
    const { timeUnit, value } = useDateDiff({
      from: new Date(),
      to: new Date(createdAt),
    }).getSince();
    return `${value} ${timeUnit} `;
  };

  return (
    <div ref={ref} className="flex bg-white w-full gap-2 px-3">
      <img
        src={profile?.photo}
        alt="avatar"
        className="w-11 h-11 rounded-full"
      />
      <div className="w-full flex flex-col">
        <div
          className={`w-full flex pb-2 px-2 flex-col rounded-xl ${main ? "bg-white" : "bg-primary-light"
            }`}
        >
          <div className="flex items-center mt-2 gap-2 justify-between">
            <HStack>
              <div className="flex items-center gap-1  ">
                <p className="text-xl font-semibold">{profile?.username}</p>
                {profile?.verified && (
                  <Verified className="text-[#0084FF] w-5 h-5" />
                )}
              </div>
              <p className="text-[#8E8E8E] text-xs">
                {TimeDiff(comment.commentedAt)} ago
              </p>
            </HStack>
          </div>
          <div className="py-2">
            <EllipsisText
              showMoreColor={main ? "white" : undefined}
              content={comment.content}
              maxLines={3}
            />
          </div>

          {comment.attachment && (
            <div className="w-1/2">
              <PostAttachment
                src={comment.attachment.src}
                type={comment.attachment.type}
                alt={profile?.username}
              />
            </div>
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
                  {comment.content} {t("Replies")}
                </p>
              </div>
            </HStack>
          )}
          <div className="whitespace-nowrap font-[15px] flex  text-gray-500 justify-between w-full  ">
            <div className="flex gap-4 items-center">
              <button className="text-sm font-extrabold text-[#20ECA7]">
                Likes
              </button>
              <button className="text-sm font-extrabold text-[#999999]">
                Reply
              </button>
            </div>

            <div className="flex gap-6 items-center text-[#8E8E8E] font-semibold">
              <div className="flex gap-2 items-center">
                <FaRegHeart className="w-4 h-4" />
                <div className="flex gap-1 items-center">
                  <p>{comment.likes}</p>
                  <p>{t("Likes")}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <BsFillReplyFill className="w-5 h-5" />
                <div className="flex gap-1 items-center">
                  <p>{comment.replies}</p>
                  <p>{t("Replies")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {reply ? (
          <CommentInput
            onCommentSubmit={(v) => {
              createComment({
                authorProfileId: comment.author!.id,
                authorUserId: comment.author!.id,
                content: v,
                contentId: comment.id,
                contentType: ContentHostType.Comment,
                mentions: [],
              });
            }}
          />
        ) : null}
      </div>
      <div className="h-full">
        <Menu>
          <MenuButton>
            <HiDotsHorizontal className="cursor-pointer text-2xl fill-black" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <p onClick={() => openModalWithId(profile?.id || "")}>
                {t("report_user", "Report User")}
              </p>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
