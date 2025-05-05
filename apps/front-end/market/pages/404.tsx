import { NextPage } from "next";
import { NotFound } from "ui";
import MasterLayout from "../components/MasterLayout";
import React from "react";
export const Custom404: NextPage = () => {
  return (
    <MasterLayout>
      <NotFound />
    </MasterLayout>
  );
};

export default Custom404;
