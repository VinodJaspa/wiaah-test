import { useDateDiff } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Interaction, PostInfo, ProfileInfo } from "types";
import {
  UserProfileDisplay,
  CommentIcon,
  HeartIcon,
  ShareIcon,
  useSocialPostSettingsPopup,
  HorizontalDotsIcon,
  LocationIcon,
  StarOutlineIcon,
  PersonFillIcon,
  Image,
  ShoppingCartIcon,
  PriceDisplay,
  UnDiscountedPriceDisplay,
  CashbackBadge,
  Profile,
  ServicePost,
  Service,
  useLikeContent,
  ContentHostType,
} from "@UI";
import { useTypedReactPubsub } from "@libs";

export interface SocialServicesPostCardProps {
  profileInfo: Pick<Profile, "id" | "username" | "photo" | "profession">;
  postInfo: Pick<
    ServicePost,
    "createdAt" | "id" | "reactionNum" | "shares" | "views" | "comments"
  > & { service: Pick<Service, "thumbnail" | "title" | "hashtags"> };
  discount?: number;
  price?: number;
  cashback?: number;
  onInteraction?: (interaction: Interaction) => any;
}

export const SocialServicesPostCard: React.FC<SocialServicesPostCardProps> = ({
  cashback,
  discount,
  postInfo,
  price,
  profileInfo,
  onInteraction,
}) => {
  const { OpenModal } = useSocialPostSettingsPopup();
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(postInfo.createdAt),
    to: new Date(),
  });
  const { mutate: like } = useLikeContent();
  const { emit } = useTypedReactPubsub((r) => r.openPostCommentInput);
  const date = getSince();
  return (
    <div className="relative group rounded-[1.25rem] overflow-hidden w-full h-full">
      <Image
        className="w-full h-full object-cover"
        src={postInfo?.service.thumbnail}
        alt={postInfo.service.title}
      />
      {cashback ? (
        <div className="absolute group-hover:opacity-0 transition-opacity bottom-4 left-4">
          <CashbackBadge amount={cashback} type={"cash"} />
        </div>
      ) : null}
      {/* {serviceLabel ? (
        <div className="absolute group-hover:opacity-0 transition-opacity bg-white text-primary rounded-lg px-4 py-1 flex justify-center items-center origin-center top-4 right-4">
          {serviceLabel}
        </div>
      ) : null} */}
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
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <p className="font-bold">{profileInfo.username}</p>
                <div className="flex gap-1 items-center">
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
          <div className="flex justify-between gap-4">
            <div className="flex noScroll gap-3 font-medium text-white overflow-x-scroll">
              {postInfo.service.hashtags.map((tag, i) => (
                <p key={i}>#{tag}</p>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                <ShoppingCartIcon className="fill-white" />
              </span>
              <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                <HeartIcon className="fill-white" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
              <PriceDisplay price={price} />
              {discount ? (
                <UnDiscountedPriceDisplay
                  amount={price || 0}
                  discount={discount}
                />
              ) : null}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex gap-7">
              <div
                onClick={() => {
                  like({
                    args: {
                      authorProfileId: profileInfo.id,
                      contentId: postInfo.id,
                      contentType: ContentHostType.PostService,
                    },
                  });
                }}
                className="flex gap-2 items-center"
              >
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <HeartIcon />
                </span>
                <p className="font-bold text-base">{postInfo.reactionNum}</p>
              </div>

              <div
                onClick={() => {
                  emit({ id: postInfo.id });
                }}
                className="flex items-center gap-2"
              >
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <CommentIcon />
                </span>
                <p className="font-bold text-base">{postInfo.comments}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <ShareIcon />
                </span>
                <p className="font-bold text-base">{postInfo.shares}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <PersonFillIcon />
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-9 h-9 flex justify-center items-center rounded-[20%] bg-white bg-opacity-30">
                  <StarOutlineIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
