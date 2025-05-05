import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ShadCnButton, StorySeenByPopup } from "@UI";
import { useStorySeenBy } from "@src/Hooks";


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
    <ShadCnButton variant="default"onClick={OpenStorySeenBy}>open</ShadCnButton>

  
      <StorySeenByPopup {...args} />
    </>
  );
};

export const Default = {
  render: Template,
  args: {},
};
