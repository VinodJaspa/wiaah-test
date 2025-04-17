import { storybookSectionsTitle, MyWishListSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / MyWishListSection",
  component: MyWishListSection,
} as Meta<typeof MyWishListSection>;

export const Default = () => <MyWishListSection />;
