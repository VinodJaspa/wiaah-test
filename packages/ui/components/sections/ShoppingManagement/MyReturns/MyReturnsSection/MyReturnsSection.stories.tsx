import { storybookSectionsTitle, MyReturnsSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "MyReturnsSection",
  component: MyReturnsSection,
} as ComponentMeta<typeof MyReturnsSection>;

export const Default = () => <MyReturnsSection />;
