import React from "react";
import {
  SellerNavigationSideBar,
  SellerNavigationDrawer,
  SellerHeader,
  Root,
  Container,
} from "ui";
import { HiMenu, HiHome, HiOutlineHome } from "react-icons/hi";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { IoEarth, IoEarthOutline } from "react-icons/io5";
import { CgPlayButtonR } from "react-icons/cg";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import { UsersProfiles } from "ui";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";
import { useSetRecoilState } from "recoil";
import { SellerDrawerOpenState } from "ui/state";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  // useResponsive,
  MinimalHeader,
  DiscoverHeader,
  LocationButton,
  SocialFooter,
} from "ui";
import { HtmlDivProps } from "types";
import { Divider } from "../../../partials";

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
  const { t } = useTranslation();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  // const { isMobile } = useResponsive();
  const isMobile = false;
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
            <LocationButton style={{ px: "2rem" }} name={place} key={i} />
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
          isMobile ? "px-4" : sideBar ? "pl-20 pr-4" : "px-8"
        } h-full`}
      >
        {header && header !== null && (
          <div
            className="bg-white fixed z-10 w-full top-0 left-0"
            ref={headerRef}
          >
            <Container
              className={`${
                isMobile ? "px-4" : sideBar ? "pl-20 pr-4" : "px-8"
              }`}
            >
              <HeaderSwitcher headerType={header} />
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
          <SocialFooter copyRightYear={2022} />
        </div>
      </Container>
    </Root>
  );
};

export interface HeaderSwitcherProps {
  headerType: HeadersTypes;
}

export const HeaderSwitcher: React.FC<HeaderSwitcherProps> = ({
  headerType,
}) => {
  switch (headerType) {
    case "discover":
      return <DiscoverHeader />;
    case "minimal":
      return <MinimalHeader />;
    default:
      return <SellerHeader />;
  }
};
