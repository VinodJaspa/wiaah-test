import { NotificationsPH, storybookCardsTitle, NotifiactionCard } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookCardsTitle + "NotificationCard",
  component: NotifiactionCard,
} as ComponentMeta<typeof NotifiactionCard>;

export const infoNotifaction = () => (
  <NotifiactionCard notificationDetails={NotificationsPH[0]} />
);

export const followNotification = () => (
  <NotifiactionCard notificationDetails={NotificationsPH[2]} />
);

export const followRequestNotification = () => (
  <NotifiactionCard notificationDetails={NotificationsPH[3]} />
);
