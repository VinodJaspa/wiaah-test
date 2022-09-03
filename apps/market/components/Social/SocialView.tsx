import React from "react";
import {
  Container,
  PostCardsListWrapper,
  SocialProfile,
  TabsViewer,
  ShopCardsListWrapper,
  AffiliationOffersCardListWrapper,
  FilterModal,
  ActionsListWrapper,
  SocialPostsCommentsDrawer,
  ShareWithModal,
  SocialServicePostsList,
  Divider,
  SocialServiceDetailsModal,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "ui";
import {
  PostCommentPlaceholder,
  postProfilesPlaceholder,
  ShopCardsInfoPlaceholder,
  socialAffiliationCardPlaceholders,
  SocialProfileInfo,
  profileActionsPlaceholder,
} from "placeholder";
import { TabType } from "types";
import { useRecoilValue } from "recoil";
import { SocialNewsfeedPostsState, SocialProfileInfoState } from "state";
import { PostComment } from "types";
import { products } from "placeholder";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useBreakpointValue } from "utils";
import { useReactPubsub } from "react-pubsub";

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
  const { visit, getParam } = useRouting();
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  const cols = useBreakpointValue({ base: 3 });
  const ActionsCols = useBreakpointValue({ base: 3, xl: 5 });
  const { emit } = useReactPubsub(
    (events) => events.openSocialShopPostsFilterDrawer
  );

  const sellerTabs: TabType[] = [
    {
      name: t("news feed"),
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
    {
      name: t("shop"),
      component: (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Menu>
              <MenuButton>
                <div
                  onClick={() => emit()}
                  className="mr-2 cursor-pointer flex items-center justify-between rounded-lg border p-2 text-xs"
                >
                  <samp>{t("Sort")}</samp>
                  <FaChevronDown className="ml-2" />
                </div>
              </MenuButton>
              <MenuList className="translate-x-full" origin="top right">
                <MenuItem>{t("Newest in")}</MenuItem>
                <MenuItem>{t("Price (Low to High)")}</MenuItem>
                <MenuItem>{t("Price (High to Low)")}</MenuItem>
              </MenuList>
            </Menu>
            <div
              onClick={() => emit()}
              className="mr-2 cursor-pointer flex items-center justify-between rounded-lg border p-2 text-xs"
            >
              <samp>{t("Filter")}</samp>
              <FaChevronDown className="ml-2" />
            </div>
          </div>
          <FilterModal />
          <ShopCardsListWrapper
            // grid={isMobile}
            cols={cols}
            items={ShopCardsInfoPlaceholder}
          />
        </div>
      ),
    },
    {
      name: t("Services"),
      component: <SocialServicePostsList />,
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

  const tabsSet = profileInfo.accountType === "seller" ? sellerTabs : buyerTabs;
  const tabParam = getParam("tab");

  return (
    <>
      <ShareWithModal />
      <SocialPostsCommentsDrawer />
      <div className="flex flex-col">
        <div className="flex relative md:static max-h-[24rem]">
          <SocialProfile shopInfo={SocialProfileInfo} />
          <img
            className="absolute md:static top-0 left-0 w-full bg-black bg-opacity-20 -z-[1] h-full md:h-auto object-cover"
            src="/shop.jpeg"
          />
        </div>
        <Container className="flex-grow flex-col">
          {profileInfo && profileInfo.public ? (
            <>
              <TabsViewer tabs={tabsSet} />
              <Divider />
            </>
          ) : (
            <>
              <div className="flex h-full items-center justify-center flex-grow-[inherit]">
                <p className="font-bold text-3xl">
                  {t("this profile is private")}
                </p>
              </div>
            </>
          )}
        </Container>
      </div>
      <SocialServiceDetailsModal />
    </>
  );
};
