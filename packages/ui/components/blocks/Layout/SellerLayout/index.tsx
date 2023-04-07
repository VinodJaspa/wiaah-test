import React from "react";
import { HiMenu, HiOutlineUserCircle } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgShoppingBag } from "react-icons/cg";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { SellerDrawerOpenState } from "state";
import { NavigationLinkType } from "types";
import {
  MinimalHeader,
  DiscoverHeader,
  HeaderNavLink,
  SellerNavigationSideBar,
  SellerHeader,
  Root,
  Container,
  UsersProfiles,
  HomeIcon,
  DiscoverIcon,
  AffiliationIcon,
  ShoppingCartIcon,
  ServicesIcon,
  PlayButtonFillIcon,
  HStack,
  HashtagIcon,
  LocationButton,
  Divider,
  ScrollableContainer,
  SocialReportModal,
  SocialPostSettingsPopup,
  MasterLocationMapModal,
  SocialShareCotentModal,
  SocialPostMentionsModal,
  StarOutlineIcon,
  usePaginationControls,
  useGetRecentStories,
  useGetDiscoverHashtags,
} from "@UI";
import { useResponsive, useAccountType } from "hooks";
import { HtmlDivProps } from "types";
import { getRouting } from "routing";
import { BsShop } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { useGetDiscoverPlaces } from "@features/Social/services/Queries/Discover/useGetDiscoverPlaces";

export const usersProfilesPlaceHolder = [
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "Hotel",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Bar",
    verified: false,
  },
  {
    name: "sam",
    userPhotoSrc: "/shop-2.jpeg",
    activityType: "Singer",
    verified: true,
  },
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "MarketPlace",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Artist",
    verified: false,
  },
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "Hotel",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Bar",
    verified: false,
  },
  {
    name: "sam",
    userPhotoSrc: "/shop-2.jpeg",
    activityType: "Singer",
    verified: true,
  },
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "MarketPlace",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Artist",
    verified: false,
  },
];
export const placesPlaceholder: string[] = [
  "shop",
  "hotel",
  "restaurant",
  "health center",
  "vehicle",
  "shop",
  "hotel",
  "restaurant",
  "health center",
  "vehicle",
];

export const hashtagsPlaceholder: string[] = [
  "Fashion",
  "Gaming",
  "Food",
  "Sports",
  "Relaxing",
  "Fashion",
  "Gaming",
  "Food",
  "Sports",
  "Relaxing",
];
export type HeadersTypes = "main" | "discover" | "minimal";

export interface SellerLayoutProps {
  header?: HeadersTypes;
  sideBar?: boolean;
  containerProps?: HtmlDivProps;
  noContainer?: boolean;
}

export const SellerLayout: React.FC<SellerLayoutProps> = ({
  children,
  header = "main",
  containerProps,
  sideBar = true,
  noContainer = false,
}) => {
  const NavigationLinks: NavigationLinkType[] = [
    {
      name: "Home",
      icon: HomeIcon,
      url: "",
    },
    {
      name: "discover",
      icon: DiscoverIcon,
      url: "discover",
    },
    {
      name: "action",
      icon: PlayButtonFillIcon,
      url: "action",
    },
    {
      name: "shop",
      icon: ShoppingCartIcon,
      url: "shop",
    },
    {
      name: "service",
      icon: ServicesIcon,
      url: "services",
    },
    {
      name: "affiliation",
      icon: AffiliationIcon,
      url: "affiliation",
    },
  ];
  const { accountType } = useAccountType();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  const { isMobile } = useResponsive();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const headerHeight = headerRef?.current?.offsetHeight;
  const router = useRouter();
  const route =
    router && typeof router.pathname === "string"
      ? router.pathname.split("/")[1]
      : "";

  const handleLinkClick = (link: NavigationLinkType) => {
    const Link = link.url.length < 1 ? "/" : link.url;
    router.replace(Link);
    setDrawerOpen(false);
  };

  const { pagination } = usePaginationControls();
  const { data } = useGetDiscoverPlaces({
    pagination,
  });

  const { pagination: storiesPagination } = usePaginationControls();

  const { data: stories } = useGetRecentStories({
    pagination: storiesPagination,
  });

  const { pagination: hashtagPagi } = usePaginationControls();
  const { data: hashtags } = useGetDiscoverHashtags({
    pagination: hashtagPagi,
  });

  return (
    <Root>
      <SocialReportModal />
      <SocialShareCotentModal />
      <SocialPostSettingsPopup />
      <SocialPostMentionsModal />
      <MasterLocationMapModal />
      {sideBar && (
        <SellerNavigationSideBar
          headerElement={
            <HiMenu cursor={"pointer"} onClick={() => setDrawerOpen(true)} />
          }
          links={NavigationLinks}
          onLinkClick={handleLinkClick}
          activeLink={route}
        >
          <div className="flex flex-col gap-4">
            <UsersProfiles
              maxNarrowItems={5}
              users={
                stories?.map((v) => ({
                  id: v.userId,
                  profession: v.user?.profile?.profession || "",
                  name: v.user?.profile?.username || "",
                  userPhotoSrc: v.user?.profile?.photo || "",
                })) || []
              }
            />
            {stories && stories.length > 0 ? <Divider /> : null}
            <div className="text-white flex flex-col gap-4">
              <ScrollableContainer
                containerProps={{ className: "gap-4" }}
                autoShowAll
                maxInitialItems={5}
              >
                {placesPlaceholder.map((place, i) => (
                  <LocationButton
                    iconProps={{ className: "text-black" }}
                    name={place}
                    key={i}
                  />
                ))}
              </ScrollableContainer>
            </div>
            <Divider />
            <ScrollableContainer
              containerProps={{ className: "gap-4" }}
              autoShowAll
              maxInitialItems={5}
            >
              {hashtags?.map((tag, i) => (
                <HStack className="text-white gap-[1rem]" key={i}>
                  <HashtagIcon className="p-2 text-3xl rounded-full bg-white" />
                  <p>{tag}</p>
                </HStack>
              )) || []}
            </ScrollableContainer>
          </div>
        </SellerNavigationSideBar>
      )}
      <Container
        noContainer={true}
        className={`${
          isMobile ? "px-4" : sideBar ? "pl-56 pr-4" : "px-8"
        } h-full`}
      >
        {header && header !== null && (
          <div
            className={`bg-white fixed z-10 w-full top-0 left-0 ${
              isMobile ? "px-4" : sideBar ? "pl-60 pr-8" : "px-8"
            }`}
            ref={headerRef}
          >
            <HeaderSwitcher
              links={accountType === "buyer" ? BuyerNavLinks : SellerNavLinks}
              headerType={header}
            />
          </div>
        )}
        <div className="w-full h-full gap-4 flex flex-col justify-between">
          <main
            style={{
              paddingTop: `calc(${headerHeight || 0}px + 2rem)`,
            }}
            className={`${
              containerProps?.className || ""
            } overflow-hidden h-[max(fit,100%)]`}
            {...containerProps}
          >
            {children}
          </main>
        </div>
      </Container>
    </Root>
  );
};

export interface HeaderSwitcherProps {
  headerType: HeadersTypes;
  links: HeaderNavLink[];
}

export const HeaderSwitcher: React.FC<HeaderSwitcherProps> = ({
  headerType,
  links = [],
}) => {
  switch (headerType) {
    case "discover":
      return <DiscoverHeader />;
    case "minimal":
      return <MinimalHeader />;
    default:
      return <SellerHeader headerNavLinks={links} />;
  }
};

const BuyerNavLinks: HeaderNavLink[] = [
  {
    link: {
      name: {
        translationKey: "profile",
        fallbackText: "Profile",
      },
      href: "/myprofile",
    },
    icon: HiOutlineUserCircle,
  },
  {
    link: {
      name: {
        translationKey: "settings",
        fallbackText: "Settings",
      },
      href: "/settings",
    },
    icon: IoSettingsOutline,
  },
  {
    link: {
      name: {
        translationKey: "shopping_management",
        fallbackText: "Shopping Management",
      },
      href: "/shopping-management",
    },
    icon: CgShoppingBag,
  },
  {
    link: {
      name: {
        translationKey: "wallet",
        fallbackText: "Wallet",
      },
      href: "/wallet",
    },
    icon: BiWallet,
  },
  {
    link: {
      name: {
        translationKey: "log_out",
        fallbackText: "Log out",
      },
      href: "logout",
    },
    icon: null,
  },
];

const SellerNavLinks: HeaderNavLink[] = [
  {
    link: {
      name: {
        translationKey: "profile",
        fallbackText: "Profile",
      },
      href: "/myprofile",
    },
    icon: HiOutlineUserCircle,
  },
  {
    link: {
      name: {
        translationKey: "account_settings",
        fallbackText: "Account Settings",
      },
      href: getRouting((r) => r.visitAccountSettings()),
    },
    icon: IoSettingsOutline,
  },
  {
    icon: () => <StarOutlineIcon />,
    link: {
      href: "/saved",
      name: {
        translationKey: "Saved",
        fallbackText: "Saved",
      },
    },
  },
  {
    link: {
      name: {
        translationKey: "shop_management",
        fallbackText: "Shop Management",
      },
      href: getRouting((r) => r.visitShopManagement()),
    },
    icon: BsShop,
  },
  {
    link: {
      name: {
        translationKey: "service_management",
        fallbackText: "Service Management",
      },
      href: getRouting((r) => r.visitServiceManagement()),
    },
    icon: () => <ServicesIcon />,
  },
  {
    link: {
      name: {
        translationKey: "shopping_management",
        fallbackText: "Shopping Management",
      },
      href: getRouting((r) => r.visitShoppingManagement()),
    },
    icon: CgShoppingBag,
  },
  {
    link: {
      name: {
        translationKey: "wallet",
        fallbackText: "Wallet",
      },
      href: "/wallet",
    },
    icon: BiWallet,
  },
  {
    link: {
      name: {
        translationKey: "log_out",
        fallbackText: "Log out",
      },
      href: "/logout",
    },
    icon: null,
  },
];
