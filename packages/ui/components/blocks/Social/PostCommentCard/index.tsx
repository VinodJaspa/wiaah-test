import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  HeartFillIcon,
  HeartOutlineIcon,
  Verified,
  SaveFlagFIllIcon,
  SaveFlagOutlineIcon,
  ShareIcon,
  HStack,
  PostAttachment,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useOutsideClick,
  useDateDiff,
} from "ui";
import { MdOutlineReply } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import { NumberShortner } from "utils";
import { PostReplyCard } from "../PostReplyCard";

import type { Comment, Attachment, Profile } from "../../../features/API";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import CommentInputBox from "@UI/components/shadcn-components/Fields/commentBox";
import CommentText from "@UI/components/shadcn-components/Fields/commentText";

export interface PostCommentCardProps {
  index?: number;
  comment: { __typename?: "Comment" } & Pick<
    Comment,
    "id" | "content" | "commentedAt" | "likes" | "replies"
  > & {
    attachment?: Pick<Attachment, "src" | "type">;
    author?: Pick<Profile, "username" | "photo" | "verified" | "id">;
  };
  setShowReplyUser?: (profile: Pick<Profile, "username" | "photo" | "verified" | "id">) => void; // 👈 accept full profile
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({ comment, index, setShowReplyUser }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const profile = comment.author;

  // state
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);


  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowReplies(false));

  const { value, timeUnit } = useDateDiff({
    from: new Date(),
    to: new Date(comment.commentedAt),
  }).getSince();

  // handlers
  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleBookmark = () => setBookmarked((prev) => !prev);

  const copyProfileLink = () => {
    const url = `${window.location.origin}/profile/${profile?.username}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div ref={ref} className="flex bg-white w-full gap-3 px-3 py-2 rounded-lg">
      {/* Avatar */}
      <Link
        href={`/profile/${profile?.username}`}
        className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
      >
        <img src={profile?.photo} alt="avatar" className="w-full h-full object-cover" />
      </Link>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <HStack>
            <Link href={`/profile/${profile?.username}`} className="font-semibold text-sm">
              {profile?.username}
            </Link>
            {profile?.verified && <Verified className="text-[#0084FF] w-4 h-4" />}
            <span className="text-xs text-gray-500">{`${value} ${timeUnit} ago`}</span>
          </HStack>
          {index === 0 && (
            <PrimaryButton
              onClick={() => setIsFollowing((prev) => !prev)}
              className="text-xs"
            >
              {isFollowing ? t("Unfollow") : t("Follow")}
            </PrimaryButton>
          )}
        </div>

        {/* Content */}
        <div className="mt-1">
          <CommentText
            content={comment.content}
            onMentionClick={(mention) => console.log("Clicked mention:", mention)}
            onHashtagClick={(hashtag) => console.log("Clicked hashtag:", hashtag)}
          />
        </div>

        {index === 0 && comment.attachment && (
          <div className="mt-2 w-1/2">
            <PostAttachment
              src={comment.attachment.src}
              type={comment.attachment.type}
              alt={profile?.username}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <div className="flex flex-col gap-1">
            {/* Like + Reply Row */}
            <div className="flex gap-4 items-center">
              {/* Like */}
              <button onClick={toggleLike} className="flex gap-1 items-center">
                {isLiked ? (
                  <HeartFillIcon className="w-4 h-4" />
                ) : (
                  <HeartOutlineIcon className="w-4 h-4" />
                )}
                <span>{likes}</span>
              </button>

              {/* Reply */}
              <button
                className="flex gap-1 items-center"
                onClick={() => profile && setShowReplyUser?.(profile)}
              >
                <MdOutlineReply className="w-4 h-4 text-primary" />
                <span>{t("Reply")}</span>
              </button>
            </div>

            {/* Replies count (underneath row) */}
            {comment.replies > 0 && (
              <button
                onClick={() => setShowReplies((prev) => !prev)}
                className="text-gray-500 text-sm text-left ml-16"
              >
                {showReplies ? t("Hide replies") : `- View ${comment.replies} replies`}
              </button>
            )}
          </div>


          {/* Right side: Share + Bookmark */}
          <div className="flex gap-3 items-center">
            {index === 0 && (
              <button className="flex gap-1 items-center">
                <ShareIcon className="w-4 h-4" />
                <span>{NumberShortner(15)}</span>
              </button>
            )}
            <button onClick={toggleBookmark}>
              {bookmarked ? <SaveFlagFIllIcon className="w-4 h-4" /> : <SaveFlagOutlineIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Replies */}
        {showReplies && (
          <div className="ml-10 mt-2 space-y-2">
            {Array.from({ length: comment.replies }).map((_, i) => (
              <PostReplyCard key={i} comment={comment} setShowReplyUser={setShowReplyUser} />
            ))}
          </div>
        )}

        {/* Reply Box (now INSIDE flex-col, under actions/replies) */}
        {/* {showReplyBox && (
          <div className="ml-10 mt-2">
            <CommentInputBox
              onSend={(msg) => {
                console.log("New reply:", msg, "for comment:", comment.id);
                setShowReplyBox(false);
              }}
            />
          </div>
        )} */}
      </div>

      {/* Menu */}
      <Menu>
        <MenuButton>
          <HiDotsHorizontal className="cursor-pointer text-xl text-gray-600" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push(`/profile/${profile?.username}`)}>
            {t("go_to_post", "Go to post")}
          </MenuItem>
          <MenuItem onClick={copyProfileLink}>
            {t("copy_link", "Copy link")}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
