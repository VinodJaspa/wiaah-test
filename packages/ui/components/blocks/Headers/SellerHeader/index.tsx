import {
  Avatar,
  BellOutlineIcon,
  Button,
  GeneralSearchModal,
  HStack,
  Image,
  LocationIconButton,
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
  useGetMyNotificationsQuery,
  useMasterLocationMapModal,
  useSocialControls,
  useUserData,
  WavingHand,
} from "@UI";
import { getRouting, useRouting } from "@UI/../routing";
import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiWallet } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { FaThList } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosStarOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { HtmlDivProps, TranslationTextType } from "types";
import { runIfFn, setTestid } from "utils";

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
  const { visit } = useRouting();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const { data } = useGetMyNotificationsQuery();

  return (
    <div
      {...props}
      className={
        "flex justify-between items-center bg-white w-full h-[3.75rem]"
      }
    >
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
            iconProps={{
              className: "fill-transparent",
            }}
            onClick={() => SearchForLocations([])}
            className="text-icon fill-transparent text-lightBlack"
          />
        </div>
      )}

      <div className="flex items-center gap-8 p-2">
        {/* {isMobile ? ( */}
        <>
          <SquarePlusOutlineIcon
            className="text-icon text-lightBlack"
            onClick={() => showNewPublish()}
          />
        </>
        {/* ) : null} */}
        {isMobile ? (
          <BellOutlineIcon
            onClick={() => openNotifications()}
            className="cursor-pointer text-icon text-lightBlack"
          />
        ) : (
          <NotifiactionsMenu>
            <BellOutlineIcon className="text-icon text-lightBlack" />
          </NotifiactionsMenu>
        )}

        <div
          className="relative"
          onClick={() => visit((r) => r.addPath("/chat"))}
        >
          <span className="h-4 w-4 text-[0.5rem]  border-2 border-white rounded-full absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 flex justify-center items-center text-white bg-primary">
            {/* TODO:api integration */}4
          </span>
          <MessageOutlineIcon className="text-lightBlack text-icon" />
        </div>
        <div className="text-lightBlack">
          <ShoppingCart>
            <ShoppingCartOutlineIcon className="text-icon text-lightBlack h-6 w-6" />
          </ShoppingCart>
        </div>
        {!isMobile && (
          <>
            {user ? (
              <AccountsProfileOptions>
                <div
                  {...setTestid("header_profile_icon")}
                  className="flex flex-col justify-center"
                >
                  <Avatar
                    className="text-icon"
                    showBorder={false}
                    name={user.firstName}
                    src={user.photo || ""}
                  />
                </div>
              </AccountsProfileOptions>
            ) : (
              <Button
                {...setTestid("sign-in-btn")}
                className="whitespace-nowrap"
                onClick={() => visit((r) => r.visitSignin())}
              >
                {t("Sign In")}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface AccountsProfileOptionsProps {
  children?: React.ReactNode;
}
export const AccountsProfileOptions: React.FC<AccountsProfileOptionsProps> = ({
  children,
}) => {
  const { visit } = useRouting();
  const BuyerNavLinks: HeaderNavLink[] = [
    {
      link: {
        name: {
          translationKey: "profile",
          fallbackText: "Profile",
        },
        href: "/myprofile",
      },
      icon: <HiOutlineUserCircle />,
    },
    {
      link: {
        name: {
          translationKey: "settings",
          fallbackText: "Settings",
        },
        href: "/settings",
      },
      icon: <IoSettingsOutline />,
    },
    {
      link: {
        name: {
          translationKey: "shopping_management",
          fallbackText: "Shopping Management",
        },
        href: "/shopping-management",
      },
      icon: <CgShoppingBag />,
    },
    {
      link: {
        name: {
          translationKey: "wallet",
          fallbackText: "Wallet",
        },
        href: "/wallet",
      },
      icon: <BiWallet />,
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
      icon: <IoIosStarOutline />,
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
      icon: <BsShop />,
    },
    {
      link: {
        name: {
          translationKey: "service_management",
          fallbackText: "Service Management",
        },
        href: getRouting((r) => r.visitServiceManagement()),
        props: setTestid("header_settings_service"),
      },
      icon: <FaThList />,
    },
    {
      link: {
        name: {
          translationKey: "shopping_management",
          fallbackText: "Shopping Management",
        },
        href: getRouting((r) => r.visitShoppingManagement()),
      },
      icon: <CgShoppingBag />,
    },
    {
      link: {
        name: {
          translationKey: "wallet",
          fallbackText: "Wallet",
        },
        href: "/wallet",
      },
      icon: <BiWallet />,
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
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuList {...setTestid("header_settings")} origin="top right">
        {links.length > 0
          ? links.map(({ icon, link }, i) => (
              <MenuItem
                {...(link?.props || {})}
                onClick={() => visit((r) => r.addPath(link.href))}
              >
                <HStack>
                  <span className="text-4xl">{runIfFn(icon, {})}</span>
                  <span className="capitalize">
                    <TranslationText translationObject={link.name} />
                  </span>
                </HStack>
              </MenuItem>
            ))
          : null}
      </MenuList>
    </Menu>
  );
};
