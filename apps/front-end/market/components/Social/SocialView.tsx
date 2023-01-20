import React from "react";
import {
  Container,
  PostCardsListWrapper,
  SocialProfile,
  TabsViewer,
  ShopCardsListWrapper,
  AffiliationOffersCardListWrapper,
  FilterModal,
  SocialPostsCommentsDrawer,
  ShareWithModal,
  SocialServicePostsList,
  Divider,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  AffiliationIcon,
  HomeIcon,
  HStack,
  PlayButtonFillIcon,
  ServicesIcon,
  ShoppingCartIcon,
  useGetSocialProfileQuery,
  ProfileVisibility,
  AccountType,
} from "ui";
import {
  PostCommentPlaceholder,
  postProfilesPlaceholder,
  ShopCardsInfoPlaceholder,
  socialAffiliationCardPlaceholders,
} from "placeholder";
import { TabType } from "types";
import { PostComment } from "types";
import { products } from "placeholder";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useBreakpointValue } from "utils";
import { useTypedReactPubsub } from "@libs";

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

export interface SocialViewProps {
  profileId: string;
}

export const SocialView: React.FC<SocialViewProps> = ({ profileId }) => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const cols = useBreakpointValue({ base: 3 });
  const ActionsCols = useBreakpointValue({ base: 3, xl: 5 });
  const { emit } = useTypedReactPubsub(
    (events) => events.openSocialShopPostsFilterDrawer
  );

  const { data: profile } = useGetSocialProfileQuery(profileId);

  const sellerTabs: TabType[] = [
    {
      name: (
        <HStack>
          <p>{t("Newsfeed")}</p>
          <HomeIcon />
        </HStack>
      ),
      component: (
        <PostCardsListWrapper
          cols={cols}
          // posts={[]}
        />
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Shop")}</p>
          <ShoppingCartIcon />
        </HStack>
      ),
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
              <MenuList className="left-[0px]" origin="top left">
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
      name: (
        <HStack>
          <p>{t("Service")}</p>
          <ServicesIcon />
        </HStack>
      ),
      component: <SocialServicePostsList posts={[]} />,
    },
    {
      name: (
        <HStack>
          <p>{t("Affilation Offers")}</p>
          <AffiliationIcon />
        </HStack>
      ),
      component: (
        <AffiliationOffersCardListWrapper
          // grid={isMobile}
          cols={cols}
          items={socialAffiliationCardPlaceholders}
        />
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Actions")}</p>
          <PlayButtonFillIcon />
        </HStack>
      ),
      component: <div> to be implemented</div>,
    },
  ];
  const buyerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: (
        <PostCardsListWrapper
          cols={cols}
          // posts={[]}
        />
      ),
    },
  ];

  const tabsSet =
    profile.user.type === AccountType.Seller ? sellerTabs : buyerTabs;

  return (
    <>
      <ShareWithModal />
      <SocialPostsCommentsDrawer />
      <div className="flex gap-4 flex-col">
        <SocialProfile profileInfo={profile} />
        <Container className="flex-grow gap-4 flex-col">
          {profile && profile.visibility === ProfileVisibility.Public ? (
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
    </>
  );
};
