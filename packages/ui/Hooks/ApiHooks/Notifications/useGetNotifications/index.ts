import { getNotifications } from "api";
import { useQuery } from "react-query";

export const useGetNotifications = () => {
  return useQuery("myNotifications", () => {
    return getNotifications();
  });
};
