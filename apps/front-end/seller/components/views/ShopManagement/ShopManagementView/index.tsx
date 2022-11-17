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
import { getRouting } from "routing";

export interface ShopManagementViewProps {}

export const ShopManagementView: React.FC<ShopManagementViewProps> = ({}) => {
  const baseRoute = getRouting((r) => r.visitShopManagement());
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
    panelName: "Product Management",
    panelIcon: MdOutlineShoppingBasket({}),
    panelUrl: "/product-management",
    panelComponent: <ProductManagementSection />,
  },
  {
    panelName: "Orders",
    panelIcon: BsBoxArrowInUp({}),
    panelUrl: "/orders",
    panelComponent: <OrdersSection shopping={false} />,
  },
  {
    panelName: "Affiliation Management",
    panelIcon: AffiliationIcon({}),
    panelUrl: "/affiliation-management",
    panelComponent: <AffiliationManagementSection />,
  },
  {
    panelName: "Affiliation History",
    panelIcon: FaHistory({}),
    panelUrl: "/affiliation-history",
    panelComponent: <AffiliationHistorySection />,
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
