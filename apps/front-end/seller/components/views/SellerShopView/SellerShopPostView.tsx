import { Flex, Button, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import {
  shopCardInfoPlaceholder,
  ShopCardsInfoPlaceholder,
} from "ui/placeholder";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getRandomImage } from "placeholder";
import {
  SocialStoryModal,
  SocialPostHeader,
  SocialShopCard,
  ShopCardsListWrapper,
} from "ui";
import { useRouter } from "next/router";
import { CashbackType, PresentationType } from "@features/API";
import { Cashback } from "validation";
const FAKE_SHOP_POST = {
  postInfo: {
    id: "post1",
    comments: 25,
    shares: 10,
    reactionNum: 50,
    userId: "user123",
    createdAt: "2023-06-01T00:00:00Z",
    product: {
      id: "product1",
      presentations: [
        {
          type: PresentationType.Image,
          src: getRandomImage(),
        },
        {
          type: PresentationType.Image,
          src: getRandomImage(),
        },
      ],
      title: "Placeholder Product",
      hashtags: ["#placeholder", "#product"],
      price: 29.99,
      cashback: {
        amount: 20,
        id: "cashback1",
        type: CashbackType.Cash,
        units: 100,
      },
      discount: {
        amount: 10,
        id: "discount1",
        units: 5,
      },
    },
  },
  profileInfo: {
    id: "profile1",
    verified: true,
    photo: getRandomImage(),
    username: "user123",
    profession: "Software Developer",
  },
};

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
  // WARNING: graphql is not ready yet
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
        <SocialStoryModal profileId="4" />
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
      <ShopCardsListWrapper cols={cols} items={[FAKE_SHOP_POST]} />
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
