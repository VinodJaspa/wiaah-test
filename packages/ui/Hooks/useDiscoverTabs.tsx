import { useRecoilState } from "recoil";
import { TabType } from "types";
import { DiscoverCurrentTabState, DiscoverTabsState } from "ui/state";

export interface DiscoverTabsLinks extends TabType {
  link: string;
}

export const useDiscoverTabs = () => {
  const [currentTab, setCurrentTab] = useRecoilState(DiscoverCurrentTabState);
  const [discoverTabs, setDiscoverTabs] = useRecoilState(DiscoverTabsState);

  function setTabsData(tabs: DiscoverTabsLinks[]) {
    setDiscoverTabs(tabs);
  }

  function changeDiscoverTab(tabLink: string) {
    const tabIndex = discoverTabs.findIndex((tab) => tab.link === tabLink);
    if (tabIndex > -1) {
      setCurrentTab(tabIndex);
    }
  }
  return {
    currentTab,
    discoverTabs,
    changeDiscoverTab,
    setTabsData,
  };
};
