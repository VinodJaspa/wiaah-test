import { storybookSectionsTitle, MyReturnsSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "MyReturnsSection",
  component: MyReturnsSection,
} as ComponentMeta<typeof MyReturnsSection>;

export const Default = () => <MyReturnsSection />;
