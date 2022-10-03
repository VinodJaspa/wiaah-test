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

export const WishlistView: React.FC = () => {
  const { OpenLoginPopup } = useLoginPopup();

  const { data: savedItems, isLoading, isError } = useGetWishlistItemsData();

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
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <GridContainerPager showPagination={false} componentsLimit={12}>
          {savedItems &&
            savedItems.map((item, i) => {
              const type = Math.random() * 100;
              return (
                <ProductCard
                  key={i}
                  onButtonClick={() => handleAddToCart(item)}
                  onDelete={() => handleLoginPopup()}
                  postion="delete"
                  forceHover={true}
                  buttonText={type > 50 ? "Add to Cart" : "Book now"}
                  {...item}
                  imageUrl={item.imgUrl}
                  variant={type > 50 ? "product" : "service"}
                />
              );
            })}
        </GridContainerPager>
      </SpinnerFallback>
      <Spacer />
    </div>
  );
};
