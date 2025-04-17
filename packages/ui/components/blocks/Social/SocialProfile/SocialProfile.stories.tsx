import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialProfile } from "@UI";
import { SocialProfileInfo } from "@UI/placeholder/social";
import { PostCardPlaceHolder } from "placeholder";
import { SocialStoryModal } from "../SocialStoriesModal";
import { useStory } from "@src/Hooks";
import { useRecoilState } from "recoil";
import { SocialStoryState } from "@src/state";
export default {
  title: "UI/blocks/Social/SocialProfile",
  component: SocialProfile,
} as Meta<typeof SocialProfile>;

const Template: StoryFn<typeof SocialProfile> = (args) => {
  const [storyData, setStoryData] = useRecoilState(SocialStoryState);

  React.useEffect(() =>
    setStoryData({
      id: "story-456", // Unique identifier for the story
      storyType: "image", // Type of the story (can be 'text', 'image', etc.)
      storySrc: "https://example.com/story-image.jpg", // URL for the story source (optional)
      storyText: "This is a sample story text.", // Optional text for the story
      storyCreationDate: new Date().toISOString(), // Creation date in ISO format
      storyViews: 100, // Number of views for the story
      user: {
        id: "user-123", // Unique ID for the user
        name: "Jane Doe", // User's name
        thumbnail: "https://example.com/user-thumbnail.jpg", // URL for the user's thumbnail
        accountType: "buyer", // Can be 'seller' or 'buyer'
        public: true, // Indicates if the user's profile is public
        profession: "Graphic Designer", // Optional profession
        photo: "https://example.com/user-profile.jpg", // URL for the user's profile photo
      },
    }),
  );
  return (
    <>
      {storyData && <SocialStoryModal profileId="3" />}
      <SocialProfile {...args} />
    </>
  );
};

export const Default = {
  render: Template,

  args: {
    shopInfo: SocialProfileInfo,
  },
};

export const withHighNumbers = {
  render: Template,

  args: {
    shopInfo: {
      ...SocialProfileInfo,
      publications: 1500,
      subscribers: 205600,
      subscriptions: 1300000,
    },
  },
};
