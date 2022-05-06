import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerProps,
} from "@chakra-ui/react";
import React from "react";
import { ChatRoom } from "ui";
import { PostsViewModalsHeader } from "../../Headers";

export interface ChatRoomDrawerProps extends Omit<DrawerProps, "children"> {
  roomId: string;
}

export const ChatRoomDrawer: React.FC<ChatRoomDrawerProps> = ({
  roomId,
  onClose,
  ...rest
}) => {
  return (
    <Drawer onClose={onClose} placement="bottom" size={"full"} {...rest}>
      <DrawerContent p="0px">
        <DrawerBody px="0px">
          <ChatRoom roomId={roomId} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
