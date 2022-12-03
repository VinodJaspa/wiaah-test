import { ChatMessageType, ChatRoomHeaderData } from "types";

export const ChatMessagesPH: ChatMessageType[] = [
  {
    id: "13654",
    sendDate: Date.now(),
    userPhoto: "/place-2.jpg",
    username: "user",
    messageAttachments: [],
    messageContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
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
        type: "video",
      },
    ],
    messageContent: "fine, how about you",
    userPhoto: "/wiaah_logo.png",
  },
  {
    id: "123",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "1",
        type: "story",
      },
    ],
    messageContent: "all good",
    userPhoto: "/shop.jpeg",
  },
  {
    id: "465",
    sendDate: Date.now(),
    username: "Wiaah",
    messageAttachments: [
      {
        src: "2",
        type: "story",
      },
    ],
    messageContent: "fine, how about you",
    userPhoto: "/wiaah_logo.png",
  },
];

export const ChatRoomHeaderDataPH: ChatRoomHeaderData = {
  onlineMembers: 5,
  roomId: "1456",
  roomImage: "/shop.jpeg",
  roomMembers: 12,
  roomName: "Wiaah",
};
