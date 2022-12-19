import { storybookSectionsTitle, AddNewShippingMothed } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AddNewShippingMothedSection",
  component: AddNewShippingMothed,
} as ComponentMeta<typeof AddNewShippingMothed>;

export const Default = () => <AddNewShippingMothed />;
