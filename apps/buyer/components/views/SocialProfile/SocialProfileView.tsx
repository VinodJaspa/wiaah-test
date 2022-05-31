import { useBreakpointValue } from "@chakra-ui/react";
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
} from "ui";
import {
  useGetSocialProfile,
  ShopCardsInfoPlaceholder,
  socialAffiliationCardPlaceholders,
  profileActionsPlaceholder,
} from "ui";
import { TabType } from "types/market/misc/tabs";
import { useRecoilValue } from "recoil";
import { SocialNewsfeedPostsState } from "ui/state";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// const images: string[] = [...products.map((pro) => pro.imgUrl)];
// export const getRandomUser = () =>
//   postProfilesPlaceholder[
//     Math.floor(Math.random() * postProfilesPlaceholder.length)
//   ];
// const comments: PostComment[] = [
//   {
//     ...PostCommentPlaceholder,
//     user: getRandomUser(),
//     content: "nice video",
//     attachment: {
//       src: "/shop.jpeg",
//       type: "image",
//     },
//   },
//   {
//     ...PostCommentPlaceholder,
//     user: getRandomUser(),
//     content: "nice video",
//     attachment: null,
//   },
//   {
//     ...PostCommentPlaceholder,
//     user: getRandomUser(),
//     content: "nice video",
//     attachment: null,
//   },
//   {
//     ...PostCommentPlaceholder,
//     user: getRandomUser(),
//     content: "nice video",
//     attachment: null,
//   },

//   {
//     ...PostCommentPlaceholder,
//     user: getRandomUser(),
//     content: "nice video",
//     attachment: null,
//   },
// ];

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

  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
  const sellerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: (
        <PostCardsListWrapper
          grid={isMobile}
          cols={cols}
          posts={newsfeedPosts}
        />
      ),
    },
    {
      name: t("shop", "shop"),
      component: (
        <div className="flex flex-cl gap-4">
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
            grid={isMobile}
            cols={cols}
            items={ShopCardsInfoPlaceholder}
          />
        </div>
      ),
    },
    {
      name: t("affiliation offers", "affiliation offers"),
      component: (
        <AffiliationOffersCardListWrapper
          grid={isMobile}
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
    <div className="flex flex-col h-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <Container className="flex-grow flex-col">
          <div className="w-full flex overflow-hidden relative max-h-[26rem]">
            <SocialProfile shopInfo={profileInfo} />
            <SocialPostsCommentsDrawer />
            <ShareWithModal />
            <img
              src="/shop.jpeg"
              className=" top-0 left-0 w-full bg-black bg-opacity-20 -z-10 h-full md:h-auto object-cover"
            />
          </div>
          {profileInfo && (
            <>
              {profileInfo.public ? (
                <>
                  <TabsViewer
                    tabs={
                      profileInfo.accountType === "seller"
                        ? sellerTabs
                        : buyerTabs
                    }
                  />
                  <Divider className="my-4" />
                </>
              ) : (
                <>
                  <div className="h-full flex items-center justify-center">
                    <p className="font-bold capitalize w-fit text-4xl">
                      {t("this_profile_is_private", "this profile is private")}
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
