export interface ChatUserData {
  id: string;
  name: string;
  profilePhoto: string;
  status: ChatUserStatus;
  typing: boolean;
  unSeenMsgs: number;
  lastMsgSentTime?: string;
  lastMsg?: string;
}
export type ChatUserStatus = "online" | "offline" | "idle";
