import { SocialServicePostCard } from "./SocialServiceCard";
import { storybookSocialCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookSocialCardsTitle + "SocialServiceCard",
  component: SocialServicePostCard,
} as ComponentMeta<typeof SocialServicePostCard>;

const template: ComponentStory<typeof SocialServicePostCard> = (args) => (
  <SocialServicePostCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "123",
  label: "Restaurant",
  name: "Service name",
  thumbnail: "/place-2.jpg",
};
