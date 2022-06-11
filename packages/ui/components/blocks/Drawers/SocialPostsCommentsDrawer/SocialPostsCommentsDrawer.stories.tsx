import { ComponentMeta } from "@storybook/react";
import { randomNum, storybookDrawersTitle } from "utils";
import { SocialPostsCommentsDrawer, Button, usePostsCommentsDrawer } from "ui";

export default {
  title: storybookDrawersTitle + "SocialPostsCommentsDrawer",
  component: SocialPostsCommentsDrawer,
} as ComponentMeta<typeof SocialPostsCommentsDrawer>;

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
