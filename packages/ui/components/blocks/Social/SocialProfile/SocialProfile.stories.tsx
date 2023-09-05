import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
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
} as ComponentMeta<typeof SocialProfile>;

const Template: ComponentStory<typeof SocialProfile> = (args) => {
  const [storyData, setStoryData] = useRecoilState(SocialStoryState);

  React.useEffect(() =>
    setStoryData({
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "image",
      storyViews: 12300,
      storySrc: "/verticalImage.jpg",
      user: PostCardPlaceHolder.profileInfo,
    })
  );
  return (
    <>
      {storyData && <SocialStoryModal />}
      <SocialProfile {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  shopInfo: SocialProfileInfo,
};

export const withHighNumbers = Template.bind({});
withHighNumbers.args = {
  shopInfo: {
    ...SocialProfileInfo,
    publications: 1500,
    subscribers: 205600,
    subscriptions: 1300000,
  },
};
