import { storybookSectionsTitle, ShopInformationStep } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "ShopInformationSection",
  component: ShopInformationStep,
} as ComponentMeta<typeof ShopInformationStep>;

export const Default = () => <ShopInformationStep />;
