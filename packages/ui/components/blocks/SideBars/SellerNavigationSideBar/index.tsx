import React from "react";
import { HtmlDivProps } from "types";
import { NavigationLinkType } from "types/sharedTypes/misc/SellerNavigationLink";
import { useResponsive, Divider } from "ui";

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
  function handleLinkClick(link: NavigationLinkType) {
    onLinkClick && onLinkClick(link);
  }
  const { isMobile } = useResponsive();
  return (
    <div
      className={`${className} thinScroll overflow-y-scroll flex z-20 py-4 gap-4 border-t-gray-300 fixed border-t-[1px] ${
        isMobile ? "flex-row left-0 bottom-0 w-full" : "flex-col left-4 top-0"
      } items-center flex bg-white text-4xl`}
      {...props}
    >
      <div
        className={`w-full flex h-full flex-wrap bg-white items-center ${
          isMobile
            ? "justify-around flex-row gap-2 text-3xl"
            : "flex-col gap-4 text-4xl"
        } `}
      >
        {!isMobile && headerElement && (
          <div data-testid="NavigationSideBarHeaderContainer">
            {headerElement}
          </div>
        )}
        {links.map((link, i) => (
          <div
            className="flex flex-col items-center cursor-pointer"
            data-testid="NavigationSideBarLink"
            onClick={() => handleLinkClick && handleLinkClick(link)}
            key={i}
          >
            <div
              className="text-4xl text-black bg-white py-2"
              aria-label={link.name}
              key={i}
            >
              <span className={`text-[${link.size}]`} {...link.size}>
                {activeLink === link.url ? link.activeIcon({}) : link.icon({})}
              </span>
            </div>
            {!isMobile && (
              <p
                className="capitalize font-bold text-sm"
                data-testid="NavigationSideBarLinkLabel"
              >
                {link.name}
              </p>
            )}
          </div>
        ))}
      </div>
      {!isMobile && (
        <>
          <Divider />
          <div data-testid="NavigationSideBarChildContainer">{children}</div>
        </>
      )}
    </div>
  );
};
