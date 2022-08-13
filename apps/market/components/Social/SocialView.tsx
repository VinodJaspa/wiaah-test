import {
  Flex,
  Image,
  useBreakpointValue,
  Divider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  Container,
  PostCardsListWrapper,
  SocialProfile,
  TabsViewer,
  ShopCardsListWrapper,
  AffiliationOffersCardListWrapper,
  FilterModal,
  useResponsive,
  ActionsListWrapper,
  SocialPostsCommentsDrawer,
  ShareWithModal,
} from "ui";
import {
  PostCommentPlaceholder,
  postProfilesPlaceholder,
  ShopCardsInfoPlaceholder,
  socialAffiliationCardPlaceholders,
  SocialProfileInfo,
  profileActionsPlaceholder,
} from "ui";
import { TabType } from "types";
import { useRecoilValue } from "recoil";
import { SocialNewsfeedPostsState, SocialProfileInfoState } from "state";
import { PostComment } from "types";
import { products } from "ui/placeholder";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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

export const SocialView: React.FC<SocialViewProps> = () => {
  const { t } = useTranslation();
  const profileInfo = useRecoilValue(SocialProfileInfoState);
  const { isMobile } = useResponsive();
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  const cols = useBreakpointValue({ base: 3 });
  const ActionsCols = useBreakpointValue({ base: 3, xl: 5 });

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
          <ShopCardsListWrapper
            // grid={isMobile}
            cols={cols}
            items={ShopCardsInfoPlaceholder}
          />
        </Flex>
      ),
    },
    {
      name: t("Services"),
      component: <div></div>,
    },
    {
      name: t("affiliation offers", "affiliation offers"),
      component: (
        <AffiliationOffersCardListWrapper
          // grid={isMobile}
          cols={cols}
          items={socialAffiliationCardPlaceholders}
        />
      ),
    },
    {
      name: t("actions", "Actions"),
      component: (
        <ActionsListWrapper
          cols={ActionsCols}
          actions={profileActionsPlaceholder}
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
    <>
      <ShareWithModal />
      <SocialPostsCommentsDrawer />
      <Flex direction={"column"}>
        <Flex position={{ base: "relative", md: "initial" }} maxH={"24rem"}>
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
        <Container className="flex-grow flex-col">
          {profileInfo && profileInfo.public ? (
            <>
              <TabsViewer
                tabs={
                  profileInfo.accountType === "seller" ? sellerTabs : buyerTabs
                }
              />
              <Divider my="1rem" />
            </>
          ) : (
            <>
              <Flex
                h="100%"
                flexGrow={"inherit"}
                align="center"
                justify={"center"}
              >
                <Text
                  fontWeight={"bold"}
                  textTransform={"capitalize"}
                  fontSize={"xx-large"}
                >
                  {t("this_profile_is_private", "this profile is private")}
                </Text>
              </Flex>
            </>
          )}
        </Container>
      </Flex>
    </>
  );
};
