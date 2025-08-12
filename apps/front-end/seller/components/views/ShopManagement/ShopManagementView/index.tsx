import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MdOutlineShoppingBasket,
  MdOutlineComment,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { SettingsSectionType } from "types";
import { FaHistory, FaRegStar } from "react-icons/fa";
import { BsBoxArrowInUp } from "react-icons/bs";
import {
  AffiliationIcon,
 
  AffiliationHistorySection,
  ReviewsSection,

  AffiliationManagementSection,
  SectionsLayout,
  ReturnedOrders,
  OrdersSection,
  DownloadableManagement,
  SalesStatistics,
  MySalesStatistics,
} from "ui";
import { getRouting } from "routing";
import { FcSettings } from "react-icons/fc";
import { HiOutlineChartBar, HiOutlineClipboardList, HiOutlineDocumentDownload } from "react-icons/hi";

import { FiUsers } from "react-icons/fi";
import { IoReturnDownBackOutline } from "react-icons/io5";
import ShippingSettingSection from "components/Shipping/ShippingPage";
import ProductReviewSection from "components/Reviews/ProductReviewSection";
import ReturnOrdersSection from "components/ReturnOrders/ReturnOrders";
import OrdersPage from "components/Order/OrdersPage";
import ProductTable from "@sections/ShopManagement/ProductManagementSections/ProductManagement";
import SalesSection from "@sections/SalesSection/SalesStatisticsSummary";


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

// const sections: SettingsSectionType[] = [
//   {
//     panelName: "Product Management",
//     panelIcon: MdOutlineShoppingBasket({}),
//     panelUrl: "product-management", // ✅ fixed
//     panelComponent: <ProductTable/>,
//   },
//   {
//     panelName: "Downloadables Management",
//     panelIcon: HiOutlineDocumentDownload({}),
//     panelUrl: "downloadables-management", // ✅ fixed typo too
//     panelComponent: <DownloadableManagement />,
//   },
//   {
//     panelName: "Orders",
//     panelIcon: BsBoxArrowInUp({}),
//     panelUrl: "orders", // ✅
//     panelComponent: <OrdersSection shopping={false} />,
//   },
//   {
//     panelName: "Sales Statistics",
//     panelIcon: BsBoxArrowInUp({}),
//     panelUrl: "sales-stats", // ✅
//     panelComponent: <MySalesStatistics />,
//   },
//   {
//     panelName: "Affiliation System",
//     panelIcon: AffiliationIcon({}),
//     panelUrl: "affiliation_system", // ✅ already fine
//     panelComponent: null,
//     subSections: [
//       {
//         key: "affiliation_system",
//         sections: [
//           {
//             panelComponent: <AffiliationManagementSection />,
//             panelIcon: FcSettings({}),
//             panelName: "Affiliation Management",
//             panelUrl: "affiliation-management", // ✅
//           },
//           {
//             panelComponent: <AffiliationHistorySection />,
//             panelIcon: FaHistory({}),
//             panelName: "Affiliation History",
//             panelUrl: "affiliation-history", // ✅
//           },
//         ],
//       },
//     ],
//   },
//   {
//     panelName: "Returned Orders",
//     panelIcon: BsBoxArrowInUp({}),
//     panelUrl: "returned-orders", // ✅
//     panelComponent: <ReturnedOrders />,
//   },
//   {
//     panelName: "Shipping Settings",
//     panelIcon: MdOutlineLocalShipping({}),
//     panelUrl: "shipping-settings", // ✅
//     panelComponent: <ShippingSettingsSection />,
//   },
//   {
//     panelName: "Reviews",
//     panelIcon: MdOutlineComment({}),
//     panelUrl: "reviews", // ✅
//     panelComponent: <ReviewsSection />,
//   },
// ];

const sections: SettingsSectionType[] = [
  {
    panelName: "Product Management",
    panelIcon: <MdOutlineShoppingBasket />,
    panelUrl: "product-management",
    panelComponent: <ProductTable />,
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