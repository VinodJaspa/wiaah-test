import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CommentsViewer } from "@UI";
import { PostCardPlaceHolder } from "placeholder";

import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/CommentsViewer",
  component: CommentsViewer,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof CommentsViewer>;

const Template: ComponentStory<typeof CommentsViewer> = (args) => (
  <CommentsViewer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comments: PostCardPlaceHolder.postInfo.comments,
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-slate-200">
        <Story {...args} />
      </section>
    );
  },
];
