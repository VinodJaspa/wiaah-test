import { ShopsSearchView } from "@UI";
import { useRouting } from "routing";

const ShopsSearch = () => {
  const { getParam } = useRouting();
  const q = getParam("slug");

  return <ShopsSearchView slug={q} />;
};

export default ShopsSearch;
