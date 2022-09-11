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
  location: {
    country: "France",
  },
  price: 15,
  rate: 4,
  reviews: 150,
  type: "Hotel",
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
  user: {
    accountType: "seller",
    id: "1322",
    name: "seller name",
    profession: "Profession",
    public: true,
    thumbnail: "/shop-2.jpeg",
    verified: true,
  },
};
