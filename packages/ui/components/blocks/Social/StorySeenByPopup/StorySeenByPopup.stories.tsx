import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StorySeenByPopup } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import { useStorySeenBy } from "ui/Hooks";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { PostCardPlaceHolder } from "ui/placeholder";
import { StorySeenByState } from "ui/state";

export default {
  title: "UI/blocks/Social/StorySeenByPopup",
  component: StorySeenByPopup,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof StorySeenByPopup>;

const Template: ComponentStory<typeof StorySeenByPopup> = (args) => {
  const { OpenStorySeenBy, setStorySeenBy } = useStorySeenBy();
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
  }, []);
  return (
    <>
      <Button onClick={OpenStorySeenBy}>open</Button>
      <StorySeenByPopup {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
