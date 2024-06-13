import React from "react";
import {
  CommentIcon,
  HeartIcon,
  ShareIcon,
  HorizontalDotsIcon,
  LocationIcon,
  PersonFillIcon,
  StarIcon,
  Image,
} from "@UI/components/partials";
import {
  useSocialPostSettingsPopup,
  useSocialPostMentionsModal,
} from "@UI/components/features";
import { useLikeContent } from "@features/Social";
import { UserProfileDisplay } from "@UI/components/blocks/DataDisplay";
import { useDateDiff } from "hooks";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useTypedReactPubsub } from "@libs";
import {
  Attachment,
  ContentHostType,
  NewsfeedPost,
  Profile,
} from "@features/API";
import { NumberShortner, setTestid } from "@UI/../utils/src";
import { useSocialControls } from "@blocks/Layout";
import { PostCardInfo } from "types";

export interface PostCardProps {
  post: PostCardInfo;
  onProfileClick?: () => any;
  onPostClick?: () => any;
  onLocationClick?: () => any;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPostClick,
  onProfileClick,
  onLocationClick,
}) => {
  const { shareLink } = useSocialControls();
  const { visit, getUrl } = useRouting();
  const { OpenModal } = useSocialPostSettingsPopup();
  const { open: openPostMentions } = useSocialPostMentionsModal();
  const { t } = useTranslation();
  const { mutate } = useLikeContent();
  const { emit } = useTypedReactPubsub((v) => v.openPostCommentInput);

  function handleLike() {
    if (!post.profileInfo) return;
    mutate({
      args: {
        contentId: post.postInfo.id,
        contentType: ContentHostType.PostNewsfeed,
      },
    });
  }

  const { getSince } = useDateDiff({
    from: new Date(post.postInfo.createdAt),
    to: new Date(),
  });

  const date = getSince();

  // if (!postInfo || !profileInfo) return null;

  return (
    <div
      onClick={() => visit((r) => r.visitSocialPost(post.postInfo.id))}
      {...setTestid("social-newsfeed-post")}
      className="relative group rounded md:rounded-[1.25rem] overflow-hidden w-full h-full"
    >
      <Image
        className="w-full h-full object-cover"
        src={post.postInfo?.thumbnail}
        alt={post.postInfo.content}
      />

      <div className="cursor-pointer absolute group-hover:opacity-100 opacity-0 transition-opacity bg-black bg-opacity-40 px-8 py-6 text-white top-0 left-0 bottom-0 right-0 flex flex-col w-full justify-between">
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center">
            <div className="min-w-[2.5rem] ">
              <UserProfileDisplay
                storyUserData={{
                  name: post.profileInfo?.name || "",
                  userPhotoSrc: post.profileInfo?.photo || "",
                  id: post.profileInfo?.id || "",
                }}
                onProfileClick={() => onProfileClick && onProfileClick()}
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <p className="font-bold">{post.profileInfo?.name}</p>
                <div
                  onClick={() => onLocationClick && onLocationClick()}
                  className="cursor-pointer flex gap-1 items-center"
                >
                  <LocationIcon className="text-white" />
                  <p>{post.profileInfo?.profession}</p>
                </div>
              </div>
              <div className="flex items-end flex-col">
                <div className="h-4 overflow-hidden">
                  <HorizontalDotsIcon
                    onClick={() => OpenModal(post.postInfo?.id)}
                    className="text-2xl text-white fill-white cursor-pointer"
                  />
                </div>
                <p className="font-semibold">
                  {date ? `${date.value} ${date.timeUnit} ${t("ago")}` : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="flex noScroll gap-3 font-medium text-white overflow-x-scroll">
            {post.postInfo.tags!.map((tag, i) => (
              <p
                className="cursor-pointer"
                onClick={() =>
                  visit((r) =>
                    r.visitUserHashtagPage({
                      ...post.profileInfo,
                      profileId: post.profileInfo!.id,
                      tag,
                    })
                  )
                }
                key={i}
              >
                #{tag}
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-7">
            <div className="flex gap-2 items-center">
              <span
                onClick={handleLike}
                className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <HeartIcon />
              </span>
              <p className="font-bold text-base">
                {NumberShortner(
                  post.postInfo.numberOfComments +
                  post.postInfo.numberOfLikes +
                  post.postInfo.numberOfShares
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                onClick={() =>
                  emit({
                    id: post.postInfo.id,
                    type: ContentHostType.PostNewsfeed,
                  })
                }
                className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <CommentIcon />
              </span>
              <p className="font-bold text-base">
                {NumberShortner(post.postInfo.numberOfComments)}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <span
                onClick={() =>
                  shareLink(
                    getUrl((r) => r.visitNewsfeedPostPage(post.postInfo))
                  )
                }
                className="cursor-pointer w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <ShareIcon />
              </span>
              <p className="font-bold text-base">
                {NumberShortner(post.postInfo.numberOfShares)}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <span
                onClick={() =>
                  openPostMentions({
                    postId: post.postInfo.id,
                    postType: "newsfeed-post",
                  })
                }
                className="cursor-pointer w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <PersonFillIcon />
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                <StarIcon className="text-primary fill-primary" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
