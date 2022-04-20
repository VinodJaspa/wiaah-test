import { Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { useRecoilValue } from "recoil";
import {
  ShopCardsListWrapper,
  SocialPostHeader,
  SocialShopCard,
  SocialStoriesModal,
} from "ui";

import { SocialShopOtherPostsState, SocialShopPostState } from "ui/state";

export interface ShopProductViewProps {}

export const ShopProductView: React.FC<ShopProductViewProps> = ({}) => {
  const product = useRecoilValue(SocialShopPostState);
  const otherProducts = useRecoilValue(SocialShopOtherPostsState);

  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  return (
    <Flex py="4rem" gap="2rem" direction={"column"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="2rem"
        mb="6rem"
        align={"start"}
      >
        <SocialStoriesModal />
        <SocialPostHeader
          name={product.user.name}
          thumbnail={product.user.thumbnail}
        />
        <SocialShopCard showComments shopCardInfo={product} />
      </Flex>
      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("view", "view")} {product.user.name}{" "}
        {t("other_posts", "other posts")}
      </Text>
      <ShopCardsListWrapper cols={cols} items={otherProducts} />
      <Button
        _focus={{ ringColor: "primary.main" }}
        bgColor="white"
        borderWidth={"0.25rem"}
        borderColor="gray"
        mt="2rem"
        fontSize={"xl"}
        color="black"
        py="0.5rem"
        textTransform={"capitalize"}
      >
        {t("view_more", "view more")}
      </Button>
    </Flex>
  );
};
