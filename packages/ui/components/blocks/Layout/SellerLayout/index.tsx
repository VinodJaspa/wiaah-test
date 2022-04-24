import React from "react";
import {
  SellerNavigationSideBar,
  SellerNavigationDrawer,
  SellerHeader,
  Root,
  Container,
} from "ui";
import {
  HiUserGroup,
  HiOutlineUserGroup,
  HiMenu,
  HiHome,
  HiOutlineHome,
  HiLocationMarker,
} from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";
import { CgPlayButtonR } from "react-icons/cg";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";
import { AffiliationIcon, AffiliationIconOutline, UsersProfiles } from "ui";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { SellerDrawerOpenState } from "ui/state";
import { useTranslation } from "react-i18next";
const NavigationLinks: NavigationLinkType[] = [
  {
    name: "homepage",
    icon: HiOutlineHome,
    activeIcon: HiHome,
  },
  {
    name: "discover",
    icon: HiOutlineUserGroup,
    activeIcon: HiUserGroup,
  },
  {
    name: "action",
    icon: CgPlayButtonR,
    activeIcon: IoVideocam,
  },
  {
    name: "shop",
    icon: AiOutlineShop,
    activeIcon: AiFillShop,
  },
  {
    name: "affiliation",
    icon: () => <AffiliationIconOutline />,
    activeIcon: () => <AffiliationIcon />,
  },
];

const usersProfilesPlaceHolder = [
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

const places: string[] = [
  "shop",
  "hotel",
  "babershop",
  "restaurant",
  "theatre museum",
];

export const SellerLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  return (
    <Root>
      <SellerNavigationDrawer links={NavigationLinks}>
        <Text
          textTransform={"capitalize"}
          px="2rem"
          py="1rem"
          fontWeight={"bold"}
        >
          {t("discover_your_town", "discover your town")}
        </Text>

        <Flex direction={"column"} gap="1rem">
          {places.map((place, i) => (
            <Button
              px="0"
              justifyContent={"start"}
              color="black"
              bgColor={"white"}
              colorScheme={"gray"}
            >
              <HStack px="2rem" spacing="2rem">
                <Icon fontSize={"xx-large"} as={HiLocationMarker} />
                <Text textTransform={"capitalize"} fontWeight={"semibold"}>
                  {place}
                </Text>
              </HStack>
            </Button>
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
      <SellerNavigationSideBar
        position={"fixed"}
        py="1rem"
        headerElement={
          <HiMenu cursor={"pointer"} onClick={() => setDrawerOpen(true)} />
        }
        gap="2rem"
        left="1rem"
        top="0rem"
        zIndex={20}
        links={NavigationLinks}
        activeLink={0}
      >
        <UsersProfiles maxNarrowItems={5} users={usersProfilesPlaceHolder} />
      </SellerNavigationSideBar>
      <Container className="pl-24 pr-8">
        <SellerHeader />
        <Box mt="3.75rem" as={"main"}>
          {children}
        </Box>
      </Container>
    </Root>
  );
};
