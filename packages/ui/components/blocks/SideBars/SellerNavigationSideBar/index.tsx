import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";
import { NavigationLinkType } from "types";
import { Divider, LogoutIcon, Button } from "ui";

export interface SellerSideBarProps extends HtmlDivProps {
  links: NavigationLinkType[];
  onLinkClick?: (link: NavigationLinkType) => any;
  activeLink?: string;
  headerElement?: React.ReactElement;
}

export const SellerNavigationSideBar: React.FC<SellerSideBarProps> = ({
  links,
  onLinkClick,
  activeLink,
  headerElement,
  children,
  className,
  ...props
}) => {
  const { t } = useTranslation();
  function handleLinkClick(link: NavigationLinkType) {
    onLinkClick && onLinkClick(link);
  }
  const { isMobile } = useResponsive();
  return (
    <div
      className={`${className} thinScroll w-52 h-screen bg-primary flex z-20 fixed ${
        isMobile ? "flex-row left-0 bottom-0 w-full" : "flex-col left-0  top-0"
      } items-center flex py-11`}
      {...props}
    >
      <div
        className={`w-full flex flex-wrap bg-primary ${
          isMobile
            ? "justify-around flex-row gap-2 text-3xl"
            : "flex-col gap-12"
        }`}
      >
        {!isMobile && <img src="/wiaah_logo.png" className="w-full px-8" />}
        {links.map((link, i) => {
          const active = link.url === activeLink;
          return (
            <div
              className="flex gap-4 items-center cursor-pointer relative pl-8"
              data-testid="NavigationSideBarLink"
              onClick={() => handleLinkClick && handleLinkClick(link)}
              key={i}
            >
              <span
                className={`${
                  active ? "text-black fill-black" : "text-white fill-white"
                } text-black text-icon`}
              >
                {typeof link.icon === "function" ? link.icon() : null}
              </span>
              {!isMobile && (
                <>
                  <p
                    className={`${
                      active ? "text-black" : "text-white"
                    } capitalize font-bold text-sm`}
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
      </div>
      {!isMobile && (
        <div className="flex flex-col h-full justify-between w-full px-6">
          <div>
            <Divider className="my-10" />
            <div
              className="h-full overflow-y-scroll noScroll"
              data-testid="NavigationSideBarChildContainer"
            >
              {children}
            </div>
          </div>
          <div>
            <Divider className="my-10" />
            <Button
              colorScheme="white"
              className="flex items-center gap-3 w-full"
            >
              <LogoutIcon className="text-icon text-black" />
              <p className="font-bold text-black text-base">{t("Logout")}</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
