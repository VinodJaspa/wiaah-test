import { useQuery } from "react-query";
import { getChatRoomData } from "api";

export const useGetChatRoomData = (roomId: string) => {
  return useQuery(
    ["ChatRoomData", { roomId }],
    ({ queryKey }) => {
      // @ts-ignore
      const roomId = queryKey[1].roomId;

      return getChatRoomData(roomId);
    },
    {
      enabled: !!roomId,
    }
  );
};
