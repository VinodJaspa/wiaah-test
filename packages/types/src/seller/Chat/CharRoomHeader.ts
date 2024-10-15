export interface ChatRoomHeaderData {
  thumbnail: string;
  lastActive: string;
  activeStatus: ActiveStatus;
  id: string;
  userId: string;
  name: string;
  verified: boolean;
}

export enum ActiveStatus {
  Active = "active",
  DoNotDisturb = "doNotDisturb",
  Idle = "idle",
  InActive = "inActive",
}
