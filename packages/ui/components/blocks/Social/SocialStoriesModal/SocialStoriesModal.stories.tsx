import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialStoriesModal } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import { useStory, useStorySeenBy } from "ui/Hooks";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { PostCardPlaceHolder } from "ui/placeholder";
import { SocialStoryState } from "ui/state";
export default {
  title: "UI/blocks/Social/SocialStoriesModal",
  component: SocialStoriesModal,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SocialStoriesModal>;

const Template: ComponentStory<typeof SocialStoriesModal> = (args) => {
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
      <SocialStoriesModal {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
