import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialStoryModal } from "@UI";
import { useStory, useStorySeenBy } from "@src/Hooks";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { PostCardPlaceHolder } from "placeholder";
import { SocialStoryState } from "@src/state";
export default {
  title: "UI/blocks/Social/SocialStoriesModal",
  component: SocialStoryModal,
} as ComponentMeta<typeof SocialStoryModal>;

const Template: ComponentStory<typeof SocialStoryModal> = (args) => {
  const { OpenStories } = useStory();
  const setStory = useSetRecoilState(SocialStoryState);
  const { setStorySeenBy } = useStorySeenBy();
  React.useEffect(() => {
    setStorySeenBy([
      {
        name: "wiaah",
        photoSrc: "/wiaah_logo.png",
      },
      {
        name: "seller",
        photoSrc: "/shop.jpeg",
      },
      {
        name: "buyer",
        photoSrc: "/shop-2.png",
      },
      {
        name: "wiaah",
        photoSrc: "/wiaah_logo.png",
      },
    ]);
    setStory({
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "image",
      storyViews: 12300,
      storySrc: "/verticalImage.jpg",
      user: PostCardPlaceHolder.profileInfo,
      id: "1",
    });
  }, []);

  return (
    <>
      <Button onClick={OpenStories}>open</Button>
      <SocialStoryModal {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
