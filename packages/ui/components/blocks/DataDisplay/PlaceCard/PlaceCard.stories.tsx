import {
  placeCardPlaceholder,
  storybookDataDisplayBlocksTitle,
  PlaceCard,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /PlaceCard",
  component: PlaceCard,
} as Meta<typeof PlaceCard>;

export const Default = () => <PlaceCard {...placeCardPlaceholder} />;
