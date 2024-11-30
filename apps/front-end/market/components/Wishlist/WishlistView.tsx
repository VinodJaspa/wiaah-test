import React from "react";
import {
  Spacer,
  useLoginPopup,
  useShoppingCart,
  useSavedItems,
  getRandomImage,
  useCartSummary,
} from "ui";
import { TipTextContainer } from "ui/components/blocks/TipTextContainer";
import { GridContainerPager } from "ui/components/blocks/GridContainerPager";
import { ProductCard } from "ui/components/blocks/ProductCard";
import WishlistEmpty from "./WishlistEmpty";
import { WishlistItem } from "@features/API";
import { useTranslation } from "react-i18next";
import { CartSummaryItem, ShopContactDetails } from "types";

export const WishlistView: React.FC = () => {
  const { OpenLoginPopup } = useLoginPopup();
  const { OpenShoppingCart } = useShoppingCart();
  const { DeleteItem, savedItems } = useSavedItems();
  const { AddNewItem } = useCartSummary();
  const { t } = useTranslation();
  const shop: ShopContactDetails = {
    name: "awsome shop",
    id: "44",
    imageUrl: "http://image",
  };
  function handleAddToCart(item: CartSummaryItem) {
    OpenShoppingCart();
    AddNewItem({
      item: item,
      shop: shop,
    });
    handleLoginPopup();
  }
  function handleLoginPopup() {
    OpenLoginPopup();
  }
  if (savedItems.length < 1) return <WishlistEmpty />;
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <span className="flex h-24 w-full items-center justify-center text-3xl font-bold">
        {t("Wishlist")}
      </span>
      <GridContainerPager componentsLimit={10}>
        {savedItems.map((item, i) => {
          const type = Math.random() * 100;
          return (
            <ProductCard
              name={"fake name"}
              key={i}
              onButtonClick={() => handleAddToCart(item)}
              onDelete={(id) => DeleteItem(id)}
              position="delete"
              forceHover={true}
              buttonText={type > 50 ? "Add to Cart" : "Book now"}
              id=""
              cashback={15}
              discount={10}
              price={150}
              rate={4.8}
              thumbnail={getRandomImage()}
              liked
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
