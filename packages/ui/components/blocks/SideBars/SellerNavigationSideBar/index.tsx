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
  const { isMobile } = useResponsive();
  const { user } = useUserData();

  function handleLinkClick(link: NavigationLinkType) {
    onLinkClick?.(link);
  }

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
        ]
  );

  return (
    <div
      className={`${className} flex fixed z-[36] ${
        isMobile
          ? "flex-row left-0 bottom-0 w-full bg-white border-t border-gray-200"
          : "flex-col left-0 top-0 w-56 h-screen bg-white shadow-md"
      } items-center p-4`}
      {...props}
    >
      <div className="overflow-y-auto w-full">
        <div
          className={`w-full flex flex-wrap ${
            isMobile
              ? "justify-around flex-row gap-4 text-2xl"
              : "flex-col gap-8"
          }`}
        >
          {!isMobile && (
            <Image
              src="/wiaah_logo.png"
              className="cursor-pointer w-32 mx-auto mb-8"
            />
          )}

          {links.map((link, i) => {
            const active = link.url === activeLink;
            return (
              <div
                className={`flex gap-3 items-center cursor-pointer relative p-2 rounded-md hover:bg-gray-100 ${
                  isMobile ? "" : "px-4"
                }`}
                data-testid="NavigationSideBarLink"
                onClick={() => handleLinkClick(link)}
                key={i}
              >
                <span
                  className={`${
                    active ? "text-primary" : "text-black"
                  } text-icon`}
                >
                  {active ? runIfFn(link.activeIcon) : runIfFn(link.icon)}
                </span>
                {!isMobile && (
                  <p
                    className={`${
                      active ? "text-primary" : "text-black"
                    } capitalize font-medium text-sm`}
                    data-testid="NavigationSideBarLinkLabel"
                  >
                    {link.name}
                  </p>
                )}
              </div>
            );
          })}

          {isMobile && (
            <Avatar
              onClick={() => openMyProfileNav()}
              className="text-2xl"
              src={user?.photoSrc}
              alt={user?.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};