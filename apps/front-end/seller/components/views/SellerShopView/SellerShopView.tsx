import React from "react";
import {
  ShopCardsListWrapper,
  ShopFilter,
  ProductViewModal,
  useGetRecommendedShopPostsQuery,
} from "ui";
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
          {/* {JSON.stringify(data)} */}
          <ShopCardsListWrapper
            onCardClick={(id) => {
              // router.push(
              //   router.pathname,
              //   { query: { shopPostId: id } },
              //   { shallow: true }
              // );
            }}
            cols={cols}
            items={
              Array.isArray(data)
                ? data?.map((v) => ({
                    postInfo: v,
                    profileInfo: v?.user?.profile,
                  }))
                : []
            }
          />
        </div>
      </div>
    </>
  );
};
