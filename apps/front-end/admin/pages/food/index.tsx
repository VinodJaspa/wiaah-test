import {
  AdminListTable,
  AdminTableCellTypeEnum,
  usePaginationControls,
} from "@blocks";
import { RestaurantDishType } from "@features/API";
import { Select, SelectOption } from "@partials";
import { GetAdminDishsQuery, useGetAdminFoodQuery } from "@UI";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "utils";
const FoodAdminMenu = () => {
  const { t } = useTranslation();
  const { pagination, controls } = usePaginationControls();
  const { form, inputProps, selectProps } = useForm<
    Parameters<typeof useGetAdminFoodQuery>[0]
  >({
    pagination,
  });
  // NOTE: graphql is not ready so I replaced i with placeholder
  const { data: _data } = useGetAdminFoodQuery(form);
  const data = FAKE_FOOD;

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

export default FoodAdminMenu;

const FAKE_FOOD: GetAdminDishsQuery["adminGetDishs"] = [
  {
    __typename: "Dish",
    id: "dish1",
    name: "Spaghetti Carbonara",
    thumbnail: getRandomImage(),
    type: RestaurantDishType.Main,
    sales: 150,
    menu: {
      __typename: "RestaurantMenu",
      restaurant: {
        __typename: "ServiceDetails",
        location: {
          __typename: "ServiceLocation",
          country: "Italy",
          city: "Rome",
        },
        establishmentType: {
          __typename: "RestaurantEstablishmentType",
          name: "Fine Dining",
        },
        owner: {
          __typename: "Account",
          profile: {
            __typename: "Profile",
            username: "chef_roma",
          },
        },
      },
    },
  },
  {
    __typename: "Dish",
    id: "dish2",
    name: "Sushi Platter",
    thumbnail: getRandomImage(),
    type: RestaurantDishType.Main,
    sales: 200,
    menu: {
      __typename: "RestaurantMenu",
      restaurant: {
        __typename: "ServiceDetails",
        location: {
          __typename: "ServiceLocation",
          country: "Japan",
          city: "Tokyo",
        },
        establishmentType: {
          __typename: "RestaurantEstablishmentType",
          name: "Casual Dining",
        },
        owner: {
          __typename: "Account",
          profile: {
            __typename: "Profile",
            username: "sushi_master",
          },
        },
      },
    },
  },
];
