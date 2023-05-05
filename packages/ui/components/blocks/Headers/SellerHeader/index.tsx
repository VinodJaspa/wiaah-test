import React from "react";
import {
  Avatar,
  SearchInput,
  WavingHand,
  ShoppingCart,
  NotifiactionsMenu,
  useGeneralSearchModal,
  GeneralSearchModal,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  HStack,
  TranslationText,
  LocationIconButton,
  BellOutlineIcon,
  MessageOutlineIcon,
  SquarePlusOutlineIcon,
  useUserData,
  useMasterLocationMapModal,
  Image,
  useSocialControls,
  StarOutlineIcon,
  ServicesIcon,
} from "@UI";
import { BsShop } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgShoppingBag } from "react-icons/cg";
import { useResponsive } from "hooks";
import { HtmlDivProps, TranslationTextType } from "types";
import { runIfFn } from "utils";
import { useTranslation } from "react-i18next";
import { BiWallet } from "react-icons/bi";
import { getRouting, useRouting } from "@UI/../routing";
export interface HeaderNavLink {
  link: {
    name: TranslationTextType;
    href: string;
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
  const { openSocialNewPostModal, openNotifications } = useSocialControls();
  const { SearchForLocations } = useMasterLocationMapModal();
  const { user } = useUserData();
  const { openModal: openSearchBox } = useGeneralSearchModal();
  const { visit } = useRouting();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

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
                {t("Hello")} {user?.name}
              </p>
              <p className="font-bold text-lg">{t("Welcome Back")}</p>
            </div>
          </div>
        )}
      </div>
      {!isMobile && (
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
            onClick={() => openSocialNewPostModal()}
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
            4
          </span>
          <MessageOutlineIcon className="text-lightBlack text-icon" />
        </div>
        <div className="text-lightBlack">
          <ShoppingCart />
        </div>
        {!isMobile && (
          <AccountsProfileOptions>
            <div className="flex flex-col justify-center">
              <Avatar
                className=""
                showBorder={false}
                name="wiaah"
                src="/wiaah_logo.png"
              />
            </div>
          </AccountsProfileOptions>
        )}
      </div>
    </div>
  );
};

export const AccountsProfileOptions: React.FC = ({ children }) => {
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
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuList origin="top right">
        {links.length > 0
          ? links.map(({ icon, link }, i) => (
              <MenuItem onClick={() => visit((r) => r.addPath(link.href))}>
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
