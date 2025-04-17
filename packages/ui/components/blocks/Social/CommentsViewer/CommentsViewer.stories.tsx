import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CommentsViewer } from "@UI";
import { PostCardPlaceHolder } from "placeholder";

export default {
  title: "UI/blocks/Social/CommentsViewer",
  component: CommentsViewer,
} as Meta<typeof CommentsViewer>;

export const Default = {
  args: {
    comments: PostCardPlaceHolder.postInfo.comments,
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex min-h-screen w-full items-center justify-center bg-slate-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};
