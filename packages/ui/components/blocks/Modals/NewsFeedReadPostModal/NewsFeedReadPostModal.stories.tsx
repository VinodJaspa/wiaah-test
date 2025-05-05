import { NewsfeedPostDetailsPopup, Button, useNewsFeedPostPopup } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /NewsFeedPostDetailsModal",
  component: NewsfeedPostDetailsPopup,
} as Meta<typeof NewsfeedPostDetailsPopup>;

export const Default = () => {
  const { setCurrentPost } = useNewsFeedPostPopup();
  return (
    <>
      <Button onClick={() => setCurrentPost("15")}>open</Button>
      <NewsfeedPostDetailsPopup />
    </>
  );
};
