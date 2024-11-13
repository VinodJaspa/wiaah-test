import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import {
  Container,
  PostCardsListWrapper,
  SocialProfile,
  AffiliationOffersCardListWrapper,
  SocialPostsCommentsDrawer,
  ShareWithModal,
  SpinnerFallback,
  newsfeedPosts,
  Divider,
  SocialProfileProps,
  SocialNewsfeedPostsState,
  TabsViewer,
  SocialProfileShopPostsList,
  ShopCardsListWrapper,
  SocialShopsPostCardPlaceholder,
  FilterModal,
  SocialShopPostcardProps,
  VideoThumbnail,
  ListWrapper,
  NewsFeedIcon,
  NewsFeedOutlineIcon,
  ServicesOutlineIcon,
  ServicesIcon,
  ServiceCardsListWrapper,
  SocialServicePostCardPlaceholder,
  MoreOptionsPopup,
} from "ui";
import { HiDotsVertical } from "react-icons/hi";
import { useGetSocialProfile } from "ui";
import { getRandomImage, socialAffiliationCardPlaceholders } from "placeholder";
import { CashbackType, PresentationType, TabType } from "types";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import {
  AccountType,
  ActiveStatus,
  ProfileVisibility,
  ServiceType,
  StoreType,
} from "@features/API";
import { MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import {
  ShoppingCartOutlineIcon,
  ShoppingCartIcon,
  AffiliationIconOutline,
  AffiliationIcon,
} from "ui";
import { useResponsive } from "hooks";
import { AffiliationCardsListWrapper } from "../AffiliationPostListWrapper";
import { ActionsCardListWrapper } from "../ActionsCardsListWrapper";

export interface SocialViewProps {
  profileId?: string;
}

export const SocialView: React.FC<SocialViewProps> = ({ profileId }) => {
  const { t } = useTranslation();
  const {
    data: _res,
    isLoading,
    isError,
  } = useGetSocialProfile(profileId || "");
  const { isMobile } = useResponsive();
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  const cols = useBreakpointValue({ base: 3 });
  const ActionsCols = useBreakpointValue({ base: 3, xl: 5 });
  const image = React.useMemo(() => getRandomImage(), []);

  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);

  const profileInfo = FAKE_DATA.data;

  const tabs: TabType[] = [
    {
      name: t("news_feed", "NEWSFEED"),
      component: <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />,
      outlineIcon: <NewsFeedOutlineIcon className="w-full h-full" />,
      solidIcon: <NewsFeedIcon className="w-full h-full" />,
    },
    {
      name: t("shop", "SHOP"),
      component: (
        <ShopCardsListWrapper
          cols={cols}
          items={SocialShopsPostCardPlaceholder}
        />
      ),
      outlineIcon: (
        <ShoppingCartOutlineIcon className=" text-black w-full h-full " />
      ),
      solidIcon: <ShoppingCartIcon className="w-full h-full" />,
    },
    {
      name: t("service", "SERVICE"),

      component: (
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="flex justify-end">
            <div
              onClick={() => {
                setFilterOpen(true);
              }}
              className="filter-button mr-2 flex items-center justify-between rounded-lg border p-2 text-xs "
            >
              <samp>{t("Filter", "Filter")}</samp>
              <FaChevronDown className="ml-2" />
            </div>
          </div>
          <FilterModal />
          <ServiceCardsListWrapper
            cols={cols}
            items={SocialServicePostCardPlaceholder}
          />
        </div>
      ),
      outlineIcon: <ServicesOutlineIcon className="w-full h-full text-black" />,
      solidIcon: <ServicesIcon className="w-full h-full" />,
    },
    {
      name: t("affiliation", "AFFILIATION"),
      component: (
        <AffiliationCardsListWrapper cols={cols} posts={newsfeedPosts} />
      ),
      outlineIcon: (
        <AffiliationIconOutline className=" text-black w-full h-full " />
      ),
      solidIcon: <AffiliationIcon className="w-full h-full" />,
    },
    {
      name: t("actions", "ACTIONS"),
      component: <ActionsCardListWrapper videos={FAKE_VIDEOS} />,
      outlineIcon: <MdOutlineVideoLibrary className="w-full h-full" />,
      solidIcon: <MdVideoLibrary className="w-full h-full" />,
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <MoreOptionsPopup className="absolute z-20 top-4 right-4 text-white text-2xl" />
      <div className="absolute md:hidden visible top-[-420px] bg-[#3ad398]  h-[580px]  w-[1300px] rounded-b-full"></div>
      <div className="flex flex-col h-full md:w-9/12 w-11/12 justify-center ">
        <SpinnerFallback isLoading={false} isError={isError}>
          <Container className="flex-grow flex-col">
            <div className="w-full flex overflow-hidden items-center justify-center md:max-h-[26rem] h-fit relative ">
              <SocialProfile
                storeType={
                  FAKE_PROFILE_INFO.user?.shop.storeType || StoreType.Product
                }
                isFollowed={true}
                isPublic={FAKE_PROFILE_INFO.visibility}
                profileInfo={FAKE_PROFILE_INFO}
              />
              <SocialPostsCommentsDrawer />
              <ShareWithModal />
            </div>
            {profileInfo && (
              <>
                {profileInfo.public ? (
                  <>
                    <TabsViewer tabs={tabs}></TabsViewer>
                    <Divider className="my-4" />
                  </>
                ) : (
                  <>
                    <div className="h-full flex items-center justify-center">
                      <p className="font-bold capitalize w-fit text-4xl">
                        {t(
                          "this_profile_is_private",
                          "this profile is private",
                        )}
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </Container>
        </SpinnerFallback>
      </div>
    </div>
  );
};

const FAKE_PROFILE_INFO: SocialProfileProps["profileInfo"] = {
  activeStatus: ActiveStatus.Active,
  bio: "This is a a bit long bio smaple to check the design .",
  createdAt: new Date().toISOString(),
  followers: 1100,
  following: 1510,
  id: "profile-123",
  lastActive: new Date().toISOString(),
  ownerId: "owner-456",
  photo: getRandomImage(),
  profession: "Software Developer",
  publications: 143,
  updatedAt: new Date().toISOString(),
  username: "sampleuser",
  visibility: ProfileVisibility.Public,
  verified: true,
  user: {
    __typename: "Account",
    id: "account-789",
    verified: true,
    accountType: AccountType.Seller,
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
    accountType: "seller",
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
    user: {
      __typename: "Account",
      id: "account-789",
      verified: true,
      accountType: AccountType.Seller,
      shop: {
        __typename: "Shop",
        type: ServiceType.Hotel,
        storeType: StoreType.Product,
        id: "shop-101",
      },
    },
    profileCoverPhoto: getRandomImage(),
    publications: 156,
    subscribers: 135,
    subscriptions: 14,
    profession: "Agent",
  },
};

const FAKE_VIDEOS = [
  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "230",
    description: "This is a short video description.",
  },
  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "450",
    description: "This is a short video description.",
  },

  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "1100",
    description: "This is a short video description.",
  },

  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },

  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },

  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },

  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },

  {
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: "7800",
    description: "This is a short video description.",
  },
];
