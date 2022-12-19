import { NewsfeedPostDetailsPopup, Button, useNewsFeedPostPopup } from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "NewsFeedPostDetailsModal",
  component: NewsfeedPostDetailsPopup,
} as ComponentMeta<typeof NewsfeedPostDetailsPopup>;

export const Default = () => {
  const { setCurrentPost } = useNewsFeedPostPopup();
  return (
    <>
      <Button onClick={() => setCurrentPost("15")}>open</Button>
      <NewsfeedPostDetailsPopup />
    </>
  );
};
