import { NotificationData } from "types";
import { NotificationsPH } from "ui";

export const getNotifications = async (): Promise<NotificationData[]> => {
  return NotificationsPH;
};
