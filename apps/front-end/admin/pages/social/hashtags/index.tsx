import { AdminListTable } from "@components";
import { AdminTableCellTypeEnum, useAdminGetHashtagsQuery, usePaginationControls } from "@UI";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

const hashtags: NextPage = () => {
  const { t } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useAdminGetHashtagsQuery>[0]
  >({
    pagination,
  });
  const { data } = useAdminGetHashtagsQuery(form);

  return <AdminListTable title={t("Hashtags")} headers={[]} data={mapArray(data,(v)=> ({
    id:v.id,
    cols:[
      {
        type:AdminTableCellTypeEnum.text,
        
      }
    ]
  }))} />;
};

export default hashtags;
