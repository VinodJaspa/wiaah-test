import { t } from "i18next";
import React from "react";
import { useRecoilValue } from "recoil";
import {
  Button,
  ShopCardsListWrapper,
  SocialPostHeader,
  SocialProfileShopPostsList,
  SocialShopCard,
} from "ui";

import { SocialShopOtherPostsState, SocialShopPostState } from "@src/state";

import { useTranslation } from "react-i18next";

export interface ShopProductViewProps {}

export const ShopProductView: React.FC<ShopProductViewProps> = ({}) => {
const { t } = useTranslation();
  const product = useRecoilValue(SocialShopPostState);
  const otherProducts = useRecoilValue(SocialShopOtherPostsState);
  return (
    <div className="flex py-16 gap-8 flex-col px-2">
      <div className="flex flex-col gap-8 md:flex-row mb-24 items-start">
        <SocialPostHeader
          name={product.user.name}
          thumbnail={product.user.thumbnail}
        />
        <SocialShopCard showComments shopCardInfo={product} />
      </div>
      <p className="text-2xl font-bold w-full text-center capitalize">
        {t("view", "view")} {product.user.name}{" "}
        {t("other_posts", "other posts")}
      </p>
      <SocialProfileShopPostsList userId="" />
      <Button>{t("view_more", "view more")}</Button>
    </div>
  );
};
