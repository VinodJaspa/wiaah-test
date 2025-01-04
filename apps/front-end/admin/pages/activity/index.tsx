import { usePaginationControls } from "@blocks";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Select, SelectOption } from "@partials";
import { startCase } from "lodash";
import { NextPage } from "next";
import Head from "next/head";
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

const eventsList = [
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

type EventType = (typeof eventsList)[number];

const generateActivities = (): Activity[] =>
  [...Array(10)].map((_, i) => ({
    id: i.toString(),
    causedBy: { id: i.toString(), name: "username" },
    createdAt: new Date().toISOString(),
    event: eventsList[randomNum(eventsList.length)],
    causedTo: { id: i.toString(), name: "product title" },
  }));

const groupEventsByCategory = (events: readonly string[]) =>
  events.reduce<Record<string, string[]>>((acc, curr) => {
    const [parent] = curr.split("-");
    acc[parent] = [...(acc[parent] || []), curr];
    return acc;
  }, {});

const activitiesData = generateActivities();
const categorizedEvents = groupEventsByCategory(eventsList);

const Activites: Activity[] = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  causedBy: {
    id: i.toString(),
    name: "username",
  },
  createdAt: new Date().toDateString(),
  event: eventsList[randomNum(eventsList.length)],
  causedTo: {
    id: i.toString(),
    name: "product title",
  },
}));

const Activity: NextPage = () => {
  const events = eventsList.reduce(
    (acc, curr) => {
      const parant = curr.split("-")[0];
      const exists = acc[parant] || [];
      const currEvents = [...exists, curr];

      return {
        ...acc,
        [parant]: currEvents,
      };
    },
    {} as Record<string, string[]>,
  );

  const { controls } = usePaginationControls();

  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Head>
        <title>Admin | Activity</title>
      </Head>
      <section>
        <AdminListTable
          pagination={controls}
          headers={[
            {
              type: AdminTableCellTypeEnum.custom,
              value: t("Event"),
              custom: (
                <Select>
                  {Object.entries(categorizedEvents).flatMap(
                    ([parent, events]) => [
                      <SelectOption
                        key={`parent-${parent}`}
                        value={parent}
                        className="font-bold"
                      >
                        {startCase(parent)}
                      </SelectOption>,
                      ...events.map((event) => (
                        <SelectOption key={event} value={event}>
                          {startCase(event)}
                        </SelectOption>
                      )),
                    ],
                  )}
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
                      event={event as (typeof eventsList)[number]}
                      from={
                        <span className="px-2 text-primary">
                          {causedBy.name}
                        </span>
                      }
                      to={
                        <span className="px-2 text-primary">
                          {causedTo.name}
                        </span>
                      }
                    />
                  ),
                },
                {
                  value: new Date(createdAt).toDateString(),
                },
              ],
            }),
          )}
        />
      </section>
    </React.Fragment>
  );
};

export default Activity;

const GetActivityMessage: React.FC<{
  event: (typeof eventsList)[number];
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
