import { Flex, Button, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import {
  shopCardInfoPlaceholder,
  ShopCardsInfoPlaceholder,
} from "ui/placeholder";
import { SocialShopCardsInfoPlaceholder } from "placeholder";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  SocialStoryModal,
  SocialPostHeader,
  SocialShopCard,
  ShopCardsListWrapper,
} from "ui";
import { useRouter } from "next/router";

export const SellerShopPostView: React.FC = () => {
  const { t } = useTranslation();
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const router = useRouter();

  const ShopPost = shopCardInfoPlaceholder;
  const { data: _ShopPost } = useQuery(
    ["shopPost", { postId: router.query.postId }],
    () => {
      return shopCardInfoPlaceholder;
    }
  );
  const ShopPosts = ShopCardsInfoPlaceholder;
  const { data: _ShopPosts } = useQuery("shopPosts", () => {
    return ShopCardsInfoPlaceholder;
  });

  return (
    <Flex pb="4rem" gap="2rem" direction={"column"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="2rem"
        mb="6rem"
        align={"start"}
      >
        {/*
        <SocialStoryModal />
        */}
        <SocialPostHeader
          name={ShopPost.user.name}
          thumbnail={ShopPost.user.thumbnail}
        />
        <SocialShopCard showComments shopCardInfo={ShopPost} />
      </Flex>
      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("view", "view")} {ShopPost.user.name}{" "}
        {t("other_posts", "other posts")}
      </Text>
      <ShopCardsListWrapper
        cols={cols}
        items={SocialShopCardsInfoPlaceholder}
      />
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
