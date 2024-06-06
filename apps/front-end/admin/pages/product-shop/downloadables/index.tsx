import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Badge, Button, PriceDisplay, SearchIcon } from "@partials";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";
import { startCase } from "lodash";
import { usePaginationControls } from "@blocks";
import { useRouting } from "routing";
import { getRandomImage } from "placeholder";

type DownloadedRecord = {
  id: string;
  name: string;
  seller: {
    id: string;
    name: string;
  };
  buyer: {
    id: string;
    name: string;
  };
  status: string;
  total: number;
  createdAt: string;
  thubmnail: string;
};

const items: DownloadedRecord[] = [
  {
    id: randomNum(150).toString(),
    buyer: {
      id: randomNum(150).toString(),
      name: `buyer-${randomNum(150)}`,
    },
    seller: {
      id: randomNum(150).toString(),
      name: `seller-${randomNum(150)}`,
    },
    createdAt: new Date().toDateString(),
    name: `downloadable-${randomNum(150)}`,
    status: "completed",
    total: randomNum(150),
    thubmnail: getRandomImage(),
  },
  {
    id: randomNum(150).toString(),
    buyer: {
      id: randomNum(150).toString(),
      name: `buyer-${randomNum(150)}`,
    },
    seller: {
      id: randomNum(150).toString(),
      name: `seller-${randomNum(150)}`,
    },
    createdAt: new Date().toDateString(),
    name: `downloadable-${randomNum(150)}`,
    status: "completed",
    total: randomNum(150),
    thubmnail: getRandomImage(),
  },
  {
    id: randomNum(150).toString(),
    buyer: {
      id: randomNum(150).toString(),
      name: `buyer-${randomNum(150)}`,
    },
    seller: {
      id: randomNum(150).toString(),
      name: `seller-${randomNum(150)}`,
    },
    createdAt: new Date().toDateString(),
    name: `downloadable-${randomNum(150)}`,
    status: "completed",
    total: randomNum(150),
    thubmnail: getRandomImage(),
  },
  {
    id: randomNum(150).toString(),
    buyer: {
      id: randomNum(150).toString(),
      name: `buyer-${randomNum(150)}`,
    },
    seller: {
      id: randomNum(150).toString(),
      name: `seller-${randomNum(150)}`,
    },
    createdAt: new Date().toDateString(),
    name: `downloadable-${randomNum(150)}`,
    status: "canceled",
    total: randomNum(150),
    thubmnail: getRandomImage(),
  },
  {
    id: randomNum(150).toString(),
    buyer: {
      id: randomNum(150).toString(),
      name: `buyer-${randomNum(150)}`,
    },
    seller: {
      id: randomNum(150).toString(),
      name: `seller-${randomNum(150)}`,
    },
    createdAt: new Date().toDateString(),
    name: `downloadable-${randomNum(150)}`,
    status: "canceled",
    total: randomNum(150),
    thubmnail: getRandomImage(),
  },
];

const Downloadables: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  const { controls } = usePaginationControls();
  return (
    <section>
      <AdminListTable
        contain
        pagination={controls}
        title={t("Download List")}
        headers={[
          {
            props: { className: "w-fit" },
            type: AdminTableCellTypeEnum.checkbox,
          },
          {
            props: { className: "w-32" },
            type: AdminTableCellTypeEnum.image,
            value: t("Photo"),
          },
          {
            value: t("Order Id"),
            type: AdminTableCellTypeEnum.text,
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Download Name"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Seller"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Buyer"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Status"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Total"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Date Added"),
          },
          {
            props: { align: "right" },
            type: AdminTableCellTypeEnum.action,
            value: t("Action"),
          },
        ]}
        data={items.map(
          ({
            buyer,
            createdAt,
            id,
            name,
            seller,
            status,
            total,
            thubmnail,
          }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                type: AdminTableCellTypeEnum.image,
                value: thubmnail,
              },
              {
                value: id,
              },
              {
                value: name,
              },
              {
                value: seller.name,
              },
              {
                value: buyer.name,
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <Badge
                    className="justify-center flex"
                    cases={{
                      off: "pending",
                      fail: "canceled",
                    }}
                    value={status}
                  >
                    {startCase(status)}
                  </Badge>
                ),
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: <PriceDisplay price={total} />,
              },
              {
                value: new Date(createdAt).toDateString(),
              },
              {
                props: { align: "right" },
                type: AdminTableCellTypeEnum.action,
                actionBtns: [
                  <Button
                    key={id}
                    onClick={() => {
                      visit((r) =>
                        r.addPath(getCurrentPath()).addPath("form").addPath(id)
                      );
                    }}
                    center
                    className="w-8 h-8"
                  >
                    <SearchIcon />
                  </Button>,
                ],
              },
            ],
          })
        )}
      />
    </section>
  );
};

export default Downloadables;
