import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ShadCnButton, SocialStoryModal } from "@UI";
import { useStory, useStorySeenBy } from "@src/Hooks";
import { useSetRecoilState } from "recoil";
import { PostCardPlaceHolder } from "placeholder";
import { SocialStoryState } from "@src/state";
export default {
  title: "UI/blocks/Social/SocialStoriesModal",
  component: SocialStoryModal,
} as Meta<typeof SocialStoryModal>;

const Template: StoryFn<typeof SocialStoryModal> = (args) => {
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
<ShadCnButton onClick={OpenStories} className="bg-primary text-white hover:bg-primary/80 rounded-md transition-colors duration-200">
  open
</ShadCnButton>

      <SocialStoryModal {...args} />
    </>
  );
};

export const Default = {
  render: Template,
  args: {},
};
