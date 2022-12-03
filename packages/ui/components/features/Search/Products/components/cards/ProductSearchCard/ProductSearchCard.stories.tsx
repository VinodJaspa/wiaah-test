import { ProductSearchCard } from "./ProductSearchCard";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchCardsTitle } from "utils";

export default {
  title: storybookSearchCardsTitle + "ProductSearchCard",
  component: ProductSearchCard,
} as ComponentMeta<typeof ProductSearchCard>;

const template: ComponentStory<typeof ProductSearchCard> = (args) => (
  <div className="w-64">
    <ProductSearchCard {...args} />
  </div>
);

export const Default = template.bind({});
Default.args = {
  productInfo: {
    cashback: 5,
    colors: ["#4272EE", "#3CD399", "#F93030", "#000000", "#FFC700", "#fff"],
    price: 50,
    discount: 15,
    rating: 4.8,
    reviewsCount: 150,
    thumbnail:
      "https://nextluxury.com/wp-content/uploads/Scarves-Fashion-Accessories-For-Men.jpg",
    title: "Product title",
  },
  sellerInfo: {
    name: "Seller name",
    profession: "Profession",
    thumbnail: "/profile (1).jfif",
    verified: true,
  },
};
