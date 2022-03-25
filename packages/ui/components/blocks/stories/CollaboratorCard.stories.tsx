import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CollaboratorCard } from "../";

export default {
  title: "UI/blocks/CollaboratorCard",
  component: CollaboratorCard,
} as ComponentMeta<typeof CollaboratorCard>;

const Template: ComponentStory<typeof CollaboratorCard> = (args) => (
  <CollaboratorCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imageUrl: "/shop-2.jpeg",
  name: "Wiaah",
  location: "Switzerland, Geneva",
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-white">
        <Story {...args} />
      </section>
    );
  },
];
