import {
  storybookDataDisplayBlocksTitle,
  UserProfile,
  usersProfilesPlaceHolder,
} from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataDisplayBlocksTitle + "UserProfile",
  component: UserProfile,
} as ComponentMeta<typeof UserProfile>;

export const Default = () => <UserProfile user={usersProfilesPlaceHolder[0]} />;
