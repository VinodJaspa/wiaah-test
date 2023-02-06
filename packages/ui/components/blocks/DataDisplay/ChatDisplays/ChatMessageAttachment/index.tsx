import React from "react";
import {
  AudioMessageAttachment,
  SocialStoryContentViewer,
  useGetStoryQuery,
} from "@UI";
import { MessageAttachmentType, StoryType } from "@features/API";

export interface ChatMessageAttachmentType {
  type: MessageAttachmentType;
  src: string;
}

export interface ChatMessageAttachmentProps {
  attachment: ChatMessageAttachmentType;
}

export const ChatMessageAttachment: React.FC<ChatMessageAttachmentProps> = ({
  attachment,
}) => {
  if (!attachment) return null;
  const { src, type } = attachment;

  switch (type) {
    case MessageAttachmentType.Image:
      return <img className="rounded-xl" src={src} />;

    case MessageAttachmentType.VideoMessage:
      return <video controls src={src} />;

    case MessageAttachmentType.VoiceMessage:
      return <AudioMessageAttachment src={src} />;
    case MessageAttachmentType.Story:
      return <UserStoryDisplay id={src} />;
    default:
      return null;
  }
};

export interface UserStoryDisplayProps {
  id: string;
}

export const UserStoryDisplay: React.FC<UserStoryDisplayProps> = ({ id }) => {
  const { data } = useGetStoryQuery(id);

  return (
    <SocialStoryContentViewer
      id={id}
      type={data?.type || StoryType.Base}
      src={data?.attachements?.src}
      text={data?.content || ""}
    />
  );
};
