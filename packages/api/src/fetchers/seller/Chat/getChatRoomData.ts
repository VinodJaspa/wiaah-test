import { ChatRoomData } from "types";
import { ChatMessagesPH, ChatRoomHeaderDataPH } from "ui";

export const getChatRoomData = async (
  roomId: string,
): Promise<ChatRoomData> => {
  return {
    roomHeaderData: ChatRoomHeaderDataPH,
    roomMessages: ChatMessagesPH,
  };
};
