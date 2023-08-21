import { useSocialControls } from "@blocks";
import { useGetProductsByIds } from "@features/Products/services/queries/useGetProductsByIds";
import { useGetSocialPostQuery } from "@features/Social/services";
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
    useSocialControls("showSocialPostProducts");
  const isOpen = typeof value === "string";

  const { data } = useGetSocialPostQuery({ id: value! }, { enabled: isOpen });

  const { data: products } = useGetProductsByIds({
    ids: data?.productIds || [],
  });

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
