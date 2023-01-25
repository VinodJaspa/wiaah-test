import React from "react";
import {
  CommentIcon,
  HeartIcon,
  ShareIcon,
  HorizontalDotsIcon,
  LocationIcon,
  PersonFillIcon,
  StarIcon,
} from "@UI/components/partials";
import {
  useSocialPostSettingsPopup,
  useShareModal,
  useSocialPostMentionsModal,
  NewsfeedPost,
  Profile,
} from "@UI/components/features";
import { ContentHostType, useLikeContent } from "@features/Social";
import { UserProfileDisplay } from "@UI/components/blocks/DataDisplay";
import { useDateDiff } from "hooks";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useTypedReactPubsub } from "@libs";

export interface PostCardProps {
  profileInfo: Pick<
    Profile,
    "id" | "ownerId" | "username" | "photo" | "profession"
  >;
  postInfo: Pick<
    NewsfeedPost,
    | "id"
    | "userId"
    | "comments"
    | "reactionNum"
    | "authorProfileId"
    | "content"
    | "hashtags"
    | "createdAt"
    | "tags"
    | "shares"
    | "attachments"
  >;
}

export const PostCard: React.FC<PostCardProps> = ({
  postInfo,
  profileInfo,
}) => {
  const { open } = useShareModal();
  const { visit, getUrl } = useRouting();
  const { OpenModal } = useSocialPostSettingsPopup();
  const { open: openPostMentions } = useSocialPostMentionsModal();
  const { t } = useTranslation();
  const { mutate } = useLikeContent();
  const { emit } = useTypedReactPubsub((v) => v.openPostCommentInput);

  function handleLike() {
    mutate({
      args: {
        authorProfileId: profileInfo.id,
        contentId: postInfo.id,
        contentType: ContentHostType.PostNewsfeed,
      },
    });
  }

  const { getSince } = useDateDiff({
    from: new Date(postInfo.createdAt),
    to: new Date(),
  });

  const date = getSince();

  if (!postInfo || !profileInfo) return null;

  return (
    <div className="relative group rounded-[1.25rem] overflow-hidden w-full h-full">
      <img
        className="w-full h-full object-cover"
        src={
          postInfo?.attachments && postInfo.attachments.length > 0
            ? postInfo.attachments[0].src
            : ""
        }
        alt={postInfo.content}
      />

      <div className="absolute group-hover:opacity-100 opacity-0 transition-opacity bg-black bg-opacity-40 px-8 py-6 text-white top-0 left-0 bottom-0 right-0 flex flex-col w-full justify-between">
        <div className="flex flex-col w-full ">
          <div className="flex gap-2 items-center">
            <div className="min-w-[2.5rem] ">
              <UserProfileDisplay
                storyUserData={{
                  name: profileInfo.username,
                  userPhotoSrc: profileInfo.photo,
                  id: profileInfo.id,
                }}
                onProfileClick={() =>
                  visit((r) => r.visitSocialPostAuthorProfile(profileInfo))
                }
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <p className="font-bold">{profileInfo.username}</p>
                <div
                  onClick={() =>
                    visit((r) =>
                      r.visitLocalisation({ location: profileInfo.profession })
                    )
                  }
                  className="cursor-pointer flex gap-1 items-center"
                >
                  <LocationIcon className="text-white" />
                  <p>{profileInfo.profession}</p>
                </div>
              </div>
              <div className="flex items-end flex-col">
                <div className="h-4 overflow-hidden">
                  <HorizontalDotsIcon
                    onClick={() => OpenModal(postInfo?.id)}
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
            {postInfo.tags.map((tag, i) => (
              <p
                className="cursor-pointer"
                onClick={() =>
                  visit((r) =>
                    r.visitUserHashtagPage({
                      ...profileInfo,
                      profileId: profileInfo.id,
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
              <p className="font-bold text-base">{postInfo.reactionNum}</p>
            </div>

            <div className="flex items-center gap-2">
              <span
                onClick={() =>
                  emit({ id: postInfo.id, type: ContentHostType.PostNewsfeed })
                }
                className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <CommentIcon />
              </span>
              <p className="font-bold text-base">{postInfo.comments}</p>
            </div>
            <div className="flex gap-2 items-center">
              <span
                onClick={() =>
                  open(getUrl((r) => r.visitNewsfeedPostPage(postInfo)))
                }
                className="cursor-pointer w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <ShareIcon />
              </span>
              <p className="font-bold text-base">{postInfo.shares}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <span
                onClick={() =>
                  openPostMentions({
                    postId: postInfo.id,
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
