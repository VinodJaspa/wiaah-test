import React, { useEffect } from "react";
import { WishlistItem } from "types/market/Wishlist.interface";
import { Spacer, useLoginPopup, useShoppingCart, useSavedItems } from "ui";
import { TipTextContainer } from "ui/components/blocks/TipTextContainer";
import { GridContainerPager } from "ui/components/blocks/GridContainerPager";
import { ProductCard } from "ui/components/blocks/ProductCard";
import WishlistEmpty from "./WishlistEmpty";

export const WishlistView: React.FC = () => {
  const { OpenLoginPopup } = useLoginPopup();
  const { OpenShoppingCart } = useShoppingCart();
  const { DeleteItem, savedItems } = useSavedItems();
  function handleAddToCart(item: WishlistItem) {
    const id = String(Math.random() * 100);
    OpenShoppingCart();
    // AddNewItem({
    //   id,
    //   name: item.name,
    //   price: item.price,
    //   quantity: 1,
    //   thumbnail: item.imgUrl,
    // });
    handleLoginPopup();
  }
  function handleLoginPopup() {
    OpenLoginPopup();
  }
  if (savedItems.length < 1) return <WishlistEmpty />;
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <span className="flex h-24 w-full items-center justify-center text-3xl font-bold">
        Saved Items
      </span>
      <GridContainerPager componentsLimit={10}>
        {savedItems.map((item, i) => {
          const type = Math.random() * 100;
          return (
            <ProductCard
              key={i}
              onButtonClick={() => handleAddToCart(item)}
              onDelete={(id) => DeleteItem(id)}
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
      <Spacer />
      <TipTextContainer>
        <p className="w-1/2 text-center">
          These products are only available on this this device and will expire
          after 7 days,{" "}
          <span
            onClick={handleLoginPopup}
            className="cursor-pointer font-bold underline"
          >
            SignIn/SignUp
          </span>{" "}
          to keep your products available across all your devices
        </p>
      </TipTextContainer>
    </div>
  );
};
