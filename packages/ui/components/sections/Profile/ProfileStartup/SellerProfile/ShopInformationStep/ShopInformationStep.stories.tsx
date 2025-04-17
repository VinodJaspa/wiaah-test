import { Meta } from "@storybook/react";
import { storybookSectionsTitle } from "utils";
import { ShopInformationStep } from "./index";

export default {
  title: "UI / sections / ShopInformationSection",
  component: ShopInformationStep,
} as Meta<typeof ShopInformationStep>;

export const Default = () => <ShopInformationStep onSuccess={() => {}} />;
