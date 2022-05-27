import { storybookSectionsTitle, AddProfilePictureStep } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AddProfilePictureStep",
} as ComponentMeta<typeof AddProfilePictureStep>;

export const Default = () => <AddProfilePictureStep />;
