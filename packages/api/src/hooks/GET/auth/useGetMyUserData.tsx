import { useQuery } from "react-query";

export function useGetMyUserData() {
  return useQuery("myuserdata", () => "hello");
}
