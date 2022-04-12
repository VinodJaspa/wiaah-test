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
  FilterModal,
} from "ui";
import {
  PostCommentPlaceholder,
  postProfilesPlaceholder,
  shopCardInfoPlaceholder,
  ShopCardsInfoPlaceholder,
  socialAffiliationCardPlaceholders,
  SocialProfileInfo,
} from "ui/placeholder/social";
import { randomNum } from "ui/components/helpers/randomNumber";
import { TabType } from "types/market/misc/tabs";
import { useRecoilValue } from "recoil";
import { SocialNewsfeedPostsState, SocialProfileInfoState } from "ui/state";
import { PostComment, ShopCardInfo } from "types/market/Social";
import { products } from "ui/placeholder";
import { FaChevronDown } from "react-icons/fa";
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

export interface SocialViewProps {}

const SocialView: React.FC<SocialViewProps> = () => {
  const profileInfo = useRecoilValue(SocialProfileInfoState);
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
  const sellerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
    {
      name: t("shop", "shop"),
      component: (
        <Flex gap="1rem" direction={"column"}>
          <div className="flex justify-end">
            <div
              onClick={() => {
                setFilterOpen(true);
              }}
              className="filter-button mr-2 flex items-center justify-between rounded-lg border p-2 text-xs md:hidden"
            >
              <samp>{t("Filter", "Filter")}</samp>
              <FaChevronDown className="ml-2" />
            </div>
          </div>
          <FilterModal
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />
          <ShopCardsListWrapper cols={cols} items={ShopCardsInfoPlaceholder} />
        </Flex>
      ),
    },
    {
      name: t("affiliation offers", "affiliation offers"),
      component: (
        <AffiliationOffersCardListWrapper
          cols={cols}
          items={socialAffiliationCardPlaceholders}
        />
      ),
    },
  ];
  const buyerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
  ];
  return (
    <Flex direction={"column"}>
      <Flex position={{ base: "relative", md: "initial" }} maxH={"25rem"}>
        <SocialProfile shopInfo={SocialProfileInfo} />
        <Image
          position={{ base: "absolute", md: "unset" }}
          top="0px"
          left="0px"
          w="100%"
          bgColor={"blackAlpha.200"}
          zIndex={-1}
          h={{ base: "100%", md: "unset" }}
          src="/shop.jpeg"
          objectFit={"cover"}
        />
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
