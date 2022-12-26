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
  PersonFillIcon,
  PercentIcon,
  NotAllowedIcon,
  DownloadIcon,
} from "ui";
import { FiSettings } from "react-icons/fi";
import { BiBrush, BiMoney } from "react-icons/bi";

import { HiUserGroup, HiChat, HiTicket, HiNewspaper } from "react-icons/hi";
import { ImCheckmark } from "react-icons/im";
import { BiInfoCircle, BiPackage } from "react-icons/bi";
import { GiTicket } from "react-icons/gi";
import { MdCardMembership, MdReport } from "react-icons/md";
import { BsCash, BsCashStack, BsTruck } from "react-icons/bs";

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
      icon: <AffiliationIcon />,
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
    {
      icon: <BiPackage />,
      name: t("Orders"),
      onClick() {},
      slug: "orders",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Active Orders"),
          onClick() {},
          slug: "active",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Canceled"),
          onClick() {},
          slug: "canceled",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Product Returns"),
          onClick() {},
          slug: "product-returns",
          subLinks: [],
        },
      ],
    },
    {
      icon: <HiTicket />,
      name: t("Bookings"),
      onClick() {},
      slug: "service-bookings",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Active"),
          onClick() {},
          slug: "active",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Payback"),
          onClick() {},
          slug: "payback",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Canceled"),
          onClick() {},
          slug: "canceled",
          subLinks: [],
        },
      ],
    },
    {
      icon: <HiNewspaper />,
      name: t("Newsletter"),
      onClick() {},
      slug: "newsletter",
      subLinks: [],
    },
    {
      icon: <GiTicket />,
      name: t("Vouchers"),
      onClick() {},
      slug: "vouchers",
      subLinks: [],
    },
    {
      icon: <FiSettings />,
      name: t("Maintenance"),
      onClick() {},
      slug: "maintenance",
      subLinks: [],
    },
    {
      icon: <BiMoney />,
      name: t("Sales Statistics"),
      onClick() {},
      slug: "sales-statistics",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("All Time Sales"),
          onClick() {},
          slug: "all",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Sales By Month"),
          onClick() {},
          slug: "month",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Sales By Month"),
          onClick() {},
          slug: "day",
          subLinks: [],
        },
      ],
    },

    {
      icon: <PersonFillIcon />,
      name: t("Account Deletion"),
      onClick() {},
      slug: "account-deletion",
      subLinks: [],
    },
    {
      icon: <BiBrush />,
      name: t("Design"),
      onClick() {},
      slug: "design",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Slideshow"),
          onClick() {},
          slug: "slideshow",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Partner"),
          onClick() {},
          slug: "partner",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Collaborations"),
          onClick() {},
          slug: "collab",
          subLinks: [],
        },
      ],
    },
    {
      icon: <MdReport />,
      name: t("Social reports"),
      onClick() {},
      slug: "social-reports",
      subLinks: [],
    },
    {
      icon: <BiBrush />,
      name: t("System"),
      onClick() {},
      slug: "system",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Profile Edit"),
          onClick() {},
          slug: "edit-profile",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Languages"),
          onClick() {},
          slug: "languages",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Currency"),
          onClick() {},
          slug: "currency",
          subLinks: [],
        },
      ],
    },
    {
      icon: <AffiliationIcon />,
      name: t("Marketing"),
      onClick() {},
      slug: "marketing",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Mail"),
          onClick() {},
          slug: "mail",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Coupons"),
          onClick() {},
          slug: "coupons",
          subLinks: [],
        },
      ],
    },
    {
      icon: <BsTruck />,
      name: t("Shipping"),
      onClick() {},
      slug: "shipping",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Geo Zones"),
          onClick() {},
          slug: "geo-zones",
          subLinks: [],
        },
      ],
    },
    {
      icon: <PercentIcon />,
      name: t("VAT"),
      onClick() {},
      slug: "vat",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Tax Classes"),
          onClick() {},
          slug: "classes",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Tax Rates"),
          onClick() {},
          slug: "rates",
          subLinks: [],
        },
      ],
    },
    {
      icon: <MdCardMembership />,
      name: t("Plans"),
      onClick() {},
      slug: "subscription-plans",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("settings"),
          onClick() {},
          slug: "settings",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("history"),
          onClick() {},
          slug: "history",
          subLinks: [],
        },
      ],
    },
    {
      icon: <BsCash />,
      name: t("Balance"),
      onClick() {},
      slug: "balance",
      subLinks: [],
    },
    {
      icon: <BsCashStack />,
      name: t("Withdrawal"),
      onClick() {},
      slug: "withdrawal",
      subLinks: [],
    },
    {
      icon: <NotAllowedIcon />,
      name: t("Banned Countries"),
      onClick() {},
      slug: "banned-countries",
      subLinks: [
        {
          icon: <ArrowRightIcon />,
          name: t("Sellers"),
          onClick() {},
          slug: "sellers",
          subLinks: [],
        },
        {
          icon: <ArrowRightIcon />,
          name: t("Buyers"),
          onClick() {},
          slug: "buyers",
          subLinks: [],
        },
      ],
    },
    {
      icon: <DownloadIcon />,
      name: t("Downloadables"),
      onClick() {},
      slug: "downloadables",
      subLinks: [],
    },
  ];

  return (
    <div className="flex max-h-[100vh] flex-col w-full border-r border-opacity-20 border-r-black h-full gap-4">
      <div className="flex bg-white justify-center items-center h-24 border-b border-opacity-20 border-b-black">
        <LogoIcon className="text-8xl text-primary" />
      </div>
      <div className="px-4 h-full thinScroll overflow-y-scroll">
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
