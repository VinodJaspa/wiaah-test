import { VStack, Box, Divider, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import {
  PostViewPopup,
  ShopCardsListWrapper,
  ShopFilter,
  SocialShopCard,
  ProductViewModal,
  useProductViewModal,
} from "ui";
import { ShopCardsInfoPlaceholder } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ShopCardInfo } from "types";

export const SellerShopView: React.FC = () => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const router = useRouter();
  return (
    <>
      <VStack
        w={"100%"}
        divider={<Divider borderColor={"gray.200"} opacity="1" />}
      >
        {/* <Text textTransform={"capitalize"} fontSize={"4xl"} fontWeight="bold">
          {t("shop", "shop")}
        </Text> */}
        <ProductViewModal />
        <PostViewPopup
          fetcher={async ({ queryKey }) => {
            const id = queryKey[1].postId;

            const post = ShopCardsInfoPlaceholder.find(
              (post) => post.id === id
            );
            return post ? post : null;
          }}
          queryName="shopPost"
          idParam="shopPostId"
          renderChild={(props: ShopCardInfo) => {
            return (
              <SocialShopCard
                showCommentInput={false}
                showInteraction={false}
                shopCardInfo={props}
              />
            );
          }}
        />
        <Box w="100%">
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
            items={ShopCardsInfoPlaceholder}
          />
        </Box>
      </VStack>
    </>
  );
};
