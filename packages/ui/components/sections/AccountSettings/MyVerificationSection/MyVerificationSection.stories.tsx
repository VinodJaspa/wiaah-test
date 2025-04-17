import { MyVerificationSection } from "./MyVerificationSection";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSectionsTitle } from "utils";

export default {
  title: "UI / sections / MyVerificationSection",
  component: MyVerificationSection,
} as Meta<typeof MyVerificationSection>;

export const Default = {
  args: {},
};
