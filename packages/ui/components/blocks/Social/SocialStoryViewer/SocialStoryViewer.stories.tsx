import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialStoryViewer } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
import { PostCardPlaceHolder } placeholder;
import { useSetRecoilState } from "recoil";
import { SocialStoriesState } from "@src/state";
import { useStorySeenBy } from "../../../../Hooks";
export default {
  title: "UI/blocks/Social/SocialStoryViewer",
  component: SocialStoryViewer,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SocialStoryViewer>;

const Template: ComponentStory<typeof SocialStoryViewer> = ({ ...args }) => {
  const setStories = useSetRecoilState(SocialStoriesState);
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
  }, []);
  setStories([
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "text",
      storyViews: 1500,
      storyText: "hello, my first story",
      id: "1",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "image",
      storyViews: 1900,
      storySrc: "/shop-2.jpeg",
      id: "2",
      storyText: "image story with text",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "image",
      storyViews: 12300,
      storySrc: "/verticalImage.jpg",
      id: "3",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "video",
      storyViews: 500,
      storySrc: "/video.mp4",
      storyText: "video story with Text",
      id: "4",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "video",
      storyViews: 1300000,
      storySrc: "/verticalVideo.mp4",
      id: "5",
    },
  ]);
  return (
    <div className="w-full bg-white">
      <SocialStoryViewer {...args} />
    </div>
  );
};

export const TextStory = Template.bind({});
TextStory.args = {
  stories: [
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "text",
      storyViews: 1500,
      storyText: "hello, my first story",
      id: "1",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "image",
      storyViews: 1900,
      storySrc: "/shop-2.jpeg",
      id: "2",
      storyText: "image story with text",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "image",
      storyViews: 12300,
      storySrc: "/verticalImage.jpg",
      id: "3",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "video",
      storyViews: 500,
      storySrc: "/video.mp4",
      storyText: "video story with Text",
      id: "4",
    },
    {
      storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
      storyType: "video",
      storyViews: 1300000,
      storySrc: "/verticalVideo.mp4",
      id: "5",
    },
  ],
  user: PostCardPlaceHolder.profileInfo,
};

// export const ImageStory = Template.bind({});
// ImageStory.args = {
//   story: {
//     storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
//     storyType: "image",
//     storyViews: 1900,
//     storySrc: "/shop-2.jpeg",
//   },
//   user: PostCardPlaceHolder.profileInfo,
// };
// export const VerticalImageStory = Template.bind({});
// VerticalImageStory.args = {
//   story: {
//     storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
//     storyType: "image",
//     storyViews: 12300,
//     storySrc: "/verticalImage.jpg",
//   },
//   user: PostCardPlaceHolder.profileInfo,
// };
// export const VideoStory = Template.bind({});
// VideoStory.args = {
//   story: {
//     storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
//     storyType: "video",
//     storyViews: 500,
//     storySrc: "/video.mp4",
//   },
//   user: PostCardPlaceHolder.profileInfo,
// };
// export const VerticalVideoStory = Template.bind({});
// VerticalVideoStory.args = {
//   story: {
//     storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
//     storyType: "video",
//     storyViews: 1300000,
//     storySrc: "/verticalVideo.mp4",
//   },
//   user: PostCardPlaceHolder.profileInfo,
// };
