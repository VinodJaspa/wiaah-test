import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { StorySeenByPopup } from "@UI";
import { useStorySeenBy } from "@src/Hooks";
import { Button } from "@chakra-ui/react";

export default {
  title: "UI/blocks/Social/StorySeenByPopup",
  component: StorySeenByPopup,
} as Meta<typeof StorySeenByPopup>;

const Template: StoryFn<typeof StorySeenByPopup> = (args) => {
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

export const Default = {
  render: Template,
  args: {},
};
