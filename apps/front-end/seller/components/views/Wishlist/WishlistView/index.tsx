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
  getRandomImage,
} from "ui";
import WishlistEmpty from "../WishlistEmpty";

const FAKE_WISHLIST_ITEMS = [
  {
    id: "placeholder-id",
    name: "Placeholder Item",
    price: 300,
    imgUrl: "https://via.placeholder.com/150",
    currency: "USD",
    currencySymbol: "$",
    colors: ["red", "blue", "green"],
    liked: false,
    cashback: "10",
    discount: 5,
    oldPrice: 400,
    rating: 3.6,
  },

  {
    id: "placeholder-id2",
    name: "Placeholder Item",
    price: 400,
    imgUrl: "https://via.placeholder.com/150",
    currency: "USD",
    currencySymbol: "$",
    colors: ["red", "blue", "green"],
    liked: false,
    cashback: "20",
    discount: 20,
    oldPrice: 450,
    rating: 5,
  },
  {
    id: "placeholder-id3",
    name: "Placeholder Item",
    price: 100,
    imgUrl: "https://via.placeholder.com/150",
    currency: "USD",
    currencySymbol: "$",
    colors: ["red", "blue", "green"],
    liked: false,
    cashback: "15",
    discount: 10,
    oldPrice: 200,
    rating: 4.2,
  },
  {
    id: "placeholder-id3",
    name: "Placeholder Item",
    price: 100,
    imgUrl: "https://via.placeholder.com/150",
    currency: "USD",
    currencySymbol: "$",
    colors: ["red", "blue", "green"],
    liked: false,
    cashback: "15",
    discount: 10,
    oldPrice: 200,
    rating: 4.2,
  },
  {
    id: "placeholder-id3",
    name: "Placeholder Item",
    price: 100,
    imgUrl: "https://via.placeholder.com/150",
    currency: "USD",
    currencySymbol: "$",
    colors: ["red", "blue", "green"],
    liked: false,
    cashback: "15",
    discount: 10,
    oldPrice: 200,
    rating: 4.2,
  },
];

export const WishlistView: React.FC = () => {
  const { OpenLoginPopup } = useLoginPopup();

  // WARNING: graphql is not ready yet so I has been replaced with placeholder
  const {
    data: _savedItems,
    isLoading: _isLoading,
    isError: _isError,
  } = useGetWishlistItemsData();
  const savedItems = React.useMemo(() => FAKE_WISHLIST_ITEMS, []);

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
                  name={item.name}
                  key={i}
                  onButtonClick={() => handleAddToCart(item)}
                  onDelete={() => handleLoginPopup()}
                  position="delete"
                  forceHover={true}
                  buttonText={type > 50 ? "Add to Cart" : "Book now"}
                  id=""
                  cashback={parseInt(item.cashback)}
                  discount={item.discount}
                  price={item.price}
                  rate={item.rating}
                  thumbnail={getRandomImage()}
                  liked
                />
              );
            })}
        </GridContainerPager>
      </SpinnerFallback>
      <Spacer />
    </div>
  );
};
