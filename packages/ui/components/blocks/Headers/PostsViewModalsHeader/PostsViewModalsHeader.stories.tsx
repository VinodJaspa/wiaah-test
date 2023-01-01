import { storybookHeadersTitle } from "utils";
import { PostsViewModalsHeader } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookHeadersTitle + "PostsViewModalsHeader",
  component: PostsViewModalsHeader,
} as ComponentMeta<typeof PostsViewModalsHeader>;

export const Default = () => {
  return <PostsViewModalsHeader />;
};
