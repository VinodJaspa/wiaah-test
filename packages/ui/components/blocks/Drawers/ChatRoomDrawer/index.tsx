import React from "react";
import {
  ChatRoom,
  Drawer,
  DrawerProps,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@UI";

export interface ChatRoomDrawerProps extends DrawerProps {
  roomId: string;
}

export const ChatRoomDrawer: React.FC<ChatRoomDrawerProps> = ({
  roomId,
  onClose,
  onOpen,
  ...rest
}) => {
  return (
    <Drawer onOpen={onOpen} {...rest} onClose={onClose} position="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader></DrawerHeader>
        <ChatRoom roomId={roomId} />
      </DrawerContent>
    </Drawer>
  );
};
