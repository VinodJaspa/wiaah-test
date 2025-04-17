import { ProductSearchCard } from "./ProductSearchCard";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSearchCardsTitle } from "utils";

export default {
  title: "UI / Features /Search /Cards /ProductSearchCard",
  component: ProductSearchCard,
} as Meta<typeof ProductSearchCard>;

const template: StoryFn<typeof ProductSearchCard> = (args) => (
  <div className="w-64">
    <ProductSearchCard {...args} />
  </div>
);

export const Default = {
  render: template,

  args: {
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
  },
};
