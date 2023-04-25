import React from "react";
import {
  ChatRoom,
  Drawer,
  DrawerProps,
  DrawerContent,
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
    <Drawer {...rest} onOpen={onOpen} onClose={onClose} position="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <ChatRoom roomId={roomId} />
      </DrawerContent>
    </Drawer>
  );
};
