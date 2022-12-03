export interface NotificationData {
  id: string;
  by: NotificationUserData;
  type: NotificationType;
  message: string;
  creationDate: string;
  attachment?: NotificationAttachment;
}

export type NotificationAttachment = {
  src: string;
};

export type NotificationType = "info" | "follow-request" | "follow-notify";

export type NotificationUserData = {
  id: string;
  name: string;
  thumbnail: string;
};
