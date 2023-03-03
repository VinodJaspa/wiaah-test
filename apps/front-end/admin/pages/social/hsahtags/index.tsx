import { AdminListTable } from "@components";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";

const hashtags: NextPage = () => {
  const { t } = useTranslation();

  return <AdminListTable title={t("")} headers={[]} data={[]} />;
};

export default hashtags;
