import { useRecoilState } from "recoil";
import { ProductDescriptionTabsState } from "../state";
import { ProductDescTabs } from "types/market/Product";

export const useProductDescTabs = () => {
  const [tab, setTab] = useRecoilState(ProductDescriptionTabsState);

  function ChangeTab(Tab: ProductDescTabs) {
    setTab(Tab);
  }

  return {
    tab,
    ChangeTab,
  };
};
