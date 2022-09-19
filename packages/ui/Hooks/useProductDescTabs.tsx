import { useRecoilState } from "recoil";
import { ProductDescTabs } from "types";
import { ProductDescriptionTabsState } from "../state";

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
