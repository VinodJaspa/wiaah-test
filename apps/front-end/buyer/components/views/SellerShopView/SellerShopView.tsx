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
import {
  ShopCardsInfoPlaceholder,
  SocialShopsPostCardPlaceholder,
} from "ui/placeholder/social";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ShopCardInfo } from "types";
import { CashbackType, PresentationType } from "@features/API";
import { getRandomImage } from "placeholder";

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
        <div className="flex flex-col w-full h-full gap-8">
          <ShopFilter onlyMobile={false} />
          <ShopCardsListWrapper cols={cols} items={FAKE_SHOP_POST} />
        </div>
      </VStack>
    </>
  );
};

const FAKE_SHOP_POST = [
  {
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
  },

  {
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
  },

  {
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
  },
  {
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
  },
];
