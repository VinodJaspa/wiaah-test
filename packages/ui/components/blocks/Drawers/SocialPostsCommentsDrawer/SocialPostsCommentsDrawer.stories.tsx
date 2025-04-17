import { Meta } from "@storybook/react";
import { randomNum, storybookDrawersTitle } from "utils";
import { SocialPostsCommentsDrawer, Button, usePostsCommentsDrawer } from "@UI";

export default {
  title: "UI / Blocks / drawers /SocialPostsCommentsDrawer",
  component: SocialPostsCommentsDrawer,
} as Meta<typeof SocialPostsCommentsDrawer>;

export const Default = () => {
  const { setCommentsPostId } = usePostsCommentsDrawer();
  return (
    <>
      <Button onClick={() => setCommentsPostId(`${randomNum(10)}`)}>
        open
      </Button>
      <SocialPostsCommentsDrawer />
    </>
  );
};
