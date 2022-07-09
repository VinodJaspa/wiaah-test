import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookCardsTitle } from "utils";
import { ServiceSearchCard } from "./ServiceSearchCard";

export default {
  title: storybookCardsTitle + "ServiceSearchCard",
} as ComponentMeta<typeof ServiceSearchCard>;

const template: ComponentStory<typeof ServiceSearchCard> = (args) => {
  return <ServiceSearchCard {...args} />;
};

export const Default = template.bind({});
Default.args = {
  rate: 4.5,
  providerName: "provider",
  thumbnail: "/shop-2.jpeg",
  type: "Professional Host",
  location: "paris,france",
  onLiked: (id) => console.log(id),
  description: "some random description of a hotel service",
  date: {
    from: Date.now(),
    to: Date.now(),
  },
  id: "123",
  price: 324.456,
};
