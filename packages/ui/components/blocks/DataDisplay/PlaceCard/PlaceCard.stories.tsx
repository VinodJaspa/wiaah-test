import {
  placeCardPlaceholder,
  storybookDataDisplayBlocksTitle,
  PlaceCard,
} from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataDisplayBlocksTitle + "PlaceCard",
  component: PlaceCard,
} as ComponentMeta<typeof PlaceCard>;

export const Default = () => <PlaceCard {...placeCardPlaceholder} />;
