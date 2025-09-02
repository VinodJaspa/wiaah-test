// Updated SellerHeader and AccountsProfileOptions components
"use client";

import React, { useMemo } from "react";
import {
  Avatar,
  BellOutlineIcon,
  Button,
  GeneralSearchModal,
  HStack,
  Image,
  LocationIconButton,
  MasterLocationMapModal,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MessageOutlineIcon,
  NotifiactionsMenu,
  SearchIcon,
  SearchInput,
  ShoppingCart,
  ShoppingCartOutlineIcon,
  SquarePlusOutlineIcon,
  TranslationText,
  useGeneralSearchModal,
  useGetMyAccountQuery,
  useMasterLocationMapModal,
  useSocialControls,
  useUserData,
  WavingHand,
} from "@UI";


import { useResponsive } from "hooks";
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";
import { BiLogOut, BiWallet } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosStarOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TiThListOutline } from "react-icons/ti";
import { HtmlDivProps, TranslationTextType } from "types";
import { errorToast, isDev, runIfFn, setTestid, successToast } from "utils";
import { useLogoutMutation } from "@features/Accounts/services/useLogout";
import { useRecoilState } from "recoil";
import { isUserLoggedIn } from "state";
import { useRouting } from "routing";
import { sidebarState } from "@src/state/Recoil/sidebarState";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";


export interface HeaderNavLink {
  link: {
   name: TranslationTextType;
    href: string;
    props?: HtmlDivProps;
  };
  icon: React.ReactNode;
}

export interface SellerHeaderProps {
  onSearchSubmit?: (searchValue: string) => any;
  props?: HtmlDivProps;
  headerNavLinks: HeaderNavLink[];
}
export const SellerHeader: React.FC<SellerHeaderProps> = ({
  onSearchSubmit,
  props,
  headerNavLinks = [],
}) => {
  const { showNewPublish, openNotifications } = useSocialControls();
  const { SearchForLocations } = useMasterLocationMapModal();
  const { data: user } = useGetMyAccountQuery();
  const { openModal: openSearchBox } = useGeneralSearchModal();
  const [, setSidebar] = useRecoilState(sidebarState);
  const router = useRouting();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const [loggedIn] = useRecoilState(isUserLoggedIn);

  return (
    <>
      <div
        {...props}
        className="flex justify-between items-center bg-white w-full h-[3.75rem] mt-4"
      >
        {/* Left side logo / greeting */}
        <div className="flex items-center gap-2 h-full">
          {isMobile ? (
            <Image src="/wiaah_logo.png" className="w-24 h-10 object-cover" />
          ) : (
            <div className="flex items-center gap-4">
              <WavingHand className="text-[2rem]" />
              <div className="flex flex-col">
                <p>
                  {t("Hello")} {user?.firstName || t("Guest")}
                </p>
                <p className="font-bold text-lg">{t("Welcome Back")}</p>
              </div>
            </div>
          )}
        </div>

        {/* Search bar / search icon */}
        {isMobile ? (
          <SearchIcon />
        ) : (
          <div className="flex items-center gap-2">
            <GeneralSearchModal>
              <SearchInput innerProps={{ onClick: openSearchBox }} />
            </GeneralSearchModal>
            <LocationIconButton
              colorScheme="lightGray"
              outline
              iconProps={{ className: "fill-transparent" }}
              onClick={() => {
                setSidebar(false); // persist hidden state
                SearchForLocations([{ id: "default", searchType: "service" }]);
              }}
              className="text-icon fill-transparent text-lightBlack"
            />
          </div>
        )}

        {/* Right side controls */}
        <div className="flex items-center gap-8 p-2 cursor-pointer">
          {loggedIn  || isDev ? (
            <>
              {/* New Publish */}
              <SquarePlusOutlineIcon
                className="text-icon text-lightBlack"
                onClick={showNewPublish}
              />

              {/* Notifications */}
              {isMobile ? (
                <BellOutlineIcon
                  onClick={openNotifications}
                  className="cursor-pointer text-icon text-lightBlack"
                />
              ) : (
                <NotifiactionsMenu>
                  <BellOutlineIcon className="text-icon text-lightBlack" />
                </NotifiactionsMenu>
              )}

              {/* Inbox */}
              <div className="relative" onClick={() => window.location.href ="/inbox"}>
                <span className="h-4 w-4 text-[0.5rem] border-2 border-white rounded-full absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 flex justify-center items-center text-white bg-primary">
                  4
                </span>
                <MessageOutlineIcon className="text-lightBlack text-icon" />
              </div>

              {/* Cart */}
              <div className="text-lightBlack">
                <ShoppingCart>
                  <ShoppingCartOutlineIcon className="text-icon h-6 w-6" />
                </ShoppingCart>
              </div>

              {/* Profile options (desktop only) */}
              {!isMobile && user && <AccountsProfileOptions />}
            </>
          ) : (
            // If NOT logged in → show Sign In
            !isMobile && (
              <PrimaryButton
            
                className="whitespace-nowrap"
                onClick={() => router.push("auth/login")}
              >
                {t("Sign In")}
              </PrimaryButton>
            )
          )}
        </div>
      </div>

      <MasterLocationMapModal />
    </>
  );
};


interface AccountsProfileOptionsProps {
  children?: React.ReactNode;
}

export const AccountsProfileOptions: React.FC<AccountsProfileOptionsProps> = ({
  children,
}) => {
  const { user } = useUserData();
  const router = useRouter();
  const [_, setLoginState] = useRecoilState(isUserLoggedIn);
  const { mutate: logout } = useLogoutMutation();
  const [accountType, setAccountType] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("userType");
      if (savedType) {
        setAccountType(savedType);
      }
    }
  }, []);
  const links: HeaderNavLink[] = useMemo(() => {
    // Todo-make this dynamic check accrding to user profile
    if (accountType ==="buyer") {
      return [
        { link: { name: { translationKey: "profile", fallbackText: "Profile" }, href: "/myprofile" }, icon: <HiOutlineUserCircle /> },
        { link: { name: { translationKey: "settings", fallbackText: "Settings" }, href: "/settings" }, icon: <IoSettingsOutline /> },
        { link: { name: { translationKey: "shopping_management", fallbackText: "Orders & Perks" }, href: "/shopping-management" }, icon: <CgShoppingBag /> },
        { link: { name: { translationKey: "wallet", fallbackText: "Wallet" }, href: "/wallet" }, icon: <BiWallet /> },
        { link: { name: { translationKey: "log_out", fallbackText: "Log out" }, href: "/logout" }, icon: <BiLogOut /> },
      ];
    } else {
      return [
        { link: { name: { translationKey: "profile", fallbackText: "Profile" }, href: "/myprofile" }, icon: <HiOutlineUserCircle /> },
        { link: { name: { translationKey: "account_settings", fallbackText: "Account Settings" }, href: "/management/account-settings/account" }, icon: <IoSettingsOutline /> },
        { link: { name: { translationKey: "Saved", fallbackText: "Saved" }, href: "/saved" }, icon: <IoIosStarOutline /> },
        { link: { name: { translationKey: "shop_management", fallbackText: "Shop Management" }, href: "/management/shop-management/product-management" }, icon: <BsShop /> },
        { link: { name: { translationKey: "service_management", fallbackText: "Service Management" }, href: "/management/service-management/my-rendez-vous", props: setTestid("header_settings_service") }, icon: <TiThListOutline /> },
        { link: { name: { translationKey: "shopping_management", fallbackText: "Orders & Perks" }, href: "/management/shopping-management/my-wishlist" }, icon: <CgShoppingBag /> },
        { link: { name: { translationKey: "wallet", fallbackText: "Wallet" }, href: "/wallet" }, icon: <BiWallet /> },
        { link: { name: { translationKey: "log_out", fallbackText: "Log out" }, href: "/logout" }, icon: <BiLogOut /> },
      ];
    }
  }, []);

  const handleNavigate = (path: string) => {
    if (path === "/logout") {
      logout(undefined, {
        onSuccess: () => {
          setLoginState(false);
          window.location.href = "/";
          router.push("/"); 
          successToast("You have been ssucefully logeed out!")
          // Uncomment if you want to use Next.js routing instead of window.location.href    
        },
        onError: (err) => {
        errorToast("Logout failed!");
          // console.error("Logout failed", err);
        },
      });
    } else {
      window.location.href = path;
      router.push(path);
    }
  };

  return (
    <Menu>
      <MenuButton>
        <div {...setTestid("header_profile_icon")} className="flex flex-col justify-center">
          <Avatar
            className="text-icon"
            showBorder={false}
            name={user?.firstName || "Guest"}
            src={user?.photo || ""}
          />
        </div>
      </MenuButton>
      <MenuList {...setTestid("header_settings")} origin="top right">
        {links.map(({ icon, link }) => (
          <MenuItem
            key={link.href}
            {...(link.props || {})}
            onClick={() => handleNavigate(link.href)}
          >
            <HStack>
              <span className="text-2xl">{runIfFn(icon)}</span>
              <span className="capitalize">
                <TranslationText translationObject={link.name} />
              </span>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
