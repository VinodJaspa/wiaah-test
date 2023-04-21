import { NumberShortner, mapArray } from "@UI/../utils/src";
import {
  AspectRatio,
  Avatar,
  HStack,
  HeartIcon,
  Image,
  Slider,
} from "@partials";
import React from "react";

interface SocialNewsfeedPostMobileCardProps {
  post: {
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
  };
}

export const SocialNewsfeedPostMobileCard: React.FC<
  SocialNewsfeedPostMobileCardProps
> = ({ post }) => {
  const [activeImage, setActiveImage] = React.useState<number>(0);

  const interactions: {
    value: string;
    icon: React.ReactNode;
    active: boolean;
  }[] = [
    {
      value: NumberShortner(post.likes),
      active: post.liked,
      icon: HeartIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <HStack className="justify-between">
        <HStack>
          <Avatar src="" alt="" />
          <div className="flex flex-col gap-4">
            <HStack></HStack>
            <p className="text-[#4E4E4E]"></p>
          </div>
        </HStack>
      </HStack>

      <div className="flex flex-col gap-2">
        <p>{post.content}</p>
        <Slider>
          {mapArray(post.images || [], (src, i) => (
            <AspectRatio ratio={1.2}>
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                {[...Array(post.images.length)].map((_, i) => (
                  <div
                    className={`${
                      i === activeImage ? "bg-primary w-4" : "bg-gray-400 w-2"
                    } h-2 rounded-full bg-gray-400`}
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
      <HStack className="justify-center items-center"></HStack>
    </div>
  );
};
