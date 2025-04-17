import { storybookHeadersTitle } from "utils";
import { PostsViewModalsHeader } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Headers /PostsViewModalsHeader",
  component: PostsViewModalsHeader,
} as Meta<typeof PostsViewModalsHeader>;

export const Default = () => {
  return <PostsViewModalsHeader />;
};
