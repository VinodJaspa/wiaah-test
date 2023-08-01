import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  SimpleTabs,
  SimpleTabItemList,
  SimpleTabHead,
  useAdminGetProfileQuery,
  SalesStatistics,
  ShoppingStats,
} from "ui";
import { randomNum } from "utils";
import { getRandomImage } from "placeholder";
import { AccountGeneralView } from "components/views/sellers/general";
import { AccountAffiliation } from "components/views/sellers/affiliation";
import { AccountAddressBook } from "components/views/sellers/AccountAddressBook";
import { AccountBlockList } from "components/views/sellers/AccountBlockList";
import { AccountNewsletterSettings } from "components/views/sellers/AccountNewsletterSettings";
import { AccountNotifications } from "components/views/sellers/AccountNotifications";
import { AccountPaymentMethods } from "components/views/sellers/AccountPaymentMethods";
import { AccountPayouts } from "components/views/sellers/AccountPayouts";
import { AccountPersonalizationSettings } from "components/views/sellers/AccountPersonalizationSettings";
import { AccountPrivacySettings } from "components/views/sellers/AccountPrivacySettings";
import { AccountSavedPosts } from "components/views/sellers/AccountSavedPosts";
import { AccountTransactions } from "components/views/sellers/AccountTransaction";
import { AccountVouchers } from "components/views/sellers/AccountVouchers";
import { AccountBookingsHistory } from "components/views/sellers/bookingsHistory";
import { AccountOrderHistory } from "components/views/sellers/orderHistory";
import { AccountReturns } from "components/views/sellers/returns";
import { AccountSocialInfo } from "components/views/sellers/socialInfo";
import { AccountWishlist } from "components/views/sellers/wishlist";

const Edit = () => {
  const { getParam } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const { data } = useAdminGetProfileQuery(id);

  const tabsTitles = [
    "General",
    "Affiliation",
    "Orders",
    "Bookings",
    "Social Info",
    "Wishlist",
    "Returns",
    "PaymentMethods",
    "AddressBook",
    "Notifications",
    "Newsletter",
    "Blocklist",
    "Privacy",
    "Personalization and data",
    "Saved Posts",
    "Transactions",
    "Payout",
    "Vouchers",
    "Shopping Statistics",
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
          <AccountAffiliation accountId={id} />
          <AccountOrderHistory accountId={id} />
          <AccountBookingsHistory accountId={id} />
          <AccountSocialInfo accountId={id} />
          <AccountWishlist accountId={id} />
          <AccountReturns accountId={id} />
          <AccountPaymentMethods accountId={id} />
          <AccountAddressBook accountId={id} />
          <AccountNotifications accountId={id} />
          <AccountNewsletterSettings accountId={id} />
          <AccountBlockList accountId={id} />
          <AccountPrivacySettings accountId={id} />
          <AccountPersonalizationSettings accountId={id} />
          <AccountSavedPosts accountId={id} />
          <AccountTransactions accountId={id} />
          <AccountPayouts accountId={id} />
          <AccountVouchers accountId={id} />
          <ShoppingStats accountId={id} />
        </SimpleTabItemList>
      </SimpleTabs>
    </>
  );
};

export default Edit;
