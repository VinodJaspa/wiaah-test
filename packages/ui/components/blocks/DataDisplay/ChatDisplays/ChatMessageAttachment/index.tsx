import { Image } from "@chakra-ui/react";
import React from "react";
import { ChatMessageAttachmentType } from "types";
import { AudioMessageAttachment } from "ui";

export interface ChatMessageAttachmentProps {
  attachment: ChatMessageAttachmentType;
}

export const ChatMessageAttachment: React.FC<ChatMessageAttachmentProps> = ({
  attachment,
}) => {
  if (!attachment) return null;
  const { src, type } = attachment;

  switch (type) {
    case "image":
      return <Image rounded={"xl"} src={src} />;

    case "video":
      return <video controls src={src} />;

    case "audio":
      return <AudioMessageAttachment src={src} />;
    default:
      return null;
  }
};
