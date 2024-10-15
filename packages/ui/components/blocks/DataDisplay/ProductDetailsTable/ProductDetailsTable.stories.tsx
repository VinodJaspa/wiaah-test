import { storybookBlocksTitle, ProductDetailsTable } from "@UI";
import { ComponentMeta } from "@storybook/react";
import { ProductStatus } from "@features/API";

export default {
  title: storybookBlocksTitle + "ProductDetailsTable",
  component: ProductDetailsTable,
} as ComponentMeta<typeof ProductDetailsTable>;

export const Default = () => (
  <ProductDetailsTable
    products={placeholderProducts}
    onDelete={handleDelete}
    filters={placeholderFilters}
  />
);

const placeholderProducts = [
  {
    __typename: "Products",
    title: "Sample Product 1",
    thumbnail: "https://via.placeholder.com/150",
    price: 29.99,
    stock: 100,
    earnings: 500,
    sales: 30,
    totalOrdered: 35,
    totalDiscounted: 5,
    totalDiscountedAmount: 20,
    unitsRefunded: 2,
    id: "prod_1",
    positiveFeedback: 95,
    reviews: 40,
    negitiveFeedback: 5,
    status: ProductStatus.Active, // Enum used for status
    external_clicks: 200,
  },
  {
    __typename: "Products",
    title: "Sample Product 2",
    thumbnail: "https://via.placeholder.com/150",
    price: 49.99,
    stock: 200,
    earnings: 1000,
    sales: 50,
    totalOrdered: 60,
    totalDiscounted: 10,
    totalDiscountedAmount: 50,
    unitsRefunded: 3,
    id: "prod_2",
    positiveFeedback: 90,
    reviews: 50,
    negitiveFeedback: 10,
    status: ProductStatus.Deleted, // Enum used for status
    external_clicks: 150,
  },
];

const handleDelete = (id: string) => {
  console.log(`Delete product with id: ${id}`);
};

const placeholderFilters = {}; // Adjust with relevant filters as needed
