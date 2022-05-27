import { storybookSectionsTitle, MyWishListSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "MyWishListSection",
  component: MyWishListSection,
} as ComponentMeta<typeof MyWishListSection>;

export const Default = () => <MyWishListSection />;
