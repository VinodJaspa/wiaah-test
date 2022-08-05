import { randomNum, storybookOtherServicesDataDisplayTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BookedServicesCostDetails } from "./BookedServicesCostDetails";

export default {
  title: storybookOtherServicesDataDisplayTitle + "BookedServicesCostDetails",
  component: BookedServicesCostDetails,
} as ComponentMeta<typeof BookedServicesCostDetails>;

const template: ComponentStory<typeof BookedServicesCostDetails> = (args) => (
  <BookedServicesCostDetails {...args} />
);

export const Default = template.bind({});
Default.args = {
  title: "rooms",
  vat: randomNum(15),
};
