import React from "react";
import { ComponentMeta } from "@storybook/react";
import {
  UsersProfiles,
  storybookDataDisplayBlocksTitle,
  usersProfilesPlaceHolder,
} from "ui";
export default {
  title: storybookDataDisplayBlocksTitle + "UsersProfiles",
  component: UsersProfiles,
} as ComponentMeta<typeof UsersProfiles>;

export const Default = () => <UsersProfiles users={usersProfilesPlaceHolder} />;
