import { Meta, StoryFn } from "@storybook/react";
import { Carousel } from "@UI";

const images = [
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1611918126831-0a8352d6196f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1613339027986-b94d85708995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1613967193490-1d17b930c1a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1610552050890-fe99536c2615?ixlib=rb-1.2.1&auto=format&fit=crop&w=1207&q=80",
  },
  {
    title: "nature",
    itemSrc:
      "https://images.unsplash.com/photo-1622899505135-694e8ccffce8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  },
];

const ImagesVideos = [
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1611918126831-0a8352d6196f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1613339027986-b94d85708995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1613967193490-1d17b930c1a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "nature",
    type: "image",
    itemSrc:
      "https://images.unsplash.com/photo-1610552050890-fe99536c2615?ixlib=rb-1.2.1&auto=format&fit=crop&w=1207&q=80",
  },
  {
    title: "nature",
    type: "video",
    itemSrc: "apps/market/public/video.mp4", // Ensure correct relative path
  },
];

export default {
  title: "UI/blocks/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  fullscreen: true,
} as Meta<typeof Carousel>;

export const Default = {
  args: {
    children: images.map((img) => (
      <img key={img.itemSrc} src={img.itemSrc} alt={img.title} />
    )),
  },

  decorators: [
    (Story, { args }) => (
      <div className="h-[40rem] bg-gray-300 p-4">
        <Story {...args} />
      </div>
    ),
  ],
};

export const WithMoreViews = {
  args: {
    children: images.map((img) => (
      <img key={img.itemSrc} src={img.itemSrc} alt={img.title} />
    )),
    componentsPerView: 2,
  },

  decorators: [
    (Story, { args }) => (
      <div className="h-[40rem] bg-gray-300 p-4">
        <Story {...args} />
      </div>
    ),
  ],
};

export const WithoutControls = {
  args: {
    children: images.map((img) => (
      <img key={img.itemSrc} src={img.itemSrc} alt={img.title} />
    )),
    controls: false,
    auto: {
      enable: true,
      speedInMs: 3000,
    },
  },

  decorators: [
    (Story, { args }) => (
      <div className="h-[40rem] bg-gray-300 p-4">
        <Story {...args} />
      </div>
    ),
  ],
};

export const AutoMoving = {
  args: {
    children: images.map((img) => (
      <img key={img.itemSrc} src={img.itemSrc} alt={img.title} />
    )),
    auto: {
      enable: true,
      speedInMs: 3000,
    },
  },

  decorators: [
    (Story, { args }) => (
      <div className="h-[40rem] bg-gray-300 p-4">
        <Story {...args} />
      </div>
    ),
  ],
};

export const WithVideo = {
  args: {
    children: ImagesVideos.map(({ itemSrc, type }) =>
      type === "image" ? (
        <img key={itemSrc} src={itemSrc} alt="Nature" />
      ) : type === "video" ? (
        <video key={itemSrc} src={itemSrc} controls />
      ) : (
        <div key={itemSrc}></div>
      )
    ),
    auto: {
      enable: true,
      speedInMs: 3000,
    },
  },

  decorators: [
    (Story, { args }) => (
      <div className="h-[40rem] bg-gray-300 p-4">
        <Story {...args} />
      </div>
    ),
  ],
};
