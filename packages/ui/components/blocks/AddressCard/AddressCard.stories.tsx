import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AddressCard } from "@UI";

export default {
  title: "UI/blocks/AddressCard",
  component: AddressCard,
} as ComponentMeta<typeof AddressCard>;

const Template: ComponentStory<typeof AddressCard> = (args) => (
  <AddressCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  addressDetails: {
    id: "1",
    firstName: "john",
    lastName: "doe",
    address: "123 street",
    address2: "321 street",
    city: "new york",
    country: "united states",
    zipCode: 123456,
    contact: "+123456789",
  },
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-white">
        <div className="w-3/4">
          <Story {...args} />
        </div>
      </section>
    );
  },
];
export const Active = Template.bind({});
Active.args = {
  addressDetails: {
    id: "1",
    firstName: "john",
    lastName: "doe",
    address: "123 street",
    address2: "321 street",
    city: "new york",
    country: "united states",
    zipCode: 123456,
    contact: "+123456789",
  },
  active: true,
};
Active.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-white">
        <div className="w-3/4">
          <Story {...args} />
        </div>
      </section>
    );
  },
];
