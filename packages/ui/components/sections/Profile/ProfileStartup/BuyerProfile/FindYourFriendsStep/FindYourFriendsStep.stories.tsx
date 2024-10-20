import { storybookSectionsTitle, FindYourFriendsStep } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "FindYourFriendsStep",
} as ComponentMeta<typeof FindYourFriendsStep>;

export const Default = () => <FindYourFriendsStep onSuccess={() => { }} />;
