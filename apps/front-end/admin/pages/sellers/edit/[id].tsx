import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AccountSettingsSection,
  SimpleTabs,
  SimpleTabItemList,
  SimpleTabHead,
  ProductDetailsTable,
  HotelDetailedSearchCard,
  AffiliationHistorySection,
  AffiliationListSection,
  Stack,
  Divider,
  BookingsSection,
  OrdersSection,
} from "ui";
import { randomNum } from "utils";
import { lngs, lats } from "api";

const Edit = () => {
  const { getParam } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const isProducts = false;

  const servicedata = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    provider: "Crowne Plaza",
    rate: 4.8,
    serviceClass: 3.5,
    thumbnail: "/place-1.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deserunt odio quisquam qui sit corrupti ab est voluptas sunt quis nesciunt facilis a debitis eius mollitia quasi eum beatae autem.",
    reviews: randomNum(500),
    id: `${1564546}`,
    date: {
      from: Date.now(),
      to: Date.now(),
    },
    pricePerNight: randomNum(3000),
    taxesAndFeesIncluded: true,
    totalPrice: 5000,
    location: {
      address: "address",
      city: "switzerland",
      country: "france",
      countryCode: "CHF",
      state: "Geneve",
      postalCode: 1234,
      cords: {
        lng: lngs[randomNum(lngs.length)],
        lat: lats[randomNum(lats.length)],
      },
    },
  };

  const productComp = isProducts ? (
    <ProductDetailsTable />
  ) : (
    <HotelDetailedSearchCard {...servicedata} />
  );
  const invoiceComp = isProducts ? (
    <OrdersSection shopping={false} />
  ) : (
    <BookingsSection />
  );

  const productsTitle = isProducts ? "Products" : "services";

  const tabsTitles = [
    "General",
    "Fees",
    "Affiliation",
    productsTitle,
    "Transactions",
    "Invoices",
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
          <AccountSettingsSection />
          <div>fees</div>
          <Stack col divider={<Divider />}>
            <AffiliationListSection />
            <AffiliationHistorySection />
          </Stack>
          {productComp}
          <div>transations</div>
          <div>{invoiceComp}</div>
        </SimpleTabItemList>
      </SimpleTabs>
    </>
  );
};

export default Edit;
