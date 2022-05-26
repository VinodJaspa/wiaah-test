import { storybookSectionsTitle, AddNewShippingMothed } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AddNewShippingMothedSection",
  component: AddNewShippingMothed,
} as ComponentMeta<typeof AddNewShippingMothed>;

export const Default = () => <AddNewShippingMothed />;
