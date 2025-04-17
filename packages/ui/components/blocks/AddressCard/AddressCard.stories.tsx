import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { AddressCard } from "@UI";

export default {
  title: "UI/blocks/AddressCard",
  component: AddressCard,
} as Meta<typeof AddressCard>;

export const Default = {
  args: {
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
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-white">
          <div className="w-3/4">
            <Story {...args} />
          </div>
        </section>
      );
    },
  ],
};

export const Active = {
  args: {
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
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-white">
          <div className="w-3/4">
            <Story {...args} />
          </div>
        </section>
      );
    },
  ],
};
