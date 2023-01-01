import { usePaginationControls } from "@blocks";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Select, SelectOption } from "@partials";
import { startCase } from "lodash";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { randomNum, runIfFn } from "utils";

interface Activity {
  id: string;
  event: string;
  createdAt: string;
  causedBy: {
    id: string;
    name: string;
  };
  causedTo?: {
    id: string;
    name: string;
  };
}

const _events = [
  "product-created",
  "product-deleted",
  "product-modified",
  "product-purchased",
  "seller-created",
  "seller-deleted",
  "seller-banned",
  "seller-modified",
  "order-created",
  "order-modified",
  "order-canceled",
  "service-created",
  "service-deleted",
  "service-modified",
  "service-booked",
  "buyer-created",
  "buyer-deleted",
  "buyer-banned",
] as const;

const Activites: Activity[] = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  causedBy: {
    id: i.toString(),
    name: "username",
  },
  createdAt: new Date().toDateString(),
  event: _events[randomNum(_events.length)],
  causedTo: {
    id: i.toString(),
    name: "product title",
  },
}));

const Activity: NextPage = () => {
  const events = _events.reduce((acc, curr) => {
    const parant = curr.split("-")[0];
    const exists = acc[parant] || [];
    const currEvents = [...exists, curr];

    return {
      ...acc,
      [parant]: currEvents,
    };
  }, {} as Record<string, string[]>);

  const { controls } = usePaginationControls();

  const { t } = useTranslation();
  return (
    <section>
      <AdminListTable
        pagination={controls}
        headers={[
          {
            type: AdminTableCellTypeEnum.custom,
            value: t("Event"),
            custom: (
              <Select>
                {Object.entries(events)
                  .map(([parant, events], i) => (
                    <React.Fragment key={parant + i}>
                      {[
                        <p key={parant + i} className="font-bold p-2">
                          {parant}
                        </p>,
                      ].concat(
                        events.map((event, i) => (
                          <SelectOption key={event + i} value={event}>
                            {startCase(event)}
                          </SelectOption>
                        ))
                      )}
                    </React.Fragment>
                  ))
                  .flat()}
              </Select>
            ),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Description"),
          },
          {
            type: AdminTableCellTypeEnum.date,
            value: t("Date"),
            props: { className: "w-48" },
          },
        ]}
        title={t("Marketplace Activity")}
        data={Activites.map(
          ({ causedBy, createdAt, event, id, causedTo }, i) => ({
            id,
            cols: [
              {
                value: startCase(event),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <GetActivityMessage
                    event={event as typeof _events[number]}
                    from={
                      <span className="px-2 text-primary">{causedBy.name}</span>
                    }
                    to={
                      <span className="px-2 text-primary">{causedTo.name}</span>
                    }
                  />
                ),
              },
              {
                value: new Date(createdAt).toDateString(),
              },
            ],
          })
        )}
      />
    </section>
  );
};

export default Activity;

const GetActivityMessage: React.FC<{
  event: typeof _events[number];
  from: React.ReactNode;
  to?: React.ReactNode;
}> = ({ event, from, to }) => {
  const { t } = useTranslation();
  switch (event) {
    case "buyer-banned":
      return (
        <p>
          {t("Buyer")}
          <span>{runIfFn(from)}</span> {t("has been banned")}
        </p>
      );
    case "buyer-created":
      return (
        <p>
          {t("Buyer")}
          {runIfFn(from)}
          {t("has been created")}
        </p>
      );

    case "buyer-deleted":
      return (
        <p>
          {t("Buyer")}
          {runIfFn(from)}
          {t("has been deleted")}
        </p>
      );
    case "seller-banned":
      return (
        <p>
          {t("seller")}
          {runIfFn(from)}
          {t("has been banned")}
        </p>
      );
    case "seller-created":
      return (
        <p>
          {t("Seller")}
          {runIfFn(from)}
          {t("has been created")}
        </p>
      );
    case "seller-deleted":
      return (
        <p>
          {t("Seller")}
          {runIfFn(from)}
          {t("has been deleted")}
        </p>
      );
    case "seller-modified":
      return (
        <p>
          {t("Seller")}
          {runIfFn(from)}
          {t("has been modified")}
        </p>
      );
    case "order-created":
      return (
        <p>
          {t("Order")}
          {runIfFn(to)}
          {t("has been created by")}
          {runIfFn(from)}
        </p>
      );
    case "order-canceled":
      return (
        <p>
          {t("Order")}
          {runIfFn(to)}
          {t("has been canceled by")}
          {runIfFn(from)}
        </p>
      );
    case "order-modified":
      return (
        <p>
          {t("Order")}
          {runIfFn(to)}
          {t("has been modified by")}
          {runIfFn(from)}
        </p>
      );
    case "product-created":
      return (
        <p>
          {t("Product")}
          {runIfFn(to)}
          {t("has been created by")}
          {runIfFn(from)}
        </p>
      );
    case "product-deleted":
      return (
        <p>
          {t("Product")}
          {runIfFn(to)}
          {t("has been deleted by")}
          {runIfFn(from)}
        </p>
      );
    case "product-modified":
      return (
        <p>
          {t("Product")}
          {runIfFn(to)}
          {t("has been modified by")}
          {runIfFn(from)}
        </p>
      );
    case "product-purchased":
      return (
        <p>
          {t("Product")}
          {runIfFn(to)}
          {t("has been purchased by")}
          {runIfFn(from)}
        </p>
      );
    case "service-created":
      return (
        <p>
          {t("Service")}
          {runIfFn(to)}
          {t("has been created by")}
          {runIfFn(from)}
        </p>
      );
    case "service-deleted":
      return (
        <p>
          {t("Service")}
          {runIfFn(to)}
          {t("has been deleted by")}
          {runIfFn(from)}
        </p>
      );
    case "service-modified":
      return (
        <p>
          {t("Service")}
          {runIfFn(to)}
          {t("has been modified by")}
          {runIfFn(from)}
        </p>
      );
    case "service-booked":
      return (
        <p>
          {t("Service")}
          {runIfFn(to)}
          {t("has been booked by")}
          {runIfFn(from)}
        </p>
      );
  }
};
