import React from "react";
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
import { getRouting, useRouting } from "@UI/../routing";
import { mapArray, runIfFn } from "@UI/../utils/src";
import { FaThList } from "react-icons/fa";
import { useLogoutMutation } from "@features/Accounts/services/useLogout";

export const ProfileOptionsDrawer = () => {
  const { visit } = useRouting();
  const { value, closeMyProfileNav } = useSocialControls("showMyProfileNav");
  const { user } = useUserData();

  const BuyerNavLinks: HeaderNavLink[] = [
    {
      link: {
        name: { translationKey: "profile", fallbackText: "Profile" },
        href: "/myprofile",
      },
      icon: <HiOutlineUserCircle />,
    },
    {
      link: {
        name: { translationKey: "settings", fallbackText: "Settings" },
        href: "/settings",
      },
      icon: <IoSettingsOutline />,
    },
    {
      link: {
        name: {
          translationKey: "shopping_management",
          fallbackText: "Orders & Perks",
        },
        href: "/shopping-management",
      },
      icon: <CgShoppingBag />,
    },
    {
      link: {
        name: { translationKey: "wallet", fallbackText: "Wallet" },
        href: "/wallet",
      },
      icon: <BiWallet />,
    },
    {
      link: {
        name: { translationKey: "log_out", fallbackText: "Log out" },
        href: "/logout",
      },
      icon: null,
    },
  ];

  const SellerNavLinks: HeaderNavLink[] = [
    {
      link: {
        name: { translationKey: "profile", fallbackText: "Profile" },
        href: "/myprofile",
      },
      icon: <HiOutlineUserCircle />,
    },
    {
      link: {
        name: {
          translationKey: "account_settings",
          fallbackText: "Account Settings",
        },
        href: getRouting((r) => r.visitAccountSettings()),
      },
      icon: <IoSettingsOutline />,
    },
    {
      link: {
        name: { translationKey: "Saved", fallbackText: "Saved" },
        href: "/saved",
      },
      icon: <StarOutlineIcon />,
    },
    {
      link: {
        name: {
          translationKey: "shop_management",
          fallbackText: "Shop Management",
        },
        href: getRouting((r) => r.visitShopManagement()),
      },
      icon: <BsShop />,
    },
    {
      link: {
        name: {
          translationKey: "service_management",
          fallbackText: "Service Management",
        },
        href: getRouting((r) => r.visitServiceManagement()),
      },
      icon: <FaThList />,
    },
    {
      link: {
        name: {
          translationKey: "shopping_management",
          fallbackText: "Orders & Perks",
        },
        href: getRouting((r) => r.visitShoppingManagement()),
      },
      icon: <CgShoppingBag />,
    },
    {
      link: {
        name: { translationKey: "wallet", fallbackText: "Wallet" },
        href: "/wallet",
      },
      icon: <BiWallet />,
    },
    {
      link: {
        name: { translationKey: "log_out", fallbackText: "Log out" },
        href: "/logout",
      },
      icon: null,
    },
  ];

  const links = user?.accountType === "buyer" ? BuyerNavLinks : SellerNavLinks;
  const { mutate: logout, isLoading } = useLogoutMutation();
  const handleClick = (href: string) => {
    if (href === "/logout") {
  
      logout(undefined, {
        onSuccess: () => {
          // You may still want to manually clear client-side localStorage/cookies if needed
          // window.location.href = "/";
        },
        onError: (err) => {
          console.error("Logout failed", err);
        },
      });
    } else {
      visit((r) => r.addPath(href), false);
    }
    closeMyProfileNav();
  };

  return (
    <Drawer position="bottom" isOpen={!!value} onClose={closeMyProfileNav} draggable>
      <DrawerOverlay />
      <DrawerContent style={{ overflow: "visible" }} className="p-4">
        <Stack col divider={<Divider className="my-4" />}>
          {mapArray(links, ({ icon, link }) => (
            <HStack
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="font-medium cursor-pointer gap-3"
            >
              {runIfFn(icon)}
              <TranslationText translationObject={link.name} />
            </HStack>
          ))}
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
