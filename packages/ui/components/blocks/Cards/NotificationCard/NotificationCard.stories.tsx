import { NotificationsPH, storybookCardsTitle, NotifiactionCard } from "@UI";
import { ComponentMeta } from "@storybook/react";
import { NotificationType } from "@features/API";

export default {
  title: storybookCardsTitle + "NotificationCard",
  component: NotifiactionCard,
} as ComponentMeta<typeof NotifiactionCard>;

const NotificationPlaceholder = {
  username: "john_doe",
  count: 1,
  orderId: "ORD12345",
  thumbnail: "https://via.placeholder.com/150", // Placeholder image URL
  createdAt: new Date().toISOString(),
  seen: false,
  children: null, // No child elements by default
};

export const infoNotifaction = () => (
  <NotifiactionCard type={NotificationType.Info} {...NotificationPlaceholder} />
);

export const followNotification = () => (
  <NotifiactionCard
    type={NotificationType.Follow}
    {...NotificationPlaceholder}
  />
);

export const followRequestNotification = () => (
  <NotifiactionCard
    type={NotificationType.FollowRequest}
    {...NotificationPlaceholder}
  />
);
