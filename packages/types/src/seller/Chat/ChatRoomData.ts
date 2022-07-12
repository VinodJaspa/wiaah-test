import { ChatRoomHeaderData } from "../..";
import { ChatMessageType } from "./ChatMessages";

export interface ChatRoomData {
  roomHeaderData: ChatRoomHeaderData;
  roomMessages: ChatMessageType[];
}
