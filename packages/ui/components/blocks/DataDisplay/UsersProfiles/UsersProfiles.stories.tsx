import React from "react";
import { ComponentMeta } from "@storybook/react";
import {
  UsersProfiles,
  storybookDataDisplayBlocksTitle,
  usersProfilesPlaceHolder,
} from "@UI";
function convertUserProfiles(users) {
  return users.map((user) => ({
    id: user.id, // Copy the 'id' field directly
    name: user.name, // Copy the 'name' field directly
    userPhotoSrc: user.photo, // Convert 'photo' to 'userPhotoSrc'
    profession: user.profession, // Copy 'profession' directly
  }));
}
const convertedUserProfiles = convertUserProfiles(usersProfilesPlaceHolder);
export default {
  title: storybookDataDisplayBlocksTitle + "UsersProfiles",
  component: UsersProfiles,
} as ComponentMeta<typeof UsersProfiles>;

export const Default = () => <UsersProfiles users={convertedUserProfiles} />;
