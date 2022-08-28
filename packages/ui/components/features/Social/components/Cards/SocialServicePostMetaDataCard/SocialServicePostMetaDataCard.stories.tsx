import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SocialServicePostMetaDataCard } from "./SocialServicePostMetaDataCard";
import { storybookSocialServiceCardsTitle } from "utils";

export default {
  title: storybookSocialServiceCardsTitle + "SocialServicePostMetaDataCard",
  component: SocialServicePostMetaDataCard,
} as ComponentMeta<typeof SocialServicePostMetaDataCard>;

const template: ComponentStory<typeof SocialServicePostMetaDataCard> = (
  args
) => <SocialServicePostMetaDataCard {...args} />;

export const Default = template.bind({});
Default.args = {
  id: "123",
  label: "health center",
  name: "health center service name",
  attachments: [
    {
      src: "/shop-2.jpeg",
      type: "image",
    },
    {
      src: "/video.mp4",
      type: "video",
    },
  ],
};
