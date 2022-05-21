import { useRouter } from "next/router";
import React from "react";
import { MdList } from "react-icons/md";
import { SettingsSectionType } from "types";
import {
  MyReturnsSection,
  MyWishListSection,
  OrdersSection,
  PaymentMethodsSection,
  SectionsLayout,
} from "ui";
import { MdPayment } from "react-icons/md";
import { BsBoxArrowInUp } from "react-icons/bs";
import { IoReturnUpBackSharp } from "react-icons/io5";

export const ShoppingManagementView: React.FC = () => {
  const baseRoute = "shopping-management";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  React.useEffect(() => {
    if (!route) router.push(`/${baseRoute}/${sections[0].panelUrl}`);
  }, [router, route]);

  return (
    <SectionsLayout
      currentSectionName={route}
      name={{
        translationKey: "shopping_management",
        fallbackText: "Shopping Management",
      }}
      sections={sections}
      handleSectionChange={(url) => router.replace(`/${baseRoute}/${url}`)}
    />
  );
};

const sections: SettingsSectionType[] = [
  {
    panelName: {
      translationKey: "my-wishlist",
      fallbackText: "My Wishlist",
    },
    panelIcon: MdList,
    panelUrl: "/my-wishlist",
    panelComponent: <MyWishListSection />,
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
      translationKey: "my_returns",
      fallbackText: "My Returns",
    },
    panelIcon: IoReturnUpBackSharp,
    panelUrl: "/my-returns",
    panelComponent: <MyReturnsSection />,
  },
  {
    panelName: {
      translationKey: "payment_methods",
      fallbackText: "Payment Meothds",
    },
    panelIcon: MdPayment,
    panelUrl: "/payment-motheds",
    panelComponent: <PaymentMethodsSection />,
  },
];
