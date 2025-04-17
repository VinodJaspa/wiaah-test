import {
  RecentSearchItemsPH,
  storybookBlocksTitle,
  RecentSearchItemSwticher,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / RecentSearchItemSwitcher",
  component: RecentSearchItemSwticher,
} as Meta<typeof RecentSearchItemSwticher>;

export const UserSearch = () => (
  <RecentSearchItemSwticher itemData={RecentSearchItemsPH[0]} />
);
export const HashtagSearch = () => (
  <RecentSearchItemSwticher itemData={RecentSearchItemsPH[1]} />
);

export const PlaceSearch = () => (
  <RecentSearchItemSwticher itemData={RecentSearchItemsPH[2]} />
);

export const LocationSearch = () => (
  <RecentSearchItemSwticher itemData={RecentSearchItemsPH[3]} />
);
