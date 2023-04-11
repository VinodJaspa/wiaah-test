import { useRouter } from "next/router";
import React from "react";
import { MdList } from "react-icons/md";
import { SettingsSectionType } from "types";
import {
  AddressBookSection,
  BookingsHistory,
  MyReturnsSection,
  MyShoppingStats,
  MyWishListSection,
  OrdersSection,
  PaymentMethodsSection,
  SectionsLayout,
} from "ui";

import { MdPayment } from "react-icons/md";
import { BsBoxArrowInUp } from "react-icons/bs";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { GiPostStamp } from "react-icons/gi";
import { RiBookLine } from "react-icons/ri";
import { getRouting } from "routing";
import { FcStatistics } from "react-icons/fc";

export const ShoppingManagementView: React.FC = () => {
  const baseRoute = getRouting((r) => r.visitShoppingManagement());
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  function handleSectionChange(url: string) {
    router.replace(`/${baseRoute}/${url}`);
  }

  return (
    <SectionsLayout
      currentSectionName={route}
      name={{
        translationKey: "shopping_management",
        fallbackText: "Shopping Management",
      }}
      handleRetrun={() => {
        router.replace(`/${baseRoute}`);
      }}
      sections={sections}
      handleSectionChange={handleSectionChange}
    />
  );
};

const sections: SettingsSectionType[] = [
  {
    panelName: "My Wishlist",
    panelIcon: MdList({}),
    panelUrl: "/my-wishlist",
    panelComponent: <MyWishListSection />,
  },
  {
    panelName: "Shopping Statistics",
    panelIcon: <FcStatistics />,
    panelUrl: "/shopping-stats",
    panelComponent: <MyShoppingStats />,
  },
  {
    panelName: "Orders",
    panelIcon: BsBoxArrowInUp({}),
    panelUrl: "/orders",
    panelComponent: <OrdersSection shopping />,
  },
  {
    panelName: "Bookings",
    panelIcon: RiBookLine({}),
    panelUrl: "/bookings",
    panelComponent: <BookingsHistory shopping />,
  },
  {
    panelName: "My Returns",
    panelIcon: IoReturnUpBackSharp({}),
    panelUrl: "/my-returns",
    panelComponent: <MyReturnsSection />,
  },
  {
    panelName: "Payment Meothds",
    panelIcon: MdPayment({}),
    panelUrl: "/payment-motheds",
    panelComponent: <PaymentMethodsSection />,
  },
  {
    panelName: "Address Book",
    panelIcon: GiPostStamp({}),
    panelUrl: "/address-book",
    panelComponent: <AddressBookSection />,
  },
];
