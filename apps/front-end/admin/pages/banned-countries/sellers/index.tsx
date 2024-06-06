import { usePaginationControls } from "@blocks";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Button, EditIcon } from "@partials";
import { useAdminGetBannedCountriesQuery } from "@UI";
import { accountType } from "nest-utils";
import { NextPage } from "next";
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
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetBannedCountriesQuery>[0]
  >(
    { pagination, type: accountType.SELLER },
    { pagination, type: accountType.SELLER }
  );
  const { data } = useAdminGetBannedCountriesQuery(form);

  return (
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
            inputProps: inputProps("country"),
          },
          {
            type: AdminTableCellTypeEnum.text,
            value: t("City Name"),
            inputProps: inputProps("city"),
          },
          {
            props: { align: "right" },
            type: AdminTableCellTypeEnum.action,
            value: t("Action"),
          },
        ]}
        onAdd={() =>
          visit((r) =>
            r.addPath(getCurrentPath()).addPath("form").addPath("new")
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
                      r.addPath(getCurrentPath()).addPath("form").addPath(id)
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
  );
};

export default BannedBuyers;
