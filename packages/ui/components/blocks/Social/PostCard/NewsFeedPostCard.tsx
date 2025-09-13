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
import { isUserLoggedIn } from "state";
import { useLoginGuard, useLoginPopup } from "@src/Hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";

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



  const { withLoginCheck, userLoggedIn } = useLoginGuard();
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
      onClick={withLoginCheck(openPopup)}
      className="w-full h-full relative group rounded md:rounded-[1.25rem] overflow-hidden aspect-[8/3]"
    >
      {userLoggedIn && <ShareWithModal />}
      {isCreateCollectionDialogOpen && (
        <AddToCollectionDialog
          isOpen={isCreateCollectionDialogOpen}
          onClose={() => setCreateCollectionDialogOpen(false)}
        />
      )}

      {/* Thumbnail */}
      {post.postInfo?.attachments[0]?.type === "image" ? (
        <Image
          className="w-full h-full object-cover"
          src={post.postInfo?.thumbnail}
          alt={post.postInfo.content}
          width={800}
          height={400}
        />
      ) : (
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src={post.postInfo?.attachments[0]?.src} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="cursor-pointer absolute group-hover:opacity-100 opacity-0 transition-opacity bg-black bg-opacity-40 md:px-4 md:py-6 py-2 px-1 text-white top-0 left-0 bottom-0 right-0 flex flex-col w-full h-full justify-between z-10">
        {/* User + header */}
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ">
              {/* Left side */}
              <div className="flex gap-2 items-center">
                <div className="min-w-[2.5rem] ">
                  {/* user profile component here */}
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">{post.profileInfo?.name}</p>
                </div>
              </div>
              {/* Right side */}
              <div className="flex items-end flex-col">
                <div className="h-4 absolute right-2 top-2 z-30">
                  <HorizontalDotsIcon
                    onClick={withLoginCheck(() => OpenModal(post.postInfo?.id))}
                    className="text-2xl text-white fill-white cursor-pointer"
                  />
                </div>
                <p className="font-semibold hidden md:flex">
                  {date ? `${date.value} ${date.timeUnit} ${t("ago")}` : ""}
                </p>
              </div>
            </div>

            {/* Location + tags */}
            <div className="flex justify-between items-center">
              <div
                onClick={withLoginCheck(() => {
                  visit((r) =>
                    r.visitUserHashtagPage({
                      ...post.profileInfo,
                      profileId: post.profileInfo!.id,
                      tag: "someTag",
                    })
                  );
                })}
                className="cursor-pointer flex gap-1 items-center"
              >
                <LocationIcon className="text-white" />
                <p>{post.profileInfo?.profession}</p>
              </div>
              <div className="md:flex hidden noScroll gap-3 font-medium text-white overflow-x-scroll">
                {post.postInfo.tags!.map((tag, i) => (
                  <p
                    key={i}
                    className="cursor-pointer"
                    onClick={withLoginCheck(() =>
                      visit((r) =>
                        r.visitUserHashtagPage({
                          ...post.profileInfo,
                          profileId: post.profileInfo!.id,
                          tag,
                        })
                      )
                    )}
                  >
                    #{tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 md:gap-0 w-full">
          <div className="flex md:gap-7 gap-1">
            {/* Like */}
            <div className="flex gap-2 flex-col items-center">
              <span
                onClick={withLoginCheck(handleLike)}
                className="w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <HeartIcon />
              </span>
              <p className="font-bold text-base">{post.postInfo.numberOfLikes}</p>
            </div>

            {/* Comment */}
            <div className="flex flex-col items-center gap-2">
              <span
                onClick={withLoginCheck(() =>
                  emit({
                    id: post.postInfo.id,
                    type: "newsfeed-post",
                  })
                )}
                className="w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <CommentIcon />
              </span>
              <p className="font-bold text-base">{post.postInfo.numberOfComments}</p>
            </div>

            {/* Share */}
            <div className="flex flex-col gap-2 items-center cursor-pointer">
              <span
                onClick={withLoginCheck(() => openShareModal(post.postInfo.id))}
                className="cursor-pointer w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <ShareIcon />
              </span>
              <p className="font-bold text-base">{post.postInfo.numberOfShares}</p>
            </div>
          </div>

          <div className="flex md:gap-4 gap-1">
            {/* Mentions */}
            <div className="flex gap-2 flex-col items-center">
              <span
                onClick={withLoginCheck(() =>
                  openPostMentions({
                    postId: post.postInfo.id,
                    postType: "newsfeed-post",
                  })
                )}
                className="cursor-pointer w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30"
              >
                <PersonFillIcon />
              </span>
            </div>

            {/* Save */}
            <div className="flex gap-2 flex-col items-center">
              <span className="w-7 h-7 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                <SaveFlagFIllIcon
                  onClick={withLoginCheck(handleNewCollectionCreate)}
                  className="text-primary fill-primary"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
