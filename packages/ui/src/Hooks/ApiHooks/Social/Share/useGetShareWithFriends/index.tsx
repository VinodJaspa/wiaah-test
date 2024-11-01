import { useQuery } from "react-query";
import { ShareWithFriendData } from "types";

// Custom hook
export const useGetShareWithFriends = (searchKey: string) => {
  return useQuery(
    ["ShareWithFriends", searchKey],
    () => getShareWithFriends(searchKey), // Pass searchKey to the function
    {
      enabled: Boolean(searchKey), // Ensures the query only runs if searchKey is valid
    },
  );
};

// Function to fetch data
export const getShareWithFriends = async (
  searchKey: string,
): Promise<ShareWithFriendData[]> => {
  const data = [
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

  // Filter data based on searchKey if it exists
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchKey.toLowerCase()),
  );
};
