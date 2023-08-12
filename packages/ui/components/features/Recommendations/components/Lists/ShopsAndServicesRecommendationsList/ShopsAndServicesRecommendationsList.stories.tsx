import { ComponentMeta } from "@storybook/react";
import { ShopsAndServicesRecommendationsList } from "./ShopsAndServicesRecommendationsList";
import { storybookListWrappersTitle } from "utils";

export default {
  title: storybookListWrappersTitle + "ShopsAndServicesRecommendationsList",
  component: ShopsAndServicesRecommendationsList,
} as ComponentMeta<typeof ShopsAndServicesRecommendationsList>;

export const Default = () => (
  <ShopsAndServicesRecommendationsList
    shops={[...Array(10)].map(() => ({
      id: "",
      imgUrl: "",
      label: "shop label",
      name: "seller name",
      type: "Clothes",
      onShopClick: () => {},
    }))}
  />
);
