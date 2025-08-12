import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";
import { NavigationLinkType } from "types";
import {
  Divider,
  LogoutIcon,
  Button,
  Image,
  HomeIcon,
  DiscoverIcon,
  ShoppingCartIcon,
  ServicesIcon,
  AffiliationIcon,
  Avatar,
  useUserData,
  VideosPlayIcon,
  HomeOutlineIcon,
  DiscoverOutlineIcon,
  VideosOutlinePlayIcon,
  ShoppingCartOutlineIcon,
  ServicesOutlineIcon,
  AffiliationIconOutline,
  useSocialControls,
} from "ui";
import { runIfFn } from "utils";

export interface SellerSideBarProps extends HtmlDivProps {
  onLinkClick?: (link: NavigationLinkType) => any;
  activeLink?: string;
  headerElement?: React.ReactElement;
}

export const SellerNavigationSideBar: React.FC<SellerSideBarProps> = ({
  onLinkClick,
  activeLink,
  headerElement,
  children,
  className,
  ...props
}) => {
  const { openMyProfileNav } = useSocialControls();
const { t } = useTranslation();
  function handleLinkClick(link: NavigationLinkType) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onLinkClick && onLinkClick(link);
  }
  const { isMobile } = useResponsive();

  const links: NavigationLinkType[] = [
    {
      name: "Home",
      icon: <HomeOutlineIcon />,
      activeIcon: <HomeIcon />,
      url: "/",
    },
    {
      name: "discover",
      icon: <DiscoverOutlineIcon />,
      activeIcon: <DiscoverIcon />,
      url: "/discover",
    },
    {
      name: "action",
      icon: <VideosOutlinePlayIcon />,
      activeIcon: <VideosPlayIcon />,
      url: "/action",
    },
    {
      name: "shop",
      icon: <ShoppingCartOutlineIcon />,
      activeIcon: <ShoppingCartIcon />,
      url: "/shop",
    },
  ].concat(
    isMobile
      ? []
      : [
          {
            name: "service",
            icon: <ServicesOutlineIcon />,
            activeIcon: <ServicesIcon />,
            url: "/service",
          },
          {
            name: "affiliation",
            icon: <AffiliationIconOutline />,
            activeIcon: <AffiliationIcon />,
            url: "/affiliation",
          },
        ],
  );

  const { user } = useUserData();

  return (
    <div
      className={`${className} flex z-[36]  fixed ${
        isMobile
          ? "flex-row z-10 left-0 bottom-0 w-full bg-white"
          : "flex-col left-0 w-52 z-[36] h-screen top-0 bg-primary"
      } items-center flex py-3`}
      {...props}
    >
      <div className="overflow-y-scroll noScroll w-full">
        <div
          className={`w-full flex flex-wrap ${
            isMobile
              ? "justify-around flex-row gap-2 text-3xl bg-white"
              : "flex-col gap-12 bg-primary"
          }`}
        >
          {!isMobile && (
            <Image
              src="/Logo.svg"
              className="cursor-pointer w-full pl-8 pr-16"
            />
          )}
          {links.map((link, i) => {
            const active = link.url === activeLink;
            return (
              <div
                className={`flex gap-4 items-center cursor-pointer relative ${
                  isMobile ? "" : "pl-8"
                }`}
                data-testid="NavigationSideBarLink"
                onClick={() => handleLinkClick && handleLinkClick(link)}
                key={i}
              >
                <span
                  className={`${
                    isMobile ? "text-black" : "text-white"
                  } text-icon`}
                >
                  {active ? runIfFn(link.activeIcon) : runIfFn(link.icon)}
                </span>
                {!isMobile && (
                  <>
                    <p
                      className={`${"text-white"} capitalize font-bold text-sm`}
                      data-testid="NavigationSideBarLinkLabel"
                    >
                      {link.name}
                    </p>

                    <span
                      className={`absolute top-0 right-0 bottom-0 w-2 ${
                        active ? "" : "opacity-0"
                      } bg-black rounded`}
                    ></span>
                  </>
                )}
              </div>
            );
          })}
          {isMobile ? (
            <Avatar
              onClick={() => openMyProfileNav()}
              className="text-2xl"
              src={user?.photoSrc}
              alt={user?.name}
            />
          ) : null}
        </div>
        {/* {!isMobile && (
          <div className="flex flex-col h-full justify-between w-full px-6">
            <div>
              <Divider className="my-10" />
              <div
                className="pb-32"
                data-testid="NavigationSideBarChildContainer"
              >
                {children}
              </div>
            </div>
          </div>
        )} */}
      </div>
      {/* {isMobile ? null : (
        <div className="absolute pb-11 bottom-0 bg-primary flex justify-center flex-col px-6 left-0 w-full">
          <Divider className="my-10" />
          <Button
            colorScheme="white"
            className="flex items-center gap-3 w-full"
          >
            <LogoutIcon className="text-icon text-black" />
            <p className="font-bold text-black text-base">{t("Logout")}</p>
          </Button>
        </div>
      )} */}
    </div>
  );
};
