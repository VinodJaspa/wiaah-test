import React from "react";
import {
  HiMenu,
  HiHome,
  HiOutlineHome,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { IoEarth, IoEarthOutline, IoSettingsOutline } from "react-icons/io5";
import { CgPlayButtonR, CgShoppingBag } from "react-icons/cg";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { SellerDrawerOpenState } from "state";
import { NavigationLinkType } from "types";
import {
  MinimalHeader,
  DiscoverHeader,
  LocationButton,
  SocialFooter,
  Divider,
  HeaderNavLink,
  SellerNavigationSideBar,
  SellerNavigationDrawer,
  SellerHeader,
  Root,
  Container,
  UsersProfiles,
} from "ui";
import { useResponsive, useAccountType } from "hooks";
import { HtmlDivProps } from "types";
import { BsShop } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";

const NavigationLinks: NavigationLinkType[] = [
  {
    name: "homepage",
    icon: HiOutlineHome,
    activeIcon: HiHome,
    url: "",
  },
  {
    name: "discover",
    icon: IoEarthOutline,
    activeIcon: IoEarth,
    url: "discover",
  },
  {
    name: "action",
    icon: CgPlayButtonR,
    activeIcon: CgPlayButtonR,
    url: "action",
  },
  {
    name: "shop",
    icon: AiOutlineShop,
    activeIcon: AiFillShop,
    url: "shop",
    size: {
      w: "1.2em",
      h: "1.2em",
    },
  },
  {
    name: "affiliation",
    icon: FaRegUserCircle,
    activeIcon: FaUserCircle,
    url: "affiliation",
    size: {
      w: "1.2em",
      h: "1.2em",
    },
  },
];

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
  "babershop",
  "restaurant",
  "theatre museum",
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
  const { accountType } = useAccountType();
  const { t } = useTranslation();
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
      <SellerNavigationDrawer
        activeLink={route}
        onLinkClick={handleLinkClick}
        links={NavigationLinks}
      >
        <p className="capitalize px-8 py-4 font-bold">
          {t("discover_your_town", "discover your town")}
        </p>

        <div className="flex flex-col gap-4">
          {placesPlaceholder.map((place, i) => (
            <LocationButton
              iconProps={{ className: "px-8" }}
              name={place}
              key={i}
            />
          ))}
        </div>
        <Divider />
        <div className="capitalize px-8">
          <span className="py-4 font-bold capitalize">
            {t("suggestions", "suggestions")}
          </span>
          <UsersProfiles
            maxShowMoreItems={8}
            maxLongItems={5}
            variant="long"
            users={usersProfilesPlaceHolder}
          />
        </div>
      </SellerNavigationDrawer>
      {sideBar && (
        <SellerNavigationSideBar
          headerElement={
            <HiMenu cursor={"pointer"} onClick={() => setDrawerOpen(true)} />
          }
          links={NavigationLinks}
          onLinkClick={handleLinkClick}
          activeLink={route}
        >
          <UsersProfiles maxNarrowItems={5} users={usersProfilesPlaceHolder} />
        </SellerNavigationSideBar>
      )}
      <Container
        noContainer={noContainer}
        className={`${
          isMobile ? "px-4" : sideBar ? "pl-24 pr-4" : "px-8"
        } h-full`}
      >
        {header && header !== null && (
          <div
            className="bg-white fixed z-10 w-full top-0 left-0"
            ref={headerRef}
          >
            <Container
              className={`${
                isMobile ? "px-4" : sideBar ? "pl-24 pr-4" : "px-8"
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
              paddingTop: `calc(${headerHeight || 0}px + 1rem)`,
            }}
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
