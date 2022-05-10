import { ChatMessageType, ChatRoomHeaderData } from "types";

export const ChatMessagesPH: ChatMessageType[] = [
  {
    id: "159",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "/shop-2.jpeg",
        type: "image",
      },
    ],
    messageContent:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis omnis voluptatem perferendis fuga cupiditate odit maiores sed nostrum. Deleniti earum tempora nisi eaque praesentium repellat quod sapiente molestiae quidem ullam.",
    userPhoto: "/wiaah_logo.png",
  },
  {
    id: "465",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "/video.mp4",
        type: "audio",
      },
    ],
    messageContent: "hi",
    userPhoto: "/wiaah_logo.png",
  },
  {
    id: "123",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [],
    messageContent: "hi, how are you?",
    userPhoto: "/shop.jpeg",
  },
  {
    id: "465",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "/video.mp4",
        type: "audio",
      },
    ],
    messageContent: "fine, how about you",
    userPhoto: "/wiaah_logo.png",
  },
  {
    id: "123",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [],
    messageContent: "all good",
    userPhoto: "/shop.jpeg",
  },
];

export const ChatRoomHeaderDataPH: ChatRoomHeaderData = {
  onlineMembers: 5,
  roomId: "1456",
  roomImage: "/shop.jpeg",
  roomMembers: 12,
  roomName: "Wiaah",
};
