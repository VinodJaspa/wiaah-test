import { Flex, Image, useBreakpointValue, Divider } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import {
  Container,
  PostCardsListWrapper,
  SocialProfile,
  TabsViewer,
  ShopCardsListWrapper,
  AffiliationOffersCardListWrapper,
} from "ui";
import {
  PostCommentPlaceholder,
  postProfilesPlaceholder,
  shopCardInfoPlaceholder,
  socialAffiliationCardPlaceholders,
  SocialProfileInfo,
} from "ui/placeholder/social";
import { randomNum } from "ui/components/helpers/randomNumber";
import { TabType } from "types/market/misc/tabs";
import { useRecoilValue } from "recoil";
import { SocialNewsfeedPosts, SocialProfileInfoState } from "ui/state";
import { PostComment, ShopCardInfo } from "types/market/Social";
import { products } from "ui/placeholder";
const images: string[] = [...products.map((pro) => pro.imgUrl)];
export const getRandomUser = () =>
  postProfilesPlaceholder[
    Math.floor(Math.random() * postProfilesPlaceholder.length)
  ];
const comments: PostComment[] = [
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: {
      src: "/shop.jpeg",
      type: "image",
    },
  },
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },
  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },

  {
    ...PostCommentPlaceholder,
    user: getRandomUser(),
    content: "nice video",
    attachment: null,
  },
];
const stringplaceholder =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nostrum nulla rem excepturi unde iusto voluptatum tempora accusantium ducimus laborum, repellat tempore mollitia error animi doloribus eum inventore voluptate ab.";
const ShopCardInfoPlaceholder: ShopCardInfo[] = [
  {
    ...shopCardInfoPlaceholder,
    attachment: {
      src: "/verticalImage.jpg",
      type: "image",
    },
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    comments: [{ ...comments[0], attachment: null }],
  },
  {
    ...shopCardInfoPlaceholder,
    attachment: {
      src: "/verticalVideo.mp4",
      type: "video",
    },
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    comments: [
      { ...comments[0], attachment: null },
      { ...comments[1], attachment: null },
    ],
  },
  {
    ...shopCardInfoPlaceholder,
    attachment: {
      src: "/video.mp4",
      type: "video",
    },
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: 1600,
    likes: 105100,
    views: 2200000,
    comments: comments,
  },
  {
    ...shopCardInfoPlaceholder,
    attachment: {
      src: "/shop.jpeg",
      type: "image",
    },
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    comments: [],
  },
  {
    ...shopCardInfoPlaceholder,
    attachment: {
      src: images[randomNum(images.length)],
      type: "image",
    },
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    comments: [],
  },
  {
    ...shopCardInfoPlaceholder,
    attachment: {
      src: images[randomNum(images.length)],
      type: "image",
    },
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    comments: [],
  },
  {
    ...shopCardInfoPlaceholder,
    attachment: {
      src: images[randomNum(images.length)],
      type: "image",
    },
    title: stringplaceholder.substring(0, randomNum(30)),
    rating: randomNum(5),
    noOfComments: randomNum(50),
    likes: randomNum(50),
    views: randomNum(50),
    comments: [],
  },
];
export interface SocialViewProps {}

const SocialView: React.FC<SocialViewProps> = () => {
  const profileInfo = useRecoilValue(SocialProfileInfoState);
  const posts = useRecoilValue(SocialNewsfeedPosts);
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const sellerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
    {
      name: t("shop", "shop"),
      component: (
        <ShopCardsListWrapper cols={3} items={ShopCardInfoPlaceholder} />
      ),
    },
    {
      name: t("affiliation offers", "affiliation offers"),
      component: (
        <AffiliationOffersCardListWrapper
          items={socialAffiliationCardPlaceholders}
        />
      ),
    },
  ];
  const buyerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <div></div>,
    },
  ];
  return (
    <Flex direction={"column"}>
      <Flex maxH={"23rem"}>
        <SocialProfile shopInfo={SocialProfileInfo} />
        <Image src="/shop.jpeg" w="100%" objectFit={"cover"} />
      </Flex>
      <Container>
        <TabsViewer
          tabs={profileInfo.accountType === "seller" ? sellerTabs : buyerTabs}
        />
        <Divider my="2rem" />
      </Container>
    </Flex>
  );
};

export default SocialView;
