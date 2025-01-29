import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { useRouting } from "routing";
import {
  EllipsisText,
  HeartFillIcon,
  HeartOutlineIcon,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useCommentOnContent,
  useCommentReportModal,
  useDateDiff,
  useOutsideClick,
  useSocialControls,
  Verified,
} from "ui";
import { Attachment, Comment, Profile } from "../../../features/API";

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
  setPostOwnerUsername?: (username: string) => void;
}

export const PostReplyCard: React.FC<PostCommentCardProps> = ({
  comment,
  main,
  index,
  setShouldCommentBoxFocused,
  setPostOwnerUsername,
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
  const [shouldCommentRepliesOpen, setShouldCommentRepliesOpen] =
    React.useState<{ state: boolean; count: number }>({
      state: false,
      count: comment.replies,
    });

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

  const TimeDiffNarrow = (createdAt: string) => {
    const { timeUnitNarrow, value } = useDateDiff({
      from: new Date(),
      to: new Date(createdAt),
    }).getSince();
    return `${value}${timeUnitNarrow} `;
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
    <div ref={ref} className="flex w-full gap-2 px-3">
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
        <div className="w-full flex pb-2 px-2 flex-col rounded-xl">
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
            </HStack>
          </div>
          <div className="py-2">
            <EllipsisText
              showMoreColor={main ? "white" : undefined}
              content={comment.content}
              maxLines={3}
              index={index}
              isReply
            />
          </div>
        </div>
        <div className="flex px-2 w-full items-center justify-between">
          <div className="whitespace-nowrap gap-4 font-[15px] flex  text-gray-500 justify-between w-full">
            <div className="flex gap-4 items-center text-[#8E8E8E] font-semibold">
              <div className="flex gap-2 items-center">
                <p className="text-[#8E8E8E] text-xs">
                  {TimeDiffNarrow(comment.commentedAt)} ago
                </p>
                <button onClick={handleLikeDislike}>
                  {isLiked ? (
                    <HeartFillIcon className="w-4 h-4 mt-1" />
                  ) : (
                    <HeartOutlineIcon className="w-4 h-4 mt-1" />
                  )}
                </button>
                <div className="flex gap-1 items-center">
                  <p>{likeVal}</p>
                </div>
              </div>
              {index !== 0 && (
                <button
                  onClick={() => {
                    setShouldCommentBoxFocused(true);
                    setPostOwnerUsername(comment.author.username);
                  }}
                  className="cursor-pointer"
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
        {/* {index !== 0 && shouldCommentRepliesOpen.count > 0 && (
          <div className="ml-10 mt-2 relative">
            <button
              onClick={() =>
                setShouldCommentRepliesOpen({
                  ...shouldCommentRepliesOpen,
                  state: !shouldCommentRepliesOpen.state,
                })
              }
              className="text-gray-500 font-medium flex gap-1 items-center"
            >
              <BiMinus className="mt-1" />
              {!shouldCommentRepliesOpen.state ? (
                <span>View {shouldCommentRepliesOpen.count} replies</span>
              ) : (
                <span>Hide</span>
              )}
            </button>
            {shouldCommentRepliesOpen.state && (
              <div>
                {Array.from(
                  { length: shouldCommentRepliesOpen.count },
                  (_, index) => (
                    <p>Reply</p>
                  ),
                )}
              </div>
            )}
          </div>
        )} */}
        {/* {reply ? (
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
        ) : null} */}
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
