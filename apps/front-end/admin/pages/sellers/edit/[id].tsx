import { AccountAddressBook } from "components/views/sellers/AccountAddressBook";
import { AccountBlockList } from "components/views/sellers/AccountBlockList";
import { AccountNewsletterSettings } from "components/views/sellers/AccountNewsletterSettings";
import { AccountNotifications } from "components/views/sellers/AccountNotifications";
import { AccountOpeningTimeManagement } from "components/views/sellers/AccountOpeningTimeManagement";
import { AccountPaymentMethods } from "components/views/sellers/AccountPaymentMethods";
import { AccountPayouts } from "components/views/sellers/AccountPayouts";
import { AccountPendingAppointments } from "components/views/sellers/AccountPendingAppointments";
import { AccountPersonalizationSettings } from "components/views/sellers/AccountPersonalizationSettings";
import { AccountPrivacySettings } from "components/views/sellers/AccountPrivacySettings";
import { AccountProductManagement } from "components/views/sellers/AccountProductManagement";
import { AccountRendezVous } from "components/views/sellers/AccountRendezVous";
import { AccountSavedPosts } from "components/views/sellers/AccountSavedPosts";
import { AccountSecuritySettings } from "components/views/sellers/AccountSecuritySettings";
import { AccountServiceManagement } from "components/views/sellers/AccountServiceManagement";
import { AccountShippingSettings } from "components/views/sellers/AccountShippingSettings";
import { AccountShopReturns } from "components/views/sellers/AccountShopReturns";
import { AccountShopReviews } from "components/views/sellers/AccountShopReviews";
import { AccountTransactions } from "components/views/sellers/AccountTransaction";
import { AccountVerifciation } from "components/views/sellers/AccountVerifciation";
import { AccountVouchers } from "components/views/sellers/AccountVouchers";
import { AccountAffiliation } from "components/views/sellers/affiliation";
import { AccountBookingsHistory } from "components/views/sellers/bookingsHistory";
import { AccountFeesTab } from "components/views/sellers/fees";
import { AccountGeneralView } from "components/views/sellers/general";
import { SellerListing } from "components/views/sellers/listing";
import { AccountOrderHistory } from "components/views/sellers/orderHistory";
import { AccountReturns } from "components/views/sellers/returns";
import { SellerAccountSales } from "components/views/sellers/SellerSales";
import { AccountSocialInfo } from "components/views/sellers/socialInfo";
import { AccountWishlist } from "components/views/sellers/wishlist";
import { AccountStatistics } from "components/views/sellers/AccountStatistics";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  SimpleTabs,
  SimpleTabItemList,
  SimpleTabHead,
  ProfileStatistics,
} from "ui";

const Edit = () => {
  const { getParam } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const isProducts = false;

  const productsTitle = isProducts ? "Products" : "Services";

  const tabsTitles = [
    "General",
    "Listing",
    "Fees",
    "Affiliation",
    productsTitle,
    "Orders",
    "Bookings",
    "Social Info",
    "Sales",
    "Wishlist",
    "returns",
    "PaymentMethods",
    "AddressBook",
    "Notifications",
    "Newsletter",
    "Blocklist",
    "Privacy",
    "Account Verification",
    "Personalization and data",
    "Rendez-vous",
    "Pending Appointments",
    "Opening time management",
    "Saved Posts",
    "Shop Returns",
    "Shipping Settings",
    "Shop Reviews",
    "Transactions",
    "Payout",
    "Vouchers",
    "Statistics",
    "Security",
  ];

  return (
    <>
      <SimpleTabs>
        <div className="flex flex-wrap gap-2 ">
          <SimpleTabHead>
            {tabsTitles.map((v, i) => ({ onClick, selected }) => (
              <div
                key={i}
                onClick={onClick}
                className={`border-darkerGray border-b border-b-transparent hover:border-b-darkerGray px-6 py-2 ${
                  selected ? "border-t border-l border-r font-bold" : ""
                }`}
              >
                {t(v)}
              </div>
            ))}
          </SimpleTabHead>
        </div>

        <SimpleTabItemList>
          <AccountGeneralView accountId={id} />
          <SellerListing></SellerListing>
          <AccountFeesTab accountId={id} />
          <AccountAffiliation showList accountId={id} />
          {isProducts ? (
            <AccountProductManagement accountId={id} />
          ) : (
            <AccountServiceManagement accountId={id} />
          )}
          <AccountOrderHistory accountId={id} />
          <AccountBookingsHistory accountId={id} />
          <AccountSocialInfo accountId={id} />
          <SellerAccountSales accountId={id} />
          <AccountWishlist accountId={id} />
          <AccountReturns accountId={id} />
          <AccountPaymentMethods accountId={id} />
          <AccountAddressBook accountId={id} />
          <AccountNotifications accountId={id} />
          <AccountNewsletterSettings accountId={id} />
          <AccountBlockList accountId={id} />
          <AccountVerifciation accountId={id} />
          <AccountPrivacySettings accountId={id} />
          <AccountPersonalizationSettings accountId={id} />
          <AccountRendezVous accountId={id} />
          <AccountPendingAppointments accountId={id} />
          <AccountOpeningTimeManagement accountId={id} />
          <AccountSavedPosts accountId={id} />
          <AccountShopReturns accountId={id} />
          <AccountShippingSettings accountId={id} />
          <AccountShopReviews accountId={id} />
          <AccountTransactions accountId={id} />
          <AccountPayouts accountId={id} />
          <AccountVouchers accountId={id} />
          <ProfileStatistics accountId={id} />
          <AccountSecuritySettings accountId={id} />
        </SimpleTabItemList>
      </SimpleTabs>
    </>
  );
};

export default Edit;
