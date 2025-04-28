import { mapArray } from "utils";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  SectionWrapper,
  SectionHeader,
  useGetUserSavedCollections,
  useGetMyAccountQuery,
  GetUserSavesCollectionsQuery,
  AspectRatio,
  Image,
  ListWrapper,
  ProductCard,
  ProductCardProps,
} from "ui";
import { getRandomImage } from "@UI/../placeholder";

// Placeholder data

export const SavedPostsSection: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  // WARNING: this GraphQL query is not working right now so it has been replaced with placeholder
  // const { data: _account } = useGetMyAccountQuery();
  // const { data: _data } = useGetUserSavedCollections(
  //   { userId: _account?.id! },
  //   { enabled: !!_account?.id },
  // );

  const handleAddToCart = (item) => {
    console.log(`Added to cart: ${item.id}`);
  };

  const DeleteItem = (id) => {
    console.log(`Deleted item with id: ${id}`);
  };

  return (
    <div className="flex flex-col gap-8  w-9/12 ">
      <h2 className="w-full text-center font-semibold text-2xl">Saved</h2>
      <ListWrapper cols={4}>
        {productCardPlaceholders.map((item, i) => (
          <ProductCard
            key={item.id || i} // Use `id` or fallback to `i` for unique key
            onButtonClick={() => handleAddToCart(item)}
            onDelete={(id) => DeleteItem(id)}
            position="delete"
            forceHover={true}
            buttonText={item.price > 50 ? "Add to Cart" : "Book now"}
            id={item.id}
            cashback={item.cashback}
            discount={item.discount}
            price={item.price}
            rate={item.rate}
            thumbnail={item.thumbnail}
            liked={item.liked}
            name={item.name}
            full={true}
          />
        ))}
      </ListWrapper>
    </div>
  );
};

const productCardPlaceholders: ProductCardProps[] = [
  {
    buttonText: "Add to Cart",
    forceHover: false,
    position: "save",
    full: false,
    liked: false,
    onLike: (id: string) => console.log(`Liked product with id: ${id}`),
    onButtonClick: (id: string) =>
      console.log(`Button clicked for product with id: ${id}`),
    onDelete: (id: string) => console.log(`Deleted product with id: ${id}`),
    id: "prod-123",
    price: 29.99,
    thumbnail: "/shop.jpeg",
    cashback: 5.0,
    discount: 10.0,
    rate: 4.5,
    name: "Sample Product 1",
  },
  {
    buttonText: "Buy Now",
    forceHover: true,
    position: "delete",
    full: true,
    liked: true,
    onLike: (id: string) => console.log(`Liked product with id: ${id}`),
    onButtonClick: (id: string) =>
      console.log(`Button clicked for product with id: ${id}`),
    onDelete: (id: string) => console.log(`Deleted product with id: ${id}`),
    id: "prod-124",
    price: 49.99,
    thumbnail: "/shop.jpeg",
    cashback: 7.5,
    discount: 15.0,
    rate: 4.8,
    name: "Sample Product 2",
  },
  {
    buttonText: "Save for Later",
    forceHover: false,
    position: "save",
    full: false,
    liked: false,
    onLike: (id: string) => console.log(`Liked product with id: ${id}`),
    onButtonClick: (id: string) =>
      console.log(`Button clicked for product with id: ${id}`),
    onDelete: (id: string) => console.log(`Deleted product with id: ${id}`),
    id: "prod-125",
    price: 19.99,
    thumbnail: "/shop.jpeg",
    cashback: 3.0,
    discount: 5.0,
    rate: 4.2,
    name: "Sample Product 3",
  },
  {
    buttonText: "Checkout",
    forceHover: true,
    position: "delete",
    full: true,
    liked: true,
    onLike: (id: string) => console.log(`Liked product with id: ${id}`),
    onButtonClick: (id: string) =>
      console.log(`Button clicked for product with id: ${id}`),
    onDelete: (id: string) => console.log(`Deleted product with id: ${id}`),
    id: "prod-126",
    price: 59.99,
    thumbnail: "/shop.jpeg",
    cashback: 10.0,
    discount: 20.0,
    rate: 4.9,
    name: "Sample Product 4",
  },
];
