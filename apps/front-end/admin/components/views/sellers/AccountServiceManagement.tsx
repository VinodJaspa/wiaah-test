import {
  AdminListTable,
  AdminTableCellTypeEnum,
  usePaginationControls,
} from "@blocks";
import { ServiceType } from "@features/API";
import { Select, SelectOption } from "@partials";
import {
  useAdminGetSellerAccountDetailsQuery,
  useGetAdminFoodQuery,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { NumberShortner, randomNum, useForm } from "utils";

export const AccountServiceManagement: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { data } = useAdminGetSellerAccountDetailsQuery(accountId);

  const serviceType: ServiceType = ServiceType.HealthCenter as ServiceType;

  switch (serviceType) {
    case ServiceType.Restaurant:
      return <AdminAccountRestaurantDishs serviceId={data?.service?.id} />;
    case ServiceType.HealthCenter:
      return <AdminAccountHealthCenterDoctors serviceId={data?.service?.id} />;
    default:
      return null;
  }
};

const AdminAccountRestaurantDishs: React.FC<{
  serviceId: string;
}> = ({ serviceId }) => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { pagination, controls } = usePaginationControls();
  const { form, inputProps, selectProps } = useForm<
    Parameters<typeof useGetAdminFoodQuery>[0]
  >({
    pagination,
  });
  const { data } = useGetAdminFoodQuery(form);

  return (
    <AdminListTable
      pagination={controls}
      data={
        data?.map((v, i) => ({
          id: v.id,
          cols: [
            {
              value: v.thumbnail,
              type: AdminTableCellTypeEnum.image,
              props: {
                className: "w-24 h-16 object-cover",
              },
            },
            {
              value: v.name,
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: v.menu?.restaurant?.owner?.profile?.username || "",
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: v.type,
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: v.menu?.restaurant?.establishmentType?.name || "",
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: v.menu.restaurant.location.country,
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: v.menu.restaurant.location.city,
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: String(v.sales),
              type: AdminTableCellTypeEnum.number,
            },
          ],
        })) || []
      }
      headers={[
        {
          value: t("Image"),
          type: AdminTableCellTypeEnum.image,
        },
        {
          value: t("Food name"),
          type: AdminTableCellTypeEnum.text,
          filtersProps: inputProps("name"),
        },
        {
          value: t("Seller"),
          filtersProps: inputProps("seller"),
          type: AdminTableCellTypeEnum.text,
        },
        {
          value: t("Food type"),
          type: AdminTableCellTypeEnum.custom,
          custom: (
            <Select {...selectProps("type")}>
              <SelectOption value={"starter"}>{t("Starter")}</SelectOption>
              <SelectOption value={"main"}>{t("Main")}</SelectOption>
              <SelectOption value={"dessert"}>{t("Dessert")}</SelectOption>
            </Select>
          ),
        },
        {
          value: t("Type of restaurant"),
          type: AdminTableCellTypeEnum.text,
          //   filtersProps:inputProps(""),
        },
        {
          value: t("Country"),
          type: AdminTableCellTypeEnum.text,
          filtersProps: inputProps("country"),
        },
        {
          value: t("City"),
          type: AdminTableCellTypeEnum.text,
          filtersProps: inputProps("city"),
        },
        {
          value: t("Number of bookings"),
          type: AdminTableCellTypeEnum.text,
          filtersProps: inputProps("sales"),
        },
      ]}
      title={t("Dishs")}
    ></AdminListTable>
  );
};

const AdminAccountHealthCenterDoctors: React.FC<{
  serviceId: string;
}> = ({ serviceId }) => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { pagination, controls } = usePaginationControls();
  const { form, inputProps, selectProps } = useForm<
    Parameters<typeof useGetAdminFoodQuery>[0]
  >({
    pagination,
  });
  const speciality = ["eye", "lungs", "dentist"];
  const { data } = {
    data: [...Array(6)].map((v, i) => ({
      id: i.toString(),
      name: `doctor-${i}`,
      thumbnail:
        "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
      type: speciality[i % speciality.length],
      country: "switzerland",
      city: "geneve",
      sales: randomNum(5000),
    })),
  };

  return (
    <AdminListTable
      pagination={controls}
      data={
        data?.map((v, i) => ({
          id: v.id,
          cols: [
            {
              value: v.thumbnail,
              type: AdminTableCellTypeEnum.image,
              props: {
                className: "w-24 h-16 object-cover",
              },
            },
            {
              value: v.name,
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: v.type,
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: `${v.country}, ${v.city}`,
              type: AdminTableCellTypeEnum.text,
            },
            {
              value: NumberShortner(v.sales),
              type: AdminTableCellTypeEnum.text,
            },
          ],
        })) || []
      }
      headers={[
        {
          value: t("Image"),
          type: AdminTableCellTypeEnum.image,
        },
        {
          value: t("Doctor name"),
          type: AdminTableCellTypeEnum.text,
          filtersProps: inputProps("name"),
        },
        {
          value: t("Doctor type"),
          filtersProps: inputProps("type"),
          type: AdminTableCellTypeEnum.text,
        },
        {
          value: t("Country and city"),
          type: AdminTableCellTypeEnum.text,
        },
        {
          value: t("Number of bookings"),
          type: AdminTableCellTypeEnum.text,
          filtersProps: inputProps("sales"),
        },
      ]}
      title={t("Doctors")}
    ></AdminListTable>
  );
};
