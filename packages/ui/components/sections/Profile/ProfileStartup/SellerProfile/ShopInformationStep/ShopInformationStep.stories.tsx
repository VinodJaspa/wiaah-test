import { ComponentMeta } from "@storybook/react";
import { storybookSectionsTitle } from "utils";
import { ShopInformationStep } from "./index";

export default {
  title: storybookSectionsTitle + "ShopInformationSection",
  component: ShopInformationStep,
} as ComponentMeta<typeof ShopInformationStep>;

export const Default = () => <ShopInformationStep />;
