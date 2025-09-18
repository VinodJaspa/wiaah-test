import React from "react";
import { WishlistItem } from "types";
import {
  useLoginPopup,
  useShoppingCart,
  useSavedItems,
  GridContainerPager,
  ProductCard,
  Spacer,
  TipTextContainer,
  useGetWishlistItemsData,
  SpinnerFallback,
} from "ui";
import WishlistEmpty from "../WishlistEmpty";
import { getRandomImage } from "placeholder";

export const WishlistView: React.FC = () => {
  const { OpenLoginPopup } = useLoginPopup();

  // const {
  //   data: _savedItems,
  //   isLoading: _isLoading,
  //   isError: _isError,
  // } = useGetWishlistItemsData();

  const savedItems = FAKE_WISHLIST_DATA;

  function handleAddToCart(item: WishlistItem) {
    handleLoginPopup();
  }
  function handleLoginPopup() {
    OpenLoginPopup();
  }
  if (savedItems && savedItems.length < 1) return <WishlistEmpty />;
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <span className="flex h-16 pb-4 w-full items-center justify-center text-3xl font-bold">
        Saved Items
      </span>
      <SpinnerFallback isLoading={false}>
        <GridContainerPager showPagination={false} componentsLimit={12}>
          {savedItems &&
            savedItems.map((item, i) => {
              const type = Math.random() * 100;
              return (
                <ProductCard
                  title={item.name}
                  key={i}
                  id={item.id}
                  price={item.price}
                  discount={item.discount}
                  onButtonClick={() => handleAddToCart(item)}
                  onDelete={() => handleLoginPopup()}
                  position="delete"
                  forceHover={true}
                  buttonText={type > 50 ? "Add to Cart" : "Book now"}
                  cashback={parseInt(item.cashback)}
                  thumbnail={item.imgUrl}
                  rating={item.rating}
                />
              );
            })}
        </GridContainerPager>
      </SpinnerFallback>
      <Spacer />
    </div>
  );
};

const FAKE_WISHLIST_DATA: WishlistItem[] = [
  {
    id: "placeholder-id-5",
    name: "Placeholder Name",
    price: 80,
    imgUrl: getRandomImage(),
    type: "product",
    currency: "USD",
    currencySymbol: "$",
    colors: ["#000000", "#FFFFFF"],
    liked: false,
    cashback: "0%",
    discount: 0,
    oldPrice: 100,
    rating: 0,
  },

  {
    id: "placeholder-id-4",
    name: "Placeholder Name",
    price: 30,
    imgUrl: getRandomImage(),
    type: "product",
    currency: "USD",
    currencySymbol: "$",
    colors: ["#000000", "#FFFFFF"],
    liked: false,
    cashback: "20%",
    discount: 10,
    oldPrice: 50,
    rating: 3,
  },

  {
    id: "placeholder-id-3",
    name: "Placeholder Name",
    price: 40,
    imgUrl: getRandomImage(),
    type: "product",
    currency: "USD",
    currencySymbol: "$",
    colors: ["#000000", "#FFFFFF"],
    liked: false,
    cashback: "0%",
    discount: 0,
    oldPrice: 50,
    rating: 0,
  },

  {
    id: "placeholder-id-2",
    name: "Placeholder Name",
    price: 0,
    imgUrl: getRandomImage(),
    type: "product",
    currency: "USD",
    currencySymbol: "$",
    colors: ["#000000", "#FFFFFF"],
    liked: false,
    cashback: "0%",
    discount: 0,
    oldPrice: 0,
    rating: 5,
  },

  {
    id: "placeholder-id-1",
    name: "Placeholder Name",
    price: 80,
    imgUrl: getRandomImage(),
    type: "product",
    currency: "USD",
    currencySymbol: "$",
    colors: ["#000000", "#FFFFFF"],
    liked: false,
    cashback: "0%",
    discount: 0,
    oldPrice: 100,
    rating: 0,
  },
];
