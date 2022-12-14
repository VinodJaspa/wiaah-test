import React from "react";
import { useTranslation } from "react-i18next";
import {
  LogoIcon,
  Accordion,
  PersonIcon,
  DashboardIcon,
  ShopIcon,
  ArrowRightIcon,
  ServicesIcon,
  NestedSubmenuNavigationLinks,
  NavigationLink,
  AffiliationIcon,
  CommentIcon,
  MessageOutlineIcon,
} from "ui";

import { HiUserGroup, HiChat } from "react-icons/hi";
import { ImCheckmark } from "react-icons/im";
import { BiInfoCircle } from "react-icons/bi";

export const AdminNavigationSidebar: React.FC<{
  currentUrl: string;
  onRoute: (newUrl: string) => void;
}> = ({ currentUrl: _url = "", onRoute }) => {
  let currentUrl = _url[0] === "/" ? _url.slice(1) : _url;
  const routeSlugs = currentUrl.split("?")[0].split("/");
  const { t } = useTranslation();

  const links: NavigationLink[] = [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      onClick() {},
      slug: "dashboard",
      subLinks: [],
    },
    {
      icon: <PersonIcon />,
      name: "Sellers",
      onClick() {},
      slug: "sellers",
      subLinks: [],
    },
    {
      icon: <PersonIcon />,
      name: "Buyers",
      onClick() {},
      slug: "buyers",
      subLinks: [],
    },
    {
      icon: <ShopIcon />,
      name: t("Product Shop"),
      onClick() {},
      slug: "product-shop",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Category"),
          onClick() {},
          slug: "category",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Products"),
          onClick() {},
          slug: "products",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Filters"),
          onClick() {},
          slug: "filters",
          subLinks: [],
        },
      ],
    },
    {
      icon: <ServicesIcon />,
      name: t("Service Shop"),
      onClick() {},
      slug: "service-shop",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Category"),
          onClick() {},
          slug: "category",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Services"),
          onClick() {},
          slug: "services",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Filters"),
          onClick() {},
          slug: "filters",
          subLinks: [],
        },
      ],
    },
    {
      icon: <HiUserGroup />,
      name: t("Social"),
      onClick() {},
      slug: "social",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Posts"),
          onClick() {},
          slug: "posts",
          subLinks: [],
        },
      ],
    },
    {
      icon: AffiliationIcon({}),
      name: t("Affiliation"),
      onClick() {},
      slug: "affiliation",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Affiliation History"),
          onClick() {},
          slug: "affiliation-history",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Affiliation Management"),
          onClick() {},
          slug: "affiliation-management",
          subLinks: [],
        },
      ],
    },
    {
      icon: <HiChat />,
      name: t("Reviews"),
      onClick() {},
      slug: "reviews",
      subLinks: [],
    },
    {
      icon: <ImCheckmark />,
      name: t("Seller Requests"),
      onClick() {},
      slug: "seller-requests",
      subLinks: [],
    },
    {
      icon: <BiInfoCircle />,
      name: t("Informations"),
      onClick() {},
      slug: "informations",
      subLinks: [],
    },
  ];

  return (
    <div className="flex flex-col w-full border-r border-opacity-20 border-r-black h-full gap-4">
      <div className="flex bg-white justify-center items-center h-24 border-b border-opacity-20 border-b-black">
        <LogoIcon className="text-8xl text-primary" />
      </div>
      <div className="px-4 ">
        <Accordion>
          <NestedSubmenuNavigationLinks
            canBeSelected={true}
            deepSlugs={[]}
            lastDeepNum={0}
            links={links}
            routeSlugs={routeSlugs}
          />
        </Accordion>
      </div>
    </div>
  );
};
