import { AdminListTable } from "@components";
import {
  AdminTableCellTypeEnum,
  Button,
  useAdminGetHashtagsQuery,
  usePaginationControls,
  TrashIcon,
  NotAllowedIcon,
  useAdminSuspenseHashtag,
} from "@UI";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

const Hashtags: NextPage = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetHashtagsQuery>[0]
  >({
    pagination,
  });
  const { data } = useAdminGetHashtagsQuery(form);

  const { mutate: suspense, isLoading } = useAdminSuspenseHashtag();

  return (
    <AdminListTable
      title={t("Hashtags")}
      headers={[
        {
          value: t("Name"),
        },
        {
          value: t("Usage"),
        },
        {
          type: AdminTableCellTypeEnum.action,
          value: t("Action"),
        },
      ]}
      data={mapArray(data, (v) => ({
        id: v.id,
        cols: [
          {
            type: AdminTableCellTypeEnum.text,
            value: v.tag,
          },
          {
            type: AdminTableCellTypeEnum.number,
            value: v?.usage?.toString(),
          },
          {
            type: AdminTableCellTypeEnum.action,
            actionBtns: [
              <Button
                key={v.id}
                onClick={() => {
                  suspense(v.tag);
                }}
                loading={isLoading}
                center
                className="p-2"
              >
                <NotAllowedIcon />
              </Button>,
              <Button key={v.id} center className="p-2">
                <TrashIcon onClick={() => {}} />
              </Button>,
            ],
          },
        ],
      }))}
    />
  );
};

export default Hashtags;
