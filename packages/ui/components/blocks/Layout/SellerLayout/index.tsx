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
import { Box, BoxProps, Divider, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { SellerDrawerOpenState } from "ui/state";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  useResponsive,
  MinimalHeader,
  DiscoverHeader,
  LocationButton,
} from "ui";

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
  containerProps?: BoxProps;
}

export const SellerLayout: React.FC<SellerLayoutProps> = ({
  children,
  header = "main",
  containerProps,
  sideBar = true,
}) => {
  const { t } = useTranslation();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  const { isMobile } = useResponsive();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const headerHeight = headerRef?.current?.offsetHeight;
  const router = useRouter();
  const route = router.pathname.split("/")[1];

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
        <Text
          textTransform={"capitalize"}
          px="2rem"
          py="1rem"
          fontWeight={"bold"}
        >
          {t("discover_your_town", "discover your town")}
        </Text>

        <Flex direction={"column"} gap="1rem">
          {placesPlaceholder.map((place, i) => (
            <LocationButton
              style={{ px: "2rem" }}
              locationName={place}
              key={i}
            />
          ))}
        </Flex>
        <Divider />
        <Box textTransform={"capitalize"} px="2rem">
          <Text py="1rem" fontWeight={"bold"} textTransform={"capitalize"}>
            {t("suggestions", "suggestions")}
          </Text>
          <UsersProfiles
            maxShowMoreItems={8}
            maxLongItems={5}
            variant="long"
            users={usersProfilesPlaceHolder}
          />
        </Box>
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
        className={`${
          isMobile ? "px-4" : sideBar ? "pl-24 pr-8" : "px-8"
        } h-full`}
      >
        {header && (
          <Box
            ref={headerRef}
            bgColor={"white"}
            position="fixed"
            zIndex={10}
            w="100%"
            top="0px"
            left="0px"
          >
            <Container
              className={`${
                isMobile ? "px-4" : sideBar ? "pl-24 pr-8" : "px-8"
              }`}
            >
              <HeaderSwitcher headerType={header} />
            </Container>
          </Box>
        )}
        <Box
          {...containerProps}
          pt={`calc(${headerHeight || 0}px + 1rem)`}
          as={"main"}
        >
          {children}
        </Box>
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
