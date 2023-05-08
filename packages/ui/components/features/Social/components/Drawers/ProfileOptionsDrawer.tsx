import { HeaderNavLink, useSocialControls } from "@blocks";
import {
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  TranslationText,
} from "@partials";
import { useUserData, StarOutlineIcon, ServicesIcon } from "@UI";
import { BsShop } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgShoppingBag } from "react-icons/cg";
import { BiWallet } from "react-icons/bi";
import { getRouting } from "@UI/../routing";
import { mapArray, runIfFn } from "@UI/../utils/src";

import React from "react";

export const ProfileOptionsDrawer = () => {
  const { value, closeProfileOptions } = useSocialControls("showMyProfileNav");

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
  const { user } = useUserData();

  const links = user?.accountType === "buyer" ? BuyerNavLinks : SellerNavLinks;
  return (
    <Drawer
      position="bottom"
      isOpen={!!value}
      onClose={closeProfileOptions}
      draggable
    >
      <DrawerOverlay />
      <DrawerContent style={{ overflow: "visible" }} className="p-4">
        <Stack col divider={<Divider className="my-4" />}>
          {mapArray(links, ({ icon, link }) => (
            <HStack className="font-medium">
              {runIfFn(icon)}
              <TranslationText translationObject={link.name} />
            </HStack>
          ))}
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
