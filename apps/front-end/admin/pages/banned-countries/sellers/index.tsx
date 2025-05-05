import { usePaginationControls } from "@blocks";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Button, EditIcon } from "@partials";
import { useAdminGetBannedCountriesQuery } from "@UI";
import { accountType } from "nest-utils";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, useForm } from "utils";

interface BannedCountry {
  id: string;
  country: string;
  city: string;
}

const BannedCountries: BannedCountry[] = [
  {
    id: "1",
    city: "city name",
    country: "country",
  },
];

const BannedBuyers: NextPage = () => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { visit, getCurrentPath } = useRouting();

  const { pagination, controls } = usePaginationControls();
  // NOTE: The graphql is not ready yet and its error affect the built of admin app

  // const { form, inputProps } = useForm<
  //   Parameters<typeof useAdminGetBannedCountriesQuery>[0]
  // >(
  //   { pagination, type: accountType.SELLER },
  //   { pagination, type: accountType.SELLER }
  // );
  // const { data: _data } = useAdminGetBannedCountriesQuery(form);
  const data = FAKE_COUNTRIES;

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Banned Countries </title>
      </Head>
      <section>
        <AdminListTable
          pagination={controls}
          headers={[
            {
              type: AdminTableCellTypeEnum.checkbox,
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("Country Name"),
            },
            {
              type: AdminTableCellTypeEnum.text,
              value: t("City Name"),
            },
            {
              props: { align: "right" },
              type: AdminTableCellTypeEnum.action,
              value: t("Action"),
            },
          ]}
          onAdd={() =>
            visit((r) =>
              r.addPath(getCurrentPath()).addPath("form").addPath("new"),
            )
          }
          data={mapArray(data, ({ cities, id, isoCode, country }) => ({
            id,
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                value: country.name,
              },
              {
                value: cities
                  .map((v) => v?.city?.name)
                  .filter((e) => !!e)
                  .join(", "),
              },
              {
                props: { align: "right" },
                type: AdminTableCellTypeEnum.action,
                actionBtns: [
                  <Button
                    key={id}
                    onClick={() =>
                      visit((r) =>
                        r.addPath(getCurrentPath()).addPath("form").addPath(id),
                      )
                    }
                    center
                    className="h-8 w-8"
                  >
                    <EditIcon />
                  </Button>,
                ],
              },
            ],
          }))}
          title={t("Banned Seller Countries")}
        />
      </section>
    </React.Fragment>
  );
};

export default BannedBuyers;

const FAKE_COUNTRIES = [
  {
    __typename: "BannedCountry",
    id: "bannedCountry1",
    isoCode: "IR",
    cities: [
      {
        __typename: "BannedCity",
        id: "bannedCity1",
        city: {
          __typename: "City",
          id: "city1",
          name: "Tehran",
        },
      },
      {
        __typename: "BannedCity",
        id: "bannedCity2",
        city: {
          __typename: "City",
          id: "city2",
          name: "Mashhad",
        },
      },
    ],
    country: {
      __typename: "Country",
      name: "Iran",
    },
  },
  {
    __typename: "BannedCountry",
    id: "bannedCountry2",
    isoCode: "KP",
    cities: [
      {
        __typename: "BannedCity",
        id: "bannedCity3",
        city: {
          __typename: "City",
          id: "city3",
          name: "Pyongyang",
        },
      },
    ],
    country: {
      __typename: "Country",
      name: "North Korea",
    },
  },
];
