import React from "react";
import { SellerNavigationDrawer } from ".";
import { Box, Text } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { SellerDrawerOpenState } from "@src/state";
import { AffiliationIcon, AffiliationIconOutline, UsersProfiles } from "@UI";
import {
  HiUserGroup,
  HiOutlineUserGroup,
  HiHome,
  HiOutlineHome,
} from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";
import { CgPlayButtonR } from "react-icons/cg";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import { t } from "i18next";
import { NavigationLinkType } from "@UI/../types/src";

export default {
  title: "UI/blocks/drawers/SellerNavigationDrawer",
  component: SellerNavigationDrawer,
} as Meta<typeof SellerNavigationDrawer>;

const NavigationLinks: NavigationLinkType[] = [
  {
    name: "homepage",
    icon: <HiOutlineHome />,
    activeIcon: <HiHome />,
    url: "/home",
  },
  {
    name: "discover",
    icon: <HiOutlineUserGroup />,
    activeIcon: <HiUserGroup />,
    url: "/discover",
  },
  {
    name: "action",
    icon: <CgPlayButtonR />,
    activeIcon: <IoVideocam />,
    url: "/action",
  },
  {
    name: "shop",
    icon: <AiOutlineShop />,
    activeIcon: <AiFillShop />,
    url: "/shop",
  },
  {
    name: "affiliation",
    icon: <AffiliationIconOutline />,
    activeIcon: <AffiliationIcon />,
    url: "/affiliation",
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

const Templete: StoryFn<typeof SellerNavigationDrawer> = ({
  activeLink,
  onLinkClick,
  ...args
}) => {
  const setOpen = useSetRecoilState(SellerDrawerOpenState);
  const [active, setActive] = React.useState<string>();
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <SellerNavigationDrawer
        activeLink={active}
        onLinkClick={(v) => setActive(v.url)}
        {...args}
      />
    </>
  );
};
const TempleteWithChildren: StoryFn<typeof SellerNavigationDrawer> = ({
  activeLink,
  onLinkClick,
  ...args
}) => {
  const setOpen = useSetRecoilState(SellerDrawerOpenState);
  const [active, setActive] = React.useState<string>();
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <SellerNavigationDrawer
        activeLink={active}
        onLinkClick={(v) => setActive(v.url)}
        {...args}
      >
        <Box textTransform={"capitalize"} px="2rem">
          <Text py="1rem" fontWeight={"bold"} textTransform={"capitalize"}>
            {t("suggestions").toString()}
          </Text>
          <UsersProfiles
            maxShowMoreItems={8}
            maxLongItems={5}
            variant="long"
            users={placeholderUsers}
          />
        </Box>
      </SellerNavigationDrawer>
    </>
  );
};

export const Default = {
  render: Templete,

  args: {
    links: NavigationLinks,
  },
};

export const WithChildren = {
  render: TempleteWithChildren,

  args: {
    links: NavigationLinks,
  },
};

// Placeholder data
const placeholderUsers = [
  {
    id: "1",
    name: "John Doe",
    userPhotoSrc: "https://via.placeholder.com/150",
    profession: "Software Engineer",
  },
  {
    id: "2",
    name: "Jane Smith",
    userPhotoSrc: "https://via.placeholder.com/150",
    profession: "Graphic Designer",
  },
  {
    id: "3",
    name: "Alice Johnson",
    userPhotoSrc: "https://via.placeholder.com/150",
    profession: "Product Manager",
  },
  {
    id: "4",
    name: "Bob Brown",
    userPhotoSrc: "https://via.placeholder.com/150",
    profession: "Data Scientist",
  },
  {
    id: "5",
    name: "Charlie Green",
    userPhotoSrc: "https://via.placeholder.com/150",
    profession: "UX/UI Designer",
  },
];
