import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  SimpleTabs,
  SimpleTabItemList,
  SimpleTabHead,
  usePaginationControls,
} from "ui";
import { randomNum } from "utils";
import { getRandomImage } from "placeholder";
import { random } from "lodash";

const Edit = () => {
  const { getParam } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const isProducts = false;

  const productsTitle = isProducts ? "Products" : "services";

  const tabsTitles = [
    "General",
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
    "Personalization and data",
  ];

  const name = "wiaah";

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
        </SimpleTabItemList>
      </SimpleTabs>
    </>
  );
};

export default Edit;
