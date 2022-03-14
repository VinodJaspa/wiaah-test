import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Carousel } from "../";
import { ComponentDetails } from "../Carousel";

const images = [
  {
    title: "nature",
    imageUrl:
      "https://images.unsplash.com/photo-1611918126831-0a8352d6196f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    imageUrl:
      "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
  {
    title: "nature",
    imageUrl:
      "https://images.unsplash.com/photo-1613339027986-b94d85708995?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    title: "nature",
    imageUrl:
      "https://images.unsplash.com/photo-1613967193490-1d17b930c1a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "nature",
    imageUrl:
      "https://images.unsplash.com/photo-1610552050890-fe99536c2615?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1207&q=80",
  },
  {
    title: "nature",
    imageUrl:
      "https://images.unsplash.com/photo-1622899505135-694e8ccffce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
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
      Component: <img src={img.imageUrl} />,
    };
  }),
  componentsPerView: 2,
};
Default.decorators = [
  (Story, { args }) => (
    <div className="h-[40rem] bg-gray-300 p-4">
      <Story {...args} />
    </div>
  ),
];
