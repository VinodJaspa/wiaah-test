import {
  AdminListTable,
  AdminTableCellTypeEnum,
  usePaginationControls,
} from "@blocks";
import { ProductStatus } from "@features/API";
import { setTestid, useGetMyProducts } from "@UI";
import { Badge, Button, DownloadIcon, PriceDisplay } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const DownloadableManagement: React.FC<{}> = ({}) => {
  const { t } = useTranslation();

  const { controls, pagination } = usePaginationControls();
  const { data } = useGetMyProducts({
    pagination,
  });

  console.log({ data });

  return (
    <AdminListTable
      pagination={controls}
      title={t("Download List")}
      {...setTestid("table")}
      data={
        data?.map((v) => ({
          id: v.id,
          cols: [
            {
              type: AdminTableCellTypeEnum.checkbox,
              value: v.id,
            },
            {
              type: AdminTableCellTypeEnum.avatar,
              value: v.thumbnail,
              props: {
                className: "w-12",
              },
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: v.id,
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: v.title,
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: v.seller.profile?.username,
            },
            {
              type: AdminTableCellTypeEnum.custom,
              custom: (
                <Badge
                  cases={{
                    fail: [ProductStatus.Deleted, ProductStatus.Suspended],
                    off: ProductStatus.Pending,
                    warning: ProductStatus.Pasued,
                  }}
                  value={v.status}
                >
                  {v.status}
                </Badge>
              ),
            },
            {
              type: AdminTableCellTypeEnum.custom,
              custom: <PriceDisplay price={v.price} />,
            },
            {
              type: AdminTableCellTypeEnum.action,
              actionBtns: [
                <Button className="p-3" center>
                  <DownloadIcon />
                </Button>,
              ],
            },
          ],
        })) || []
      }
      headers={[
        {
          type: AdminTableCellTypeEnum.checkbox,
        },
        {
          type: AdminTableCellTypeEnum.text,
          value: t("Photo"),
        },
        {
          type: AdminTableCellTypeEnum.text,
          value: t("Order Id"),
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
          value: t("Status"),
        },
        {
          type: AdminTableCellTypeEnum.text,
          value: t("Total"),
        },
        {
          type: AdminTableCellTypeEnum.action,
          value: t("Action"),
        },
      ]}
    />
  );
};
