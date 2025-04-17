import { storybookSectionsTitle, FindYourFriendsStep } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / FindYourFriendsStep",
} as Meta<typeof FindYourFriendsStep>;

export const Default = () => <FindYourFriendsStep onSuccess={() => {}} />;
