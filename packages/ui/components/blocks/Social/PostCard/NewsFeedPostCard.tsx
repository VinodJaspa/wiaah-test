import React from "react";
import {
  useLikeContent,
  useSocialPostMentionsModal,
  useSocialPostSettingsPopup,
} from "@features/Social";
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
import { NumberShortner, setTestid } from "utils";
import { useSocialControls } from "@blocks/Layout";
import { PostCardInfo } from "types";
import {
  CommentIcon,
  HeartIcon,
  HorizontalDotsIcon,
  Image,
  LocationIcon,
  PersonFillIcon,
  SaveFlagFIllIcon,
  ShareIcon,
  StarIcon,
} from "@partials";
import { UserProfileDisplay } from "@blocks/DataDisplay";
import { ShareWithModal, useShareWithModal } from "@blocks/Modals";
import { handleSavePostClick } from "./services";
import AddToCollectionDialog from "@UI/components/shadcn-components/Dialog/collectionDialog";

export interface PostCardProps {
  post: PostCardInfo;
  onProfileClick?: () => any;
  onPostClick?: () => any;
  onLocationClick?: () => any;
  openPopup?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPostClick,
  onProfileClick,
  onLocationClick,
  openPopup,
}) => {
  const { shareLink } = useSocialControls();
  const { visit, getUrl } = useRouting();
  const { OpenModal } = useSocialPostSettingsPopup();
  const { open: openPostMentions } = useSocialPostMentionsModal();
  const { t } = useTranslation();
  const { mutate } = useLikeContent();
  const { emit } = useTypedReactPubsub((v) => v.openPostCommentInput);
  const { openShareModal } = useShareWithModal();
  const [isCreateCollectionDialogOpen, setCreateCollectionDialogOpen] = React.useState(false);

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
  //Handle crete new collection dialog
  const handleNewCollectionCreate = () => {
    setCreateCollectionDialogOpen(true);
  }

  return (
    <div
      {...setTestid("social-newsfeed-post")}
      className="w-full h-full relative group rounded md:rounded-[1.25rem] overflow-hidden aspect-[8/3]"
    >
       <ShareWithModal />
      {isCreateCollectionDialogOpen && <AddToCollectionDialog isOpen={isCreateCollectionDialogOpen} onClose={() => setCreateCollectionDialogOpen(false)} />}
      {post.postInfo?.attachments[0]?.type === "image" && (
        <Image
          onClick={openPopup}
          className="w-full h-full object-cover"
          src={post.postInfo?.thumbnail}
          alt={post.postInfo.content}
        />
      )}

      {post.postInfo?.attachments[0]?.type !== "image" && (
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src={post.postInfo?.attachments[0]?.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div

        className="cursor-pointer absolute group-hover:opacity-100 opacity-0 transition-opacity bg-black bg-opacity-40 md:px-4 md:py-6 py-2 px-1 text-white top-0 left-0 bottom-0 right-0 flex flex-col w-full h-full justify-between z-10"
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ">
              <div className="flex gap-2 items-center">
                <div className="min-w-[2.5rem] ">
                  <UserProfileDisplay
                    seen={true}
                    storyUserData={{
                      name: post.profileInfo?.name || "",
                      userPhotoSrc: post.profileInfo?.thumbnail || "",
                      id: post.profileInfo?.id || "",
                    }}
                    onProfileClick={(e) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      e.stopPropagation;
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      onProfileClick && onProfileClick();
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">{post.profileInfo?.name}</p>
                </div>
              </div>
              <div className="flex items-end flex-col">
                <div className="h-4 absolute right-2 top-2 z-30">
                  <HorizontalDotsIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      OpenModal(post.postInfo?.id);
                    }}
                    className="text-2xl text-white fill-white cursor-pointer"
                  />
                </div>
                <p className="font-semibold hidden md:flex">
                  {date ? `${date.value} ${date.timeUnit} ${t("ago")}` : ""}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  onLocationClick && onLocationClick();
                }}
                className="cursor-pointer flex gap-1 items-center"
              >
                <LocationIcon className="text-white" />
                <p>{post.profileInfo?.profession}</p>
              </div>

              <div className="md:flex hidden noScroll gap-3 font-medium text-white overflow-x-scroll">
                {post.postInfo.tags!.map((tag, i) => (
                  <p
                    className="cursor-pointer"
                    onClick={() =>
                      visit((r) =>
                        r.visitUserHashtagPage({
                          ...post.profileInfo,
                          profileId: post.profileInfo!.id,
                          tag,
                        }),
                      )
                    }
                    key={i}
                  >
                    #{tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2 md:gap-0 w-full">
          <div className="flex md:gap-7 gap-1">
            <div className="flex gap-2 flex-col items-center">
              <span
                onClick={handleLike}
                className="w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <HeartIcon />
              </span>
              <p className="font-bold text-base">
                {NumberShortner(
                  post.postInfo.numberOfComments +
                  post.postInfo.numberOfLikes +
                  post.postInfo.numberOfShares,
                )}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  emit({
                    id: post.postInfo.id,
                    type: ContentHostType.PostNewsfeed,
                  });
                }}
                className="w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <CommentIcon />
              </span>
              <p className="font-bold text-base">
                {NumberShortner(post.postInfo.numberOfComments)}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center cursor-pointer">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  // alert("okk")
                  openShareModal(post.postInfo.id);
                }}
                className="cursor-pointer w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <ShareIcon
                  
                />
              </span>
              <p className="font-bold text-base">
                {NumberShortner(post.postInfo.numberOfShares)}
              </p>
            </div>
          </div>
          <div className="flex md:gap-4 gap-1">
            <div className="flex gap-2 flex-col items-center">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  openPostMentions({
                    postId: post.postInfo.id,
                    postType: "newsfeed-post",
                  });
                }}
                className="cursor-pointer w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <PersonFillIcon />
              </span>
            </div>
            <div className="flex gap-2 flex-col items-center">
              <span className="w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                <SaveFlagFIllIcon onClick={() => handleNewCollectionCreate()} className="text-primary fill-primary" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
