import { NumberShortner, mapArray, runIfFn } from "@UI/../utils/src";
import {
  AspectRatio,
  Avatar,
  CommentIcon,
  HStack,
  HeartFillIcon,
  HeartIcon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SaveFlagOutlineIcon,
  ShareIcon,
  Slider,
  VStack,
  VerifiedIcon,
  VerticalDotsIcon,
} from "@partials";
import { EllipsisText } from "@blocks";
import { useDateDiff } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { SocialPostOptionsDropdown } from "../DataDisplay";

interface SocialNewsfeedPostMobileCardProps {
  post: {
    id: string;
    userPhoto: string;
    username: string;
    verified: boolean;
    createdAt: string;
    content: string;
    images: string[];
    likes: number;
    comments: number;
    shares: number;
    liked: boolean;
    saved: boolean;
    location: {
      country: string;
      city: string;
    };
  };
}

export const SocialNewsfeedPostMobileCard: React.FC<
  SocialNewsfeedPostMobileCardProps
> = ({ post }) => {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = React.useState<number>(0);

  const interactions: {
    value: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    active: boolean;
  }[] = [
    {
      value: NumberShortner(post.likes),
      active: false,
      icon: HeartIcon,
      activeIcon: HeartFillIcon,
    },
    {
      value: NumberShortner(post.comments),
      active: false,
      icon: CommentIcon,
      activeIcon: null,
    },
    {
      value: NumberShortner(post.shares),
      active: false,
      icon: ShareIcon,
      activeIcon: null,
    },
    {
      value: post.saved ? t("Saved") : t("Save"),
      active: false,
      icon: SaveFlagOutlineIcon,
      activeIcon: SaveFlagOutlineIcon,
    },
  ];

  const { getSince } = useDateDiff({
    from: new Date(post.createdAt),
    to: new Date(),
  });

  const since = getSince();

  return (
    <div className="flex flex-col gap-4">
      <HStack className="justify-between">
        <HStack className="items-center">
          <Avatar src={post.userPhoto} alt={post.username} />
          <div className="flex flex-col">
            <HStack>
              <p className="text-xl font-semibold">{post.username}</p>
              <VerifiedIcon className="text-blue-500" />
              <p className="text-[#111111] text-sm">
                {since.value}
                {since.timeUnitNarrow} {t("ago")}
              </p>
            </HStack>
            <p className="text-[#4E4E4E] text-xs font-normal">
              {post.location.city}, {post.location.country}
            </p>
          </div>
        </HStack>
        <SocialPostOptionsDropdown postId={post.id}>
          <div className="px-2">
            <VerticalDotsIcon />
          </div>
        </SocialPostOptionsDropdown>
      </HStack>

      <div className="flex flex-col gap-2">
        <EllipsisText maxLines={2}>{post.content}</EllipsisText>
        <Slider
          containerProps={{ className: "overflow-hidden" }}
          currentItemIdx={activeImage}
          onSliderChange={(v) => setActiveImage(v)}
        >
          {mapArray(post.images || [], (src, i) => (
            <AspectRatio ratio={1.2}>
              <div className="absolute flex gap-2 top-2 left-1/2 -translate-x-1/2">
                {[...Array(post.images.length)].map((_, i) => (
                  <div
                    className={`${
                      i === activeImage ? "bg-primary w-4" : "bg-gray-400 w-2"
                    } h-2 rounded-full`}
                  />
                ))}
              </div>
              <Image
                src={src}
                key={i}
                className="w-full h-full object-cover rounded-xl"
              />
            </AspectRatio>
          ))}
        </Slider>
      </div>
      <HStack className="justify-center items-center">
        {mapArray(interactions, (v, i) => (
          <VStack key={i} className="text-lg w-16">
            {v.active ? runIfFn(v.activeIcon) : runIfFn(v.icon)}
            <p className="text-sm font-medium">{v.value}</p>
          </VStack>
        ))}
      </HStack>
    </div>
  );
};
