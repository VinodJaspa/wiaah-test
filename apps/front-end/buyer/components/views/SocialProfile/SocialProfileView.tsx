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
  SocialPostsCommentsDrawer,
  ShareWithModal,
  SpinnerFallback,
  newsfeedPosts,
  Divider,
  SocialProfileProps,
  Image,
} from "ui";
import {
  useGetSocialProfile,
  ShopCardsInfoPlaceholder,
  profileActionsPlaceholder,
} from "ui";
import { SocialShopsPostCardPlaceholder } from "ui/placeholder";
import {
  getRandomImage,
  PostCardPlaceHolder,
  socialAffiliationCardPlaceholders,
  SocialProfileInfo,
} from "placeholder";
import { TabType } from "types";
import { useRecoilValue } from "recoil";
import { SocialNewsfeedPostsState } from "state";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
  AccountType,
  ActiveStatus,
  ProfileVisibility,
  ServiceType,
  StoreType,
} from "@features/API";
import { SocialActionsView } from "../SocialActionsView";

export interface SocialViewProps {
  profileId: string;
}

export const SocialView: React.FC<SocialViewProps> = ({ profileId }) => {
  const { t } = useTranslation();
  const { data: _res, isLoading, isError } = useGetSocialProfile(profileId);
  const { isMobile } = useResponsive();
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  const cols = useBreakpointValue({ base: 3 });
  const ActionsCols = useBreakpointValue({ base: 3, xl: 5 });
  const image = React.useMemo(() => getRandomImage(), []);

  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);

  const profileInfo = FAKE_DATA.data;

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
          <FilterModal />
          <ShopCardsListWrapper
            grid={isMobile}
            cols={cols}
            items={SocialShopsPostCardPlaceholder}
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
      component: <SocialActionsView />,
    },
  ];
  const buyerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />,
    },
    {
      name: t("actions", "Actions"),
      component: <SocialActionsView />,
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <Container className="flex-grow flex-col">
          <div className="w-full flex overflow-hidden relative max-h-[26rem]">
            <SocialProfile
              storeType={FAKE_PROFILE_INFO.user.shop.storeType}
              isFollowed={true}
              isPublic={FAKE_PROFILE_INFO.visibility}
              profileInfo={FAKE_PROFILE_INFO}
            />
            <SocialPostsCommentsDrawer />
            <ShareWithModal />
            <Image
              alt="thumbnail"
              src={image}
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
                  ></TabsViewer>

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

const FAKE_PROFILE_INFO: SocialProfileProps["profileInfo"] = {
  activeStatus: ActiveStatus.Active,
  bio: "This is a sample bio.",
  createdAt: new Date().toISOString(),
  followers: 100,
  following: 50,
  id: "profile-123",
  lastActive: new Date().toISOString(),
  ownerId: "owner-456",
  photo: getRandomImage(),
  profession: "Software Developer",
  publications: 2,
  updatedAt: new Date().toISOString(),
  username: "sampleuser",
  visibility: ProfileVisibility.Public,
  verified: true,
  user: {
    __typename: "Account",
    id: "account-789",
    verified: true,
    accountType: AccountType.Buyer,
    shop: {
      __typename: "Shop",
      type: ServiceType.Hotel,
      storeType: StoreType.Product,
      id: "shop-101",
    },
  },
};

const FAKE_DATA = {
  data: {
    accountType: "buyer",
    userId: "1325",
    id: "1230",
    name: "Jane Daniel",
    public: true,
    thumbnail: getRandomImage(),
    verified: true,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend diam cras eu felis egestas aliquam. Amet ornare",
    isFollowed: false,
    links: ["this is a test link"],
    location: {
      address: "address",
      city: "city",
      lat: 32,
      lon: 23,
      country: "country",
      countryCode: "CH",
      postalCode: 1234,
      state: "Geneve",
    },
    profileCoverPhoto: getRandomImage(),
    publications: 156,
    subscribers: 135,
    subscriptions: 14,
    profession: "Agent",
  },
};
