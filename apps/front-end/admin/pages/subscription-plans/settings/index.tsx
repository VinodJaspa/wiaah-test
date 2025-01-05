import React from "react";
import { NextPage } from "next";
import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { useTranslation } from "react-i18next";
import {
  Button,
  EditIcon,
  useAdminGetPlansQuery,
  usePaginationControls,
} from "ui";
import { useRouting } from "routing";
import { mapArray, useForm } from "utils";
import Head from "next/head";

interface Plan {
  id: string;
  name: string;
  sortOrder: number;
}

const plans: Plan[] = [
  {
    id: "1",
    name: "Free",
    sortOrder: 1,
  },
  {
    id: "2",
    name: "Pay",
    sortOrder: 2,
  },
  {
    id: "3",
    name: "Per Click",
    sortOrder: 3,
  },
];

const SubscriptionPlans: NextPage = () => {
  const { t } = useTranslation();
  const { visit, getCurrentPath } = useRouting();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetPlansQuery>[0]
  >({ pagination }, { pagination });

  const { data } = useAdminGetPlansQuery(form);
  return (
    <React.Fragment>
      <Head>
        <title>Admin | Subscription Plans Settings</title>
      </Head>
      <section>
        <AdminListTable
          headers={[
            {
              type: AdminTableCellTypeEnum.checkbox,
            },
            {
              value: t("Subscription Plan Name"),
            },
            {
              value: t("Sort Order"),
            },
            {
              value: t("Action"),
              props: { align: "right" },
            },
          ]}
          data={mapArray(plans, (v) => ({
            id: v.id,
            cols: [
              {
                type: AdminTableCellTypeEnum.checkbox,
              },
              {
                value: v.name,
              },
              {
                type: AdminTableCellTypeEnum.number,
                value: v.sortOrder.toString(),
              },
              {
                type: AdminTableCellTypeEnum.action,
                props: { align: "right" },
                actionBtns: [
                  <Button
                    key={v.id}
                    onClick={() =>
                      visit((r) =>
                        r
                          .addPath(getCurrentPath())
                          .addPath("form")
                          .addPath(v.id),
                      )
                    }
                    center
                    className="w-8 h-8"
                  >
                    <EditIcon />
                  </Button>,
                ],
              },
            ],
          }))}
          onAdd={() =>
            visit((r) =>
              r.addPath(getCurrentPath()).addPath("form").addPath("new"),
            )
          }
          title={t("Subscription Plan List")}
        />
      </section>
    </React.Fragment>
  );
};

export default SubscriptionPlans;
