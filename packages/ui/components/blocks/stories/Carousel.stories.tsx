import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Carousel } from "../";

const images = [
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1611918126831-0a8352d6196f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1613339027986-b94d85708995?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1613967193490-1d17b930c1a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1610552050890-fe99536c2615?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1207&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1622899505135-694e8ccffce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
];

const ImagesVideos = [
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1611918126831-0a8352d6196f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1613339027986-b94d85708995?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1613967193490-1d17b930c1a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1610552050890-fe99536c2615?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1207&q=80",
  },
  {
    title: "nature",
    type: "video",
    itemSrc: "../",
  },
];

export default {
  title: "UI/component/blocks/Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Templete: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Default = Templete.bind({});
Default.args = {
  components: images.map((img, i) => {
    return {
      title: "test",
      Component: <img src={img.itemSrc} />,
    };
  }),
};
Default.decorators = [
  (Story, { args }) => (
    <div className="h-[40rem] bg-gray-300 p-4">
      <Story {...args} />
    </div>
  ),
];
export const WithMoreViews = Templete.bind({});
WithMoreViews.args = {
  components: images.map((img, i) => {
    return {
      Component: <img src={img.itemSrc} />,
    };
  }),
  componentsPerView: 2,
};
WithMoreViews.decorators = [
  (Story, { args }) => (
    <div className="h-[40rem] bg-gray-300 p-4">
      <Story {...args} />
    </div>
  ),
];
export const WithoutControls = Templete.bind({});
WithoutControls.args = {
  components: images.map((img, i) => {
    return {
      Component: <img src={img.itemSrc} />,
    };
  }),
  controls: false,
  auto: {
    enable: true,
    speedInMs: 3000,
  },
};
WithoutControls.decorators = [
  (Story, { args }) => (
    <div className="h-[40rem] bg-gray-300 p-4">
      <Story {...args} />
    </div>
  ),
];

export const AutoMoving = Templete.bind({});
AutoMoving.args = {
  components: images.map((img, i) => {
    return {
      Component: <img src={img.itemSrc} />,
    };
  }),
  auto: {
    enable: true,
    speedInMs: 3000,
  },
};
AutoMoving.decorators = [
  (Story, { args }) => (
    <div className="h-[40rem] bg-gray-300 p-4">
      <Story {...args} />
    </div>
  ),
];

export const WithVideo = Templete.bind({});
WithVideo.args = {
  components: ImagesVideos.map(({ itemSrc, title, type: itemType }, i) => {
    return {
      Component:
        itemType == "image" ? (
          <img src={itemSrc} />
        ) : itemType == "video" ? (
          <video src={`${__dirname}/apps/market/public/video.mp4`} />
        ) : (
          <div></div>
        ),
    };
  }),
  auto: {
    enable: true,
    speedInMs: 3000,
  },
};
WithVideo.decorators = [
  (Story, { args }) => (
    <div className="h-[40rem] bg-gray-300 p-4">
      <Story {...args} />
    </div>
  ),
];
