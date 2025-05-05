import {
  AdminListTable,
  AdminTableCellTypeEnum,
  usePaginationControls,
} from "@blocks";
import {
  Badge,
  CashbackBadge,
  PriceDisplay,
  Select,
  SelectOption,
} from "@partials";
import { useAdminGetSalesByPeriod } from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

export const SellerAccountSales: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { form, inputProps, selectProps, dateInputProps } = useForm<
    Parameters<typeof useAdminGetSalesByPeriod>[0]
  >({ pagination }, { pagination });
  const { data: sales } = useAdminGetSalesByPeriod(form);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Select className="w-fit">
        <SelectOption value={"daily"}>{t("Daily")}</SelectOption>
        <SelectOption value={"weekly"}>{t("Weekly")}</SelectOption>
        <SelectOption value={"monthly"}>{t("Monthly")}</SelectOption>
        <SelectOption value={"yearly"}>{t("Yearly")}</SelectOption>
      </Select>
      <AdminListTable
        contain
        pagination={controls}
        data={mapArray(
          sales,
          ({
            id,
            product,
            order,
            qty,
            status,
            buyer,
            paid,
            affiliator,
            cashback,
            discount,
            discountAmount,
            createdAt,
          }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.image,
                value: product.thumbnail,
              },
              { value: product.title },
              { value: qty.toString() },
              { value: buyer?.profile?.username },
              { value: order?.shippingAddress?.location?.address },
              { value: "" },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <Badge cases={{ off: "pending", fail: "canceled" }}>
                    {status}
                  </Badge>
                ),
              },
              {
                value: affiliator ? affiliator.profile?.username : "N/A",
                type: AdminTableCellTypeEnum.text,
              },
              {
                type: AdminTableCellTypeEnum.text,
                value: `${discountAmount} (${discount}%)`,
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: <PriceDisplay price={paid} />,
              },
              {
                type: AdminTableCellTypeEnum.custom,
                custom: (
                  <CashbackBadge
                    props={{ className: "w-fit" }}
                    amount={cashback}
                  />
                ),
              },
              { value: new Date(createdAt).toDateString() },
            ],
          }),
        )}
        headers={[
          {
            value: t("Photo"),
            props: { className: "w-32" },
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Product Name"),
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Quantity"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Buyer"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Address"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Payment Method"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("Status"),
          },
          { value: t("Affiliator"), type: AdminTableCellTypeEnum.text },
          { value: t("Discount"), type: AdminTableCellTypeEnum.text },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Paid"),
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: t("Cashback"),
          },
          {
            type: AdminTableCellTypeEnum.date,
            value: t("Date"),
          },
        ]}
        title={`${t("Sales")}`}
      />
    </div>
  );
};
