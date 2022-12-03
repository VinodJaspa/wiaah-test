import React from "react";
import { SellerNavigationDrawer } from ".";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import { Box, Text } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { SellerDrawerOpenState } from "ui/state";
import { AffiliationIcon, AffiliationIconOutline, UsersProfiles } from "ui";
import {
  HiUserGroup,
  HiOutlineUserGroup,
  HiHome,
  HiOutlineHome,
} from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";
import { CgPlayButtonR } from "react-icons/cg";
import { AiOutlineShop, AiFillShop } from "react-icons/ai";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";
import { t } from "i18next";

export default {
  title: "UI/blocks/drawers/SellerNavigationDrawer",
  component: SellerNavigationDrawer,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SellerNavigationDrawer>;

const NavigationLinks: NavigationLinkType[] = [
  {
    name: "homepage",
    icon: HiOutlineHome,
    activeIcon: HiHome,
    url: "/home",
  },
  {
    name: "discover",
    icon: HiOutlineUserGroup,
    activeIcon: HiUserGroup,
    url: "/discover",
  },
  {
    name: "action",
    icon: CgPlayButtonR,
    activeIcon: IoVideocam,
    url: "/action",
  },
  {
    name: "shop",
    icon: AiOutlineShop,
    activeIcon: AiFillShop,
    url: "/shop",
  },
  {
    name: "affiliation",
    icon: () => <AffiliationIconOutline />,
    activeIcon: () => <AffiliationIcon />,
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

const Templete: ComponentStory<typeof SellerNavigationDrawer> = ({
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
const TempleteWithChildren: ComponentStory<typeof SellerNavigationDrawer> = ({
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
    </>
  );
};
export const Default = Templete.bind({});
Default.args = {
  links: NavigationLinks,
};
export const WithChildren = TempleteWithChildren.bind({});
WithChildren.args = {
  links: NavigationLinks,
};
