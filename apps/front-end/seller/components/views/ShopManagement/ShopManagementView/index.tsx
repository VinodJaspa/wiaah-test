import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MdOutlineShoppingBasket,
  MdOutlineComment,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { SettingsSectionType } from "types";
import { FaHistory } from "react-icons/fa";
import { BsBoxArrowInUp } from "react-icons/bs";
import {
  AffiliationIcon,
  ProductManagementSection,
  AffiliationHistorySection,
  ReviewsSection,
  ShippingSettingsSection,
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
import { HiOutlineDocumentDownload } from "react-icons/hi";

export interface ShopManagementViewProps { }

export const ShopManagementView: React.FC<ShopManagementViewProps> = ({ }) => {
  const baseRoute = getRouting((r) => r.visitShopManagement());
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section.join("/") : section;

const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

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
    panelIcon: MdOutlineShoppingBasket({}),
    panelUrl: "/product-management",
    panelComponent: <ProductManagementSection />,
  },
  {
    panelName: "Downloadables Management",
    panelIcon: HiOutlineDocumentDownload({}),
    panelUrl: "/donwloadables-management",
    panelComponent: <DownloadableManagement />,
  },
  {
    panelName: "Orders",
    panelIcon: BsBoxArrowInUp({}),
    panelUrl: "/orders",
    panelComponent: <OrdersSection shopping={false} />,
  },
  {
    panelName: "Sales Statistics",
    panelIcon: BsBoxArrowInUp({}),
    panelUrl: "/sales-stats",
    panelComponent: <MySalesStatistics />,
  },
  {
    panelName: "Affiliation System",
    panelIcon: AffiliationIcon({}),
    panelUrl: "affiliation_system",
    panelComponent: null,
    subSections: [
      {
        key: "affiliation_system",
        sections: [
          {
            panelComponent: <AffiliationManagementSection />,
            panelIcon: FcSettings({}),
            panelName: "Affiliation Management",
            panelUrl: "/affiliation-management",
          },
          {
            panelComponent: <AffiliationHistorySection />,
            panelIcon: FaHistory({}),
            panelName: "Affiliation History",
            panelUrl: "/affiliation-history",
          },
        ],
      },
    ],
  },
  {
    panelName: "Returned Orders",
    panelIcon: BsBoxArrowInUp({}),
    panelUrl: "/returned-orders",
    panelComponent: <ReturnedOrders />,
  },
  {
    panelName: "Shipping Settings",
    panelIcon: MdOutlineLocalShipping({}),
    panelUrl: "/shipping-settings",
    panelComponent: <ShippingSettingsSection />,
  },
  {
    panelName: "Reviews",
    panelIcon: MdOutlineComment({}),
    panelUrl: "/reviews",
    panelComponent: <ReviewsSection />,
  },
];
