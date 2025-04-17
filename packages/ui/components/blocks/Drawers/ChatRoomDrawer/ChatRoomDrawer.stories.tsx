import { storybookDrawersTitle } from "utils";
import { Meta } from "@storybook/react";
import { ChatRoomDrawer, Button } from "@UI";
import { useModalDisclouser } from "hooks";

export default {
  title: "UI / Blocks / drawers /ChatRoomDrawer",
  component: ChatRoomDrawer,
} as Meta<typeof ChatRoomDrawer>;

export const Default = () => {
  const { handleClose, handleOpen, isOpen } = useModalDisclouser();
  return (
    <>
      <Button onClick={() => handleOpen()}>open</Button>
      <ChatRoomDrawer
        onOpen={handleOpen}
        isOpen={isOpen}
        onClose={handleClose}
        roomId="134"
      />
    </>
  );
};
