import { useQuery } from "react-query";
import { getWishlistItemsData } from "api";

export const useGetWishlistItemsData = () => {
  return useQuery("getWishlistItemsData", getWishlistItemsData);
};
