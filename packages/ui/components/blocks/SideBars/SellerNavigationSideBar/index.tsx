import { useResponsive } from "hooks";
import { useRouter } from "next/router";
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
  headerElement,
  children,
  className,
  ...props
}) => {
  const { openMyProfileNav } = useSocialControls();
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { user } = useUserData();
  const router = useRouter();

  function handleLinkClick(link: NavigationLinkType) {
    onLinkClick?.(link);

    router.push(link.url);
    if (link.url === "/service") {
      window.location.href = link.url;
    }

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
      className={`${className} flex fixed z-[36] ${isMobile
          ? "flex-row left-0 bottom-0 w-full bg-white border-t border-gray-200"
          : "flex-col left-0 top-0 w-56 h-screen bg-white shadow-md"
        } items-center p-4`}
      {...props}
    >
      <div className="overflow-y-auto w-full">
        <div
          className={`w-full flex flex-wrap ${isMobile
              ? "justify-around flex-row gap-4 text-2xl"
              : "flex-col gap-8"
            }`}
        >
          {!isMobile && (
            <Image
              onClick={() => router.push("/")}
              src="/wiaah_logo.png"
              className="cursor-pointer w-32 mx-auto mb-8"
            />
          )}

          {links.map((link, i) => {
            const active = router.pathname === link.url; // use current route

            return (
              <div
                className={`flex gap-3 items-center cursor-pointer relative p-2 rounded-md transition-all duration-200
                  ${isMobile ? "" : "px-4"}
                  ${active ? "bg-primary/10 text-primary shadow-sm" : "hover:bg-gray-100"}
                `}
                key={i}
                onClick={() => handleLinkClick(link)}
              >
                <span
                  className={`transition-all duration-200 ${active ? "text-primary scale-110" : "text-black"
                    } text-icon`}
                >
                  {active ? runIfFn(link.activeIcon) : runIfFn(link.icon)}
                </span>
                {!isMobile && (
                  <p
                    className={`transition-all duration-200 capitalize font-medium text-sm ${active ? "text-primary font-semibold" : "text-black"
                      }`}
                  >
                    {link.name}
                  </p>
                )}
                {!isMobile && active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full" />
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
