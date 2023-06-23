import { useDateDiff } from "@UI/../hooks";
import {
  useGetMyProfileQuery,
  useGetSocialPostQuery,
  useLikeContent,
  useSavePostMutation,
} from "@features/Social/services";
import {
  AspectRatio,
  Avatar,
  CommentIcon,
  CommentOutlineIcon,
  HStack,
  HeartFillIcon,
  HeartOutlineIcon,
  HorizontalDotsIcon,
  Image,
  PaperPlaneAngleIcon,
  PaperPlaneAngleOutlineIcon,
  SaveFlagFIllIcon,
  SaveFlagOutlineIcon,
  Slider,
  VerifiedIcon,
} from "@partials";
import React from "react";
import { SocialPostOptionsDropdown } from "./DropdownOptions";
import { NumberShortner, mapArray } from "@UI/../utils/src";
import { useTranslation } from "react-i18next";
import { CommentInput, useSocialControls } from "@blocks";
import { PostCommentsList } from "../Lists";
import { ContentHostType, PostType } from "@features/API";
import { getRandomImage } from "@UI/placeholder";
import { useRouting } from "routing";

export const SocialPostDetails: React.FC<{ postId: string }> = ({ postId }) => {
  const { data, isLoading } = useGetSocialPostQuery({ id: postId });
  const { shareLink } = useSocialControls();
  const { t } = useTranslation();
  const { getSince } = useDateDiff({
    from: new Date(data?.createdAt || new Date()),
    to: new Date(Date.now()),
  });
  const { mutate } = useLikeContent();
  const { getUrl } = useRouting();
  const Since = getSince();
  const { data: myProfile } = useGetMyProfileQuery();
  const { mutate: savePost } = useSavePostMutation();

  const interactions: {
    icon: React.ReactElement;
    activeIcon: React.ReactElement;
    isActive: boolean;
    label: string;
    onClick: () => void;
  }[] = [
    {
      icon: <HeartOutlineIcon />,
      activeIcon: <HeartFillIcon />,
      isActive: !!data?.isLiked,
      label: `${NumberShortner(data?.reactionNum || 0)}`,
      onClick: () =>
        myProfile?.id
          ? mutate({
              args: {
                contentId: postId,
                contentType: ContentHostType.PostNewsfeed,
              },
            })
          : null,
    },
    {
      icon: <CommentOutlineIcon />,
      activeIcon: <CommentIcon />,
      isActive: !!data?.isCommented,
      label: `${NumberShortner(data?.comments || 0)}`,
      onClick: () => {},
    },
    {
      icon: <PaperPlaneAngleOutlineIcon />,
      activeIcon: <PaperPlaneAngleIcon />,
      isActive: false,
      label: `${NumberShortner(data?.shares || 0)}`,
      onClick: () => {
        shareLink(getUrl((r) => r.visitSocialPost(postId)));
      },
    },
    {
      icon: <SaveFlagOutlineIcon />,
      activeIcon: <SaveFlagFIllIcon />,
      isActive: !!data?.isSaved,
      label: `${t("Save")}`,
      onClick: () => savePost({ postId }),
    },
  ];

  const attachments = (
    data?.type === PostType.ShopPost
      ? [data.product.thumbnail]
      : data?.type === PostType.ServicePost
      ? [data.service.thumbnail]
      : data?.type === PostType.AffiliationPost
      ? data.affiliation.itemType === "product"
        ? [data.affiliation.product?.thumbnail]
        : [data.affiliation.service?.thumbnail]
      : data?.type === PostType.NewsfeedPost
      ? [getRandomImage(), getRandomImage(), getRandomImage()]
      : []
  ) as string[];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <HStack>
          <Avatar
            src={data?.publisher?.photo}
            name={data?.publisher?.username}
            alt={data?.publisher?.username}
          />
          <div className="flex flex-col gap-1">
            <HStack>
              <p className="text-xl font-semibold">
                {data?.publisher?.username}
              </p>
              {data?.publisher?.verified ? (
                <VerifiedIcon className="text-xs text-secondaryBlue" />
              ) : null}
            </HStack>
            <p className="text-xs text-grayText">
              {Since.value} {Since.timeUnit}
            </p>
          </div>
        </HStack>
        <SocialPostOptionsDropdown postId={postId}>
          <HorizontalDotsIcon />
        </SocialPostOptionsDropdown>
      </div>

      <SocialPostDetailsAttachmentsDisplay attachments={attachments} />

      <HStack className="justify-around py-2">
        {mapArray(interactions, (v, i) => (
          <div key={i} className="flex flex-col gap-1 text-lg items-center">
            {v.isActive ? v.activeIcon : v.icon}
            <p className="text-xs font-medium">{v.label}</p>
          </div>
        ))}
      </HStack>

      <CommentInput />
      <PostCommentsList postId={postId} />
    </div>
  );
};

const SocialPostDetailsAttachmentsDisplay: React.FC<{
  attachments: string[];
}> = ({ attachments }) => {
  const [idx, setIdx] = React.useState(0);
  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden relative">
        <Slider gap={4} onSliderChange={(i) => setIdx(i)} currentItemIdx={idx}>
          {mapArray(attachments, (src, i) => (
            <div key={i} className="w-full">
              <AspectRatio ratio={1.016304347826087}>
                <Image src={src} className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex gap-2 justify-center">
        {[...Array(attachments.length)].map((_, i) => (
          <div
            className={`${
              i === idx ? "bg-primary w-4" : "bg-gray-400 w-2"
            } h-2 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};
