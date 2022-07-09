import { NextPage } from "next";
import React from "react";
import { ServiceFilteredSearchView } from "../../../components";
import MasterLayout from "../../../components/MasterLayout";

const filtered: NextPage = () => {
  return (
    <MasterLayout>
      <ServiceFilteredSearchView />
    </MasterLayout>
  );
};

export default filtered;
