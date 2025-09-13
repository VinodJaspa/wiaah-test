import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsHorizontal } from "react-icons/hi";
import { useRouting } from "routing";
import {
  CommentInput,
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
import { ContentHostType } from "@features/API/gql/generated";
import CommentText from "@UI/components/shadcn-components/Fields/commentText";

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
        "username"
        | "photo"
        | "verified"
        | "id"
      >;
    };
  shouldCommentBoxFocused?: boolean;
  setShouldCommentBoxFocused?: (shouldCommentBoxFocused: boolean) => void;
  setPostOwnerUsername?: (username: string) => void;
  setShowReplyUser?: (profile: Pick<Profile, "username" | "photo" | "verified" | "id">) => void; // 👈 accept full profile
}

export const PostReplyCard: React.FC<PostCommentCardProps> = ({
  comment,
  main,
  index,
  setShouldCommentBoxFocused,
  setPostOwnerUsername,
  setShowReplyUser
}) => {
  const { openModalWithId } = useCommentReportModal();
  const { t } = useTranslation();
  const { mutate: createComment } = useCommentOnContent();
  const { getUrl } = useRouting();

  const [reply, setReply] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [likeVal, setLikeVal] = React.useState<number>(comment.likes);

  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setReply(false);
  });

  const profile = comment.author;

  const TimeDiffNarrow = (createdAt: string) => {
    const { timeUnitNarrow, value } = useDateDiff({
      from: new Date(),
      to: new Date(createdAt),
    }).getSince();
    return `${value}${timeUnitNarrow}`;
  };

  const handleLikeDislike = () => {
    setIsLiked(!isLiked);
    setLikeVal((prev) => (!isLiked ? prev + 1 : prev - 1));
  };

  return (
    <div ref={ref} className="flex w-full gap-2 px-3">
      {/* Avatar */}
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

      {/* Main */}
      <div className="w-full flex flex-col">
        {/* Header + Content */}
        <div className="w-full flex pb-2 px-2 flex-col rounded-xl">
          <div className="flex items-center mt-2 gap-2 justify-between">
            <HStack>
              <div className="flex items-center gap-1">
                <Link
                  href={`/profile/${profile.id}`}
                  className="text-sm font-semibold"
                >
                  {profile?.username}
                </Link>
                {profile?.verified && (
                  <Verified className="text-[#0084FF] w-4 h-4" />
                )}
              </div>
              <p className="text-[#8E8E8E] text-xs">
                {TimeDiffNarrow(comment.commentedAt)} ago
              </p>
            </HStack>
          </div>

          {/* Comment text */}
          <div className="py-2">
          <CommentText
            content={comment.content}
            onMentionClick={(mention) => {
              console.log("Clicked mention:", mention);
              // router.push(`/profile/${mention}`)
            }}
            onHashtagClick={(hashtag) => {
              console.log("Clicked hashtag:", hashtag);
              // router.push(`/hashtag/${hashtag}`)
            }}
          />
          </div>
        </div>

        {/* Actions */}
        <div className="flex px-2 w-full items-center justify-between">
          <div className="flex gap-4 items-center text-[#8E8E8E] font-semibold text-sm">
            {/* Like */}
            <div className="flex gap-2 items-center">
              <button onClick={handleLikeDislike}>
                {isLiked ? (
                  <HeartFillIcon className="w-4 h-4 mt-1" />
                ) : (
                  <HeartOutlineIcon className="w-4 h-4 mt-1" />
                )}
              </button>
              <span>{likeVal}</span>
            </div>

            {/* Reply button (not for top-level comment) */}
            {index !== 0 && (
              <button
              onClick={() => profile && setShowReplyUser?.(profile)}
                className="cursor-pointer"
              >
                {t("Reply")}
              </button>
            )}
          </div>
        </div>

        
      </div>

      {/* Menu */}
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
