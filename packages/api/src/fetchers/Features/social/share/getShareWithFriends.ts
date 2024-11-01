import { ShareWithFriendData } from "types";

export const getShareWithFriends = async (): Promise<ShareWithFriendData[]> => {
  return [
    { id: "1", name: "wiaah", photo: "/wiaah_logo.png" },
    { id: "2", name: "seller", photo: "/shop.jpeg" },
    { id: "3", name: "buyer", photo: "/shop-2.jpeg" },
    { id: "4", name: "wiaah", photo: "/wiaah_logo.png" },
    { id: "5", name: "seller", photo: "/shop.jpeg" },
    { id: "6", name: "buyer", photo: "/shop-2.jpeg" },
    { id: "7", name: "wiaah", photo: "/wiaah_logo.png" },
    { id: "8", name: "seller", photo: "/shop.jpeg" },
    { id: "9", name: "buyer", photo: "/shop-2.jpeg" },
  ];
};
