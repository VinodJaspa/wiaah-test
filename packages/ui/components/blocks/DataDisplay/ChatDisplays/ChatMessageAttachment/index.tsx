import React from "react";
import { ChatMessageAttachmentType } from "types";
import { AudioMessageAttachment, SocialStoryContentViewer } from "@UI";

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
      return <img className="rounded-xl" src={src} />;

    case "video":
      return <video controls src={src} />;

    case "audio":
      return <AudioMessageAttachment src={src} />;
    case "story":
      return <UserStoryDisplay id={src} />;
    default:
      return null;
  }
};

export interface UserStoryDisplayProps {
  id: string;
}

export const UserStoryDisplay: React.FC<UserStoryDisplayProps> = ({ id }) => {
  return (
    <SocialStoryContentViewer
      id={id}
      storyType={id == "1" ? "image" : "video"}
      storySrc={id == "1" ? "/verticalImage.jpg" : "video.mp4"}
      storyText="story content"
    />
  );
};
