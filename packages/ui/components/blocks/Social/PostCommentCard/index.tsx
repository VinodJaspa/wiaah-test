import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineReply } from "react-icons/md";
import { useRouting } from "routing";
import {
  Button,
  CommentInput,
  EllipsisText,
  HeartFillIcon,
  HeartOutlineIcon,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PostAttachment,
  SaveFlagFIllIcon,
  SaveFlagOutlineIcon,
  ShareIcon,
  useCommentOnContent,
  useCommentReportModal,
  useDateDiff,
  useOutsideClick,
  useSocialControls,
  Verified,
} from "ui";
import { NumberShortner } from "utils";
import {
  Attachment,
  Comment,
  ContentHostType,
  Profile,
} from "../../../features/API";

export interface PostCommentCardProps {
  onReply?: (message: string) => void;
  onLike?: () => void;
  main?: boolean;
  index?: number;
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
  shouldCommentBoxFocused?: boolean;
  setShouldCommentBoxFocused?: (shouldCommentBoxFocused: boolean) => void;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  comment,
  main,
  index,
  setShouldCommentBoxFocused,
}) => {
  const { openModalWithId } = useCommentReportModal();
  const { t } = useTranslation();
  // const { mutate } = useLikeContent();
  const { mutate: createComment } = useCommentOnContent();
  const { shareLink, showContentComments } = useSocialControls();
  const { getUrl } = useRouting();

  const [reply, setReply] = React.useState<boolean>(false);
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [likeVal, setLikeVal] = React.useState<number>(comment.likes);
  const [booked, setBooked] = React.useState<boolean>(false);
  const [bookedVal, setBookedVal] = React.useState<number>(15);
  const [shareVal, setShareVal] = React.useState<number>(15);

  const ref = React.useRef<HTMLDivElement>(null);

  const toggleBooked = () => {
    setBooked((prevState) => !prevState);
    setBookedVal((prev) => (!booked ? prev + 1 : prev - 1));
  };

  useOutsideClick(ref, () => {
    setReply(false);
  });

  // function handleLikeComment() {
  //   mutate({
  //     args: {
  //       contentId: comment.id,
  //       contentType: ContentHostType.Comment,
  //     },
  //   });
  // }

  const profile = comment.author;

  const TimeDiff = (createdAt: string) => {
    const { timeUnit, value } = useDateDiff({
      from: new Date(),
      to: new Date(createdAt),
    }).getSince();
    return `${value} ${timeUnit} `;
  };

  const handleFollow = (profileId: string) => {
    setIsFollowing(true);
  };

  const handleUnfollow = (profileId: string) => {
    setIsFollowing(false);
  };

  const handleLikeDislike = () => {
    setIsLiked(!isLiked);
    setLikeVal((prev) => (!isLiked ? prev + 1 : prev - 1));
  };

  return (
    <div ref={ref} className="flex bg-white w-full gap-2 px-3">
      <Link
        href={`/profile/${profile.id}`}
        className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
      >
        <img
          src={profile?.photo}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="w-full flex flex-col">
        <div
          className={`w-full flex pb-2 px-2 flex-col rounded-xl ${
            main ? "bg-white" : "bg-primary-light"
          }`}
        >
          <div className="flex items-center mt-2 gap-2 justify-between">
            <HStack>
              <div className="flex items-center gap-1  ">
                <Link
                  href={`/profile/${profile.id}`}
                  className="text-xl font-semibold"
                >
                  {profile?.username}
                </Link>
                {profile?.verified && (
                  <Verified className="text-[#0084FF] w-5 h-5" />
                )}
              </div>
              <p className="text-[#8E8E8E] text-xs">
                {TimeDiff(comment.commentedAt)} ago
              </p>
            </HStack>
            {index === 0 && !isFollowing && (
              <Button
                className="w-[89.23px]"
                outline
                onClick={() => handleFollow(profile.id)}
              >
                Follow
              </Button>
            )}
            {index === 0 && isFollowing && (
              <Button outline onClick={() => handleUnfollow(profile.id)}>
                Unfollow
              </Button>
            )}
          </div>
          <div className="py-2">
            <EllipsisText
              showMoreColor={main ? "white" : undefined}
              content={comment.content}
              maxLines={3}
              index={index}
            />
          </div>

          {index === 0 && comment.attachment && (
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
          {!main && (
            <HStack>
              <p className="text-primary">{t("Like")}</p>
              <p onClick={() => setReply(true)}>{t("Reply")}</p>
              <div className="flex whitespace-nowrap gap-1 h-full items-end">
                <MdOutlineReply className="text-lg fill-primary" />
                <p className="text-gray-500">
                  {comment.content} {t("Replies")}
                </p>
              </div>
            </HStack>
          )}
          <div className="whitespace-nowrap gap-4 font-[15px] flex  text-gray-500 justify-between w-full">
            <div className="flex gap-4 items-center text-[#8E8E8E] font-semibold">
              <div className="flex gap-2 items-center">
                <button onClick={handleLikeDislike}>
                  {isLiked ? (
                    <HeartFillIcon className="w-4 h-4" />
                  ) : (
                    <HeartOutlineIcon className="w-4 h-4" />
                  )}
                </button>
                <div className="flex gap-1 items-center">
                  <p>{likeVal}</p>
                </div>
              </div>

              {index === 0 && (
                <div className="flex gap-2 items-center">
                  <AiOutlineMessage
                    onClick={() => setShouldCommentBoxFocused(true)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div className="flex gap-1 items-center">
                    <p>{comment.replies}</p>
                  </div>
                </div>
              )}

              {index !== 0 && (
                <button
                  onClick={() => setShouldCommentBoxFocused(true)}
                  className="cursor-pointer"
                >
                  Reply
                </button>
              )}

              {index === 0 && (
                <button
                  onClick={() =>
                    shareLink(
                      getUrl((routes) => routes.visitSocialPost(comment.id)),
                    )
                  }
                  className="flex gap-2 items-center"
                >
                  <ShareIcon />
                  <p className="text-xs font-medium">
                    {NumberShortner(shareVal)}
                  </p>
                </button>
              )}
            </div>

            {index === 0 && (
              <div className="flex gap-1 items-center text-[#8E8E8E] font-semibold">
                {booked ? (
                  <>
                    <SaveFlagFIllIcon
                      className="w-4 h-4 cursor-pointer"
                      onClick={toggleBooked}
                    />
                    <div className="flex gap-1 items-center">
                      <p>{bookedVal}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <SaveFlagOutlineIcon
                      className="w-4 h-4 cursor-pointer"
                      onClick={toggleBooked}
                    />
                    <div className="flex gap-1 items-center">
                      <p>{bookedVal}</p>
                    </div>
                  </>
                )}
              </div>
            )}
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
