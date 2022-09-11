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
  SocialFooter,
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
} from "ui";
import { useResponsive, useAccountType } from "hooks";
import { HtmlDivProps } from "types";
import { BsShop } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
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
];

export const hashtagsPlaceholder: string[] = [
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

  return (
    <Root>
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
              users={usersProfilesPlaceHolder}
            />
            <Divider />
            <div className="text-white flex flex-col gap-4">
              {placesPlaceholder.map((place, i) => (
                <LocationButton
                  iconProps={{ className: "" }}
                  name={place}
                  key={i}
                />
              ))}
            </div>
            <Divider />
            {hashtagsPlaceholder.map((tag, i) => (
              <HStack className="text-white gap-[1rem]" key={i}>
                <HashtagIcon className="p-2 text-3xl rounded-full bg-white" />
                <p>{tag}</p>
              </HStack>
            ))}
          </div>
        </SellerNavigationSideBar>
      )}
      <Container
        noContainer={noContainer}
        className={`${
          isMobile ? "px-4" : sideBar ? "pl-52 pr-4" : "px-8"
        } h-full`}
      >
        {header && header !== null && (
          <div
            className="bg-white fixed z-10 w-full top-0 left-0"
            ref={headerRef}
          >
            <Container
              className={`${
                isMobile ? "px-4" : sideBar ? "pl-52 pr-4" : "px-8"
              }`}
            >
              <HeaderSwitcher
                links={accountType === "buyer" ? BuyerNavLinks : SellerNavLinks}
                headerType={header}
              />
            </Container>
          </div>
        )}
        <div className="w-full h-full gap-4 flex flex-col justify-between">
          <main
            style={{
              paddingTop: `calc(${headerHeight || 0}px + 2rem)`,
            }}
            className="pb-24 sm:pb-0 h-[max(fit,100%)]"
            {...containerProps}
          >
            {children}
          </main>
          {!isMobile && <SocialFooter copyRightYear={2022} />}
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
      href: "/account-settings",
    },
    icon: IoSettingsOutline,
  },
  {
    link: {
      name: {
        translationKey: "shop_management",
        fallbackText: "Shop Management",
      },
      href: "/shop-management",
    },
    icon: BsShop,
  },
  {
    link: {
      name: {
        translationKey: "service_management",
        fallbackText: "Service Management",
      },
      href: "/service-management",
    },
    icon: BsShop,
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
