import { ShopsSearchView } from "@UI";
import React from "react";
import { useRouting } from "routing";

const ShopsSearch = () => {
  const { getParam } = useRouting();
  const q = getParam("slug");
  return <ShopsSearchView slug={q} />;
};

export default ShopsSearch;
