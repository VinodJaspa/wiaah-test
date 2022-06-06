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
} from "ui";

export interface ShopManagementViewProps {}

export const ShopManagementView: React.FC<ShopManagementViewProps> = ({}) => {
  const baseRoute = "shop-management";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

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
      name={t("shop_management", "Shop Management")}
    />
  );
};

const sections: SettingsSectionType[] = [
  {
    panelName: {
      translationKey: "product_mangagement",
      fallbackText: "Product Management",
    },
    panelIcon: MdOutlineShoppingBasket,
    panelUrl: "/product-management",
    panelComponent: <ProductManagementSection />,
  },
  {
    panelName: {
      translationKey: "orders",
      fallbackText: "Orders",
    },
    panelIcon: BsBoxArrowInUp,
    panelUrl: "/orders",
    panelComponent: <OrdersSection />,
  },
  {
    panelName: {
      translationKey: "affiliation_management",
      fallbackText: "Affiliation Management",
    },
    panelIcon: AffiliationIcon,
    panelUrl: "/affiliation-management",
    panelComponent: <AffiliationManagementSection />,
  },
  {
    panelName: {
      translationKey: "affiliation_history",
      fallbackText: "Affiliation History",
    },
    panelIcon: FaHistory,
    panelUrl: "/affiliation-history",
    panelComponent: <AffiliationHistorySection />,
  },
  {
    panelName: {
      translationKey: "returned_orders",
      fallbackText: "Returned Orders",
    },
    panelIcon: BsBoxArrowInUp,
    panelUrl: "/returned-orders",
    panelComponent: <ReturnedOrders />,
  },
  {
    panelName: {
      translationKey: "shipping_settings",
      fallbackText: "Shipping Settings",
    },
    panelIcon: MdOutlineLocalShipping,
    panelUrl: "/shipping-settings",
    panelComponent: <ShippingSettingsSection />,
  },
  {
    panelName: {
      translationKey: "reviews",
      fallbackText: "Reviews",
    },
    panelIcon: MdOutlineComment,
    panelUrl: "/reviews",
    panelComponent: <ReviewsSection />,
  },
];
