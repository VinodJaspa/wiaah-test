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
  SpinnerFallback,
  newsfeedPosts,
  Divider,
  SocialServicePostsList,
  HomeIcon,
  ShoppingCartIcon,
  ServicesIcon,
  AffiliationIcon,
  PlayButtonFillIcon,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "ui";
import {
  useGetSocialProfile,
  ShopCardsInfoPlaceholder,
  socialAffiliationCardPlaceholders,
  profileActionsPlaceholder,
} from "ui";
import { TabType } from "types";
import { useRecoilValue } from "recoil";
import { SocialNewsfeedPostsState } from "ui";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { useBreakpointValue } from "utils";

export interface SocialViewProps {
  profileId: string;
}

export const SocialView: React.FC<SocialViewProps> = ({ profileId }) => {
  const { t } = useTranslation();
  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useGetSocialProfile(profileId);
  const { isMobile } = useResponsive();
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  const cols = useBreakpointValue({ base: 3 });
  const ActionsCols = useBreakpointValue({ base: 3, xl: 5 });
  const { emit } = useReactPubsub(
    (events) => events.openSocialShopPostsFilterDrawer
  );

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
          grid={isMobile}
          cols={cols}
          posts={[...Array(9)].reduce((acc) => {
            return [...acc, ...newsfeedPosts.slice(0, 8)];
          }, [])}
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
          <ShopCardsListWrapper cols={cols} items={ShopCardsInfoPlaceholder} />
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
      component: <SocialServicePostsList />,
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
          grid={isMobile}
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
      name: (
        <HStack>
          <p>{t("Newsfeed")}</p>
          <HomeIcon />
        </HStack>
      ),
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <Container className="flex-grow flex-col flex gap-7">
          {/* <div className="w-full flex justify-center overflow-hidden relative h-[26rem]"> */}
          {profileInfo ? (
            <SocialProfile shopInfo={{ ...profileInfo.data }} />
          ) : null}
          <SocialPostsCommentsDrawer />
          <ShareWithModal />
          {/* </div> */}
          {profileInfo && (
            <>
              {profileInfo.data.public ? (
                <>
                  <TabsViewer
                    tabs={
                      profileInfo.data.accountType === "seller"
                        ? sellerTabs
                        : buyerTabs
                    }
                  ></TabsViewer>
                  <Divider className="my-4" />
                </>
              ) : (
                <>
                  <div className="h-full flex items-center justify-center">
                    <p className="font-bold w-fit text-4xl">
                      {t("This Profile is Private")}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </SpinnerFallback>
    </div>
  );
};
