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
  CanceledOrdersSection,
  ReviewsSection,
  ShippingSettingsSection,
  AffiliationManagementSection,
  SectionsLayout,
} from "ui";

export interface ShopManagementViewProps {}

export const ShopManagementView: React.FC<ShopManagementViewProps> = ({}) => {
  const baseRoute = "shop-management";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  const { t } = useTranslation();

  React.useEffect(() => {
    if (!route) router.push(`/${baseRoute}/${sections[0].panelUrl}`);
  }, [router, route]);

  function handleSectionChange(url: string) {
    router.replace(`/${baseRoute}/${url}`);
  }

  return (
    <SectionsLayout
      handleSectionChange={handleSectionChange}
      currentSectionName={route}
      sections={sections}
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
      translationKey: "canceled_orders",
      fallbackText: "Canceled Orders",
    },
    panelIcon: BsBoxArrowInUp,
    panelUrl: "/canceled-orders",
    panelComponent: <CanceledOrdersSection />,
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
