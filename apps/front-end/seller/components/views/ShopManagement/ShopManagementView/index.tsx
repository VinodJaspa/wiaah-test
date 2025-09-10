import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineChartBar, HiOutlineClipboardList } from "react-icons/hi";
import {
  MdOutlineLocalShipping,
  MdOutlineShoppingBasket
} from "react-icons/md";
import { getRouting } from "routing";
import { SettingsSectionType } from "types";
import {
  AffiliationHistorySection,
  ImageIcon,
  SectionsLayout
} from "ui";

import SalesSection from "@sections/SalesSection/SalesStatisticsSummary";
import ProductTable from "@sections/ShopManagement/ProductManagementSections/ProductManagement";
import OrdersPage from "components/Order/OrdersPage";
import ReturnOrdersSection from "components/ReturnOrders/ReturnOrders";
import ProductReviewSection from "components/Reviews/ProductReviewSection";
import ShippingSettingSection from "components/Shipping/ShippingPage";

import { FiUsers } from "react-icons/fi";
import { IoReturnDownBackOutline } from "react-icons/io5";
import ShopPresentationForm from "../Product Presentaion";


export interface ShopManagementViewProps { }

export const ShopManagementView: React.FC<ShopManagementViewProps> = ({ }) => {
  const baseRoute = getRouting((r) => r.visitShopManagement());
  
  const router = useRouter();
  const { sections : section } = router.query;
const isReturnOrderDetail = router.pathname.includes("return-order-detail");
  const route = Array.isArray(section) ? section[0] : section;
console.log(router.query,"section")
const { t } = useTranslation();

  function handleSectionChange(url: string) {
    router.replace(`/${baseRoute}/${url}`);

  }

  return (
    <SectionsLayout
      handleSectionChange={handleSectionChange}
      currentSectionName={route}
      sections={sections}
      handleRetrun={() => {
        router.replace(`/${baseRoute}`);
      }}
      name={t("Shop Management")}
    />
  );
};



const sections: SettingsSectionType[] = [
  {
    panelName: "Product Management",
    panelIcon: <MdOutlineShoppingBasket />,
    panelUrl: "product-management",
    panelComponent: <ProductTable />,
    subSections: [
      {
        key: "edit",
        sections: [
          
          {
            panelName: "Shop Presentation",
            panelIcon: ImageIcon({}),
            panelUrl: "/presentation",
            panelComponent: <ShopPresentationForm />,
          },
        ],
      },
    ],
  },
  
  {
    panelName: "Orders",
    panelIcon: <HiOutlineClipboardList />,
    panelUrl: "orders",
    panelComponent: <OrdersPage/>,
  },
  {
    panelName: "Sales Statistics",
    panelIcon: <HiOutlineChartBar />,
    panelUrl: "sales-statistics",
    panelComponent: <SalesSection />,
  },

  {
    panelName: "Affiliation System",
    panelIcon: <FiUsers />,
    panelUrl: "affiliation-system",
    panelComponent: <AffiliationHistorySection />,
  },
  {
    panelName: "Returned Orders",
    panelIcon: <IoReturnDownBackOutline />,
    panelUrl: "returned-orders",
    panelComponent: <ReturnOrdersSection />,
  },
  {
    panelName: "Shipping Settings",
    panelIcon: <MdOutlineLocalShipping />,
    panelUrl: "shipping-settings",
    panelComponent: <ShippingSettingSection />,
  },
  {
    panelName: "Reviews",
    panelIcon: <FaRegStar />,
    panelUrl: "reviews",
    panelComponent: <ProductReviewSection />,
  },
];