import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialAffiliationCard } from "@UI";
import { socialAffiliationCardPlaceholder } from "placeholder";
export default {
  title: "UI/blocks/Social/SocialAffiliationCard",
  component: SocialAffiliationCard,
} as Meta<typeof SocialAffiliationCard>;

export const WithImage = {
  args: {
    ...socialAffiliationCardPlaceholder,
    attachment: { src: "/shop.jpeg", type: "image" },
  },
};

export const WithVerticalImage = {
  args: {
    ...socialAffiliationCardPlaceholder,
    attachment: { src: "/verticalImage.jpg", type: "image" },
  },
};

export const WithVideo = {
  args: {
    ...socialAffiliationCardPlaceholder,
    attachment: {
      src: "/video.mp4",
      type: "video",
    },
  },
};

export const WithVerticalVideo = {
  args: {
    ...socialAffiliationCardPlaceholder,
    attachment: {
      src: "/verticalVideo.mp4",
      type: "video",
    },
  },
};
