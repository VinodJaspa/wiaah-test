import {
  storybookDataDisplayBlocksTitle,
  UserProfile,
  usersProfilesPlaceHolder,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /UserProfile",
  component: UserProfile,
} as Meta<typeof UserProfile>;

export const Default = () => <UserProfile user={usersProfilesPlaceHolder[0]} />;
