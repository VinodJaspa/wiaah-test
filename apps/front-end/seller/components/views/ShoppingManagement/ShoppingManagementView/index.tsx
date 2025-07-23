import { useRouter } from "next/router";
import React from "react";
import { MdList } from "react-icons/md";
import { SettingsSectionType } from "types";
import {

  MyReturnsSection,
  SectionsLayout,
  useGetMyAccountQuery
} from "ui";

import { BsBoxArrowInUp } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";
import { GiPostStamp } from "react-icons/gi";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";
import { getRouting } from "routing";

import EarningsDashboard from "@sections/ShoppingManagement/ShoppingStats/EarningsDashboard";
import BookingsPage from "components/Bookings/BookingsPage";
import DigitalProductsPage from "components/DigitalProduct/DigitalProductsSection";
import OrdersPage from "components/Order/OrdersPage";
import MyWishlistPage from "components/ShopManagement/wishlist/wishlistSection";
import { BiDownload } from "react-icons/bi";
import PaymentMethodsSection from "components/Payment/PaymentMethods";
import AddressBookSection from "@sections/ShoppingManagement/AddressBook/AddressBookSection";

export const ShoppingManagementView: React.FC = () => {
  const { data } = useGetMyAccountQuery();
  const sections: SettingsSectionType[] = [
    {
      panelName: "My Wishlist",
      panelIcon: MdList({}),
      panelUrl: "/my-wishlist",
      panelComponent: <MyWishlistPage />,
    },
    {
      panelName: "My Shopping Statistics",
      panelIcon: <FcStatistics />,
      panelUrl: "/shopping-stats",
      panelComponent: <EarningsDashboard />,
    },
    {
      panelName: "My Orders",
      panelIcon: BsBoxArrowInUp({}),
      panelUrl: "/orders",
      panelComponent: <OrdersPage />,
    },
    {
      panelName: "Bookings",
      panelIcon: RiBookLine({}),
      panelUrl: "/bookings",
      panelComponent: <BookingsPage />,
    },
    {
      panelName: "My Digital Products",
      panelIcon: BiDownload({}),
      panelUrl: "/digital-products",
      panelComponent: <DigitalProductsPage />,
    },
    {
      panelName: "My Returns",
      panelIcon: IoReturnUpBackSharp({}),
      panelUrl: "/my-returns",
      panelComponent: <MyReturnsSection />,
    },
    {
      panelName: "My Payment Method",
      panelIcon: MdPayment({}),
      panelUrl: "/payment-methods",
      panelComponent: <PaymentMethodsSection />,
    },
    {
      panelName: "My Address Book",
      panelIcon: GiPostStamp({}),
      panelUrl: "/address-book",
      panelComponent: <AddressBookSection  />,
    },
    // {
    //   panelName: "My Shop & Book Earning",
    //   panelIcon: GiPostStamp({}),
    //   panelUrl: "/address-book",
    //   panelComponent: <AddressBookSection accountId={data?.id} />,
    // },
  ];

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
