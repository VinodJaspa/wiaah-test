import { useSocialControls } from "@blocks";
import { useGetProductsByIds } from "@features/Products/services/queries/useGetProductsByIds";
import {
  Button,
  CountInput,
  Drawer,
  Image,
  PriceDisplay,
  ShoppingCartIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";

export const SocialContentProductsDrawer: React.FC = () => {
const { t } = useTranslation();
  const { value, showSocialContentProducts, hideSocialContentProducts } =
    useSocialControls("showSocialContentProductsListing");
  const isOpen =
    Array.isArray(value) && value.every((v) => typeof v === "string");

  const { data: products } = useGetProductsByIds(
    {
      ids: value || [],
    },
    { enabled: isOpen }
  );

  return (
    <Drawer
      draggable
      position="bottom"
      isOpen={isOpen}
      onClose={hideSocialContentProducts}
    >
      <div className="flex flex-col gap-8">
        {mapArray(products, (prod) => (
          <div className="justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={prod.thumbnail}
                alt={prod.title}
                className="w-11 h-11 rounded"
              />
              <div className="flex flex-col gap-2">
                <p>{prod.title}</p>
                <PriceDisplay price={prod.price} />
              </div>
            </div>

            <CountInput />
          </div>
        ))}

        <Button className="flex items-center">
          <ShoppingCartIcon />
          <p>{t("Buy")}</p>
        </Button>
      </div>
    </Drawer>
  );
};
