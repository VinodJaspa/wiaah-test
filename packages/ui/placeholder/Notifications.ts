import { NotificationData } from "types";

export const NotificationsPH: NotificationData[] = [
  {
    id: "1",
    type: "info",
    by: {
      id: "5",
      name: "wiaah",
      thumbnail: "/wiaah_logo.png",
    },
    message:
      "mentioned you in a comment: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    attachment: {
      src: "/place-1.jpg",
    },
    creationDate: new Date(Date.UTC(2022, 4, 1)).toISOString(),
  },
  {
    id: "2",
    type: "info",
    by: {
      id: "6",
      name: "wiaah",
      thumbnail: "/wiaah_logo.png",
    },
    message:
      "liked you comment: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    attachment: {
      src: "/place-2.jpg",
    },
    creationDate: new Date(Date.UTC(2022, 4, 1)).toISOString(),
  },
  {
    id: "3",
    type: "follow-notify",
    by: {
      id: "4",
      name: "Seller",
      thumbnail: "/shop.jpeg",
    },
    message: "started following you.",
    creationDate: new Date(Date.UTC(2022, 4, 1)).toISOString(),
  },
  {
    id: "1r15",
    type: "follow-request",
    by: {
      id: "5",
      name: "wiaah",
      thumbnail: "/shop-3.jpeg",
    },
    message: "want to start following you.",
    attachment: {
      src: "/place-1.jpg",
    },
    creationDate: new Date(Date.UTC(2022, 4, 1)).toISOString(),
  },
  {
    id: "1",
    type: "info",
    by: {
      id: "5",
      name: "wiaah",
      thumbnail: "/wiaah_logo.png",
    },
    message:
      "mentioned you in a comment: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    attachment: {
      src: "/place-1.jpg",
    },
    creationDate: new Date(Date.UTC(2022, 4, 1)).toISOString(),
  },
];
