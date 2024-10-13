import { ActiveStatus, MessageAttachmentType } from "@features/API";
import { ChatRoomHeaderData } from "types";
import { ChatMessageType } from "..";

export const ChatMessagesPH: ChatMessageType[] = [
  {
    id: "1",
    userId: "user1",
    username: "John Doe",
    userPhoto: "https://example.com/photo1.jpg",
    sendDate: Date.now(),
    messageContent: "Here is an image",
    messageAttachments: [
      {
        type: MessageAttachmentType.Image,
        src: "https://example.com/image1.jpg",
      },
    ],

    seen: false,
    showUser: true,
  },
  {
    id: "2",
    userId: "user2",
    username: "Jane Smith",
    userPhoto: "https://example.com/photo2.jpg",
    sendDate: Date.now(),
    messageContent: "Check out this video",
    messageAttachments: [
      {
        type: MessageAttachmentType.VideoMessage,
        src: "https://example.com/video1.mp4",
      },
    ],
    seen: false,
    showUser: true,
  },
  {
    id: "3",
    userId: "user3",
    username: "Alice Johnson",
    userPhoto: "https://example.com/photo3.jpg",
    sendDate: Date.now(),
    messageContent: "Listen to this audio",
    messageAttachments: [
      {
        type: MessageAttachmentType.VoiceMessage,
        src: "https://example.com/audio1.mp3",
      },
    ],
    seen: true,
    showUser: false,
  },
  {
    id: "4",
    userId: "user4",
    username: "Bob Brown",
    userPhoto: "https://example.com/photo4.jpg",
    sendDate: Date.now(),
    messageContent: "Here’s a story to share",
    messageAttachments: [
      {
        type: MessageAttachmentType.Story,
        src: "https://example.com/story1.html",
      },
    ],
    seen: true,
    showUser: false,
  },
];

export const ChatRoomHeaderDataPH = {
  thumbnail: "https://example.com/thumbnail.jpg",
  lastActive: `${new Date().toISOString()}`,
  activeStatus: ActiveStatus.Active, // Placeholder using one of the enum values
  id: "123456",
  userId: "user123",
  name: "John Doe",
  verified: true,
};
