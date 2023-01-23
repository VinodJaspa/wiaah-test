import React from "react";
import {
  PostViewPopup,
  ShopCardsListWrapper,
  ShopFilter,
  SocialShopCard,
  ProductViewModal,
  useGetRecommendedShopPostsQuery,
} from "ui";
import { ShopCardInfo } from "types";
import { useBreakpointValue } from "utils";

export const SellerShopView: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const { data } = useGetRecommendedShopPostsQuery({});

  return (
    <>
      <div className="w-full ">
        {/* <Text textTransform={"capitalize"} fontSize={"4xl"} fontWeight="bold">
          {t("shop", "shop")}
        </Text> */}
        <ProductViewModal />
        <div className="w-full">
          <ShopFilter onlyMobile={false} />

          <ShopCardsListWrapper
            onCardClick={(id) => {
              // router.push(
              //   router.pathname,
              //   { query: { shopPostId: id } },
              //   { shallow: true }
              // );
            }}
            cols={cols}
            items={data.map((v) => ({
              postInfo: v,
              profileInfo: v.user.profile,
            }))}
          />
        </div>
      </div>
    </>
  );
};
