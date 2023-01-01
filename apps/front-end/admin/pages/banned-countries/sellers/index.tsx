import { usePaginationControls } from "@blocks";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Button, EditIcon } from "@partials";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

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

const bannedBuyers: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();
  const { controls } = usePaginationControls();
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
        onAdd={() => {}}
        onDelete={() => {}}
        data={BannedCountries.map(({ city, country, id }) => ({
          id,
          cols: [
            {
              type: AdminTableCellTypeEnum.checkbox,
            },
            {
              value: country,
            },
            {
              value: city,
            },
            {
              props: { align: "right" },
              type: AdminTableCellTypeEnum.action,
              actionBtns: [
                <Button
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

export default bannedBuyers;
