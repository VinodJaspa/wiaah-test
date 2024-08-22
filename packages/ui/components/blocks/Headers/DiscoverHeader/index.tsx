import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { HtmlDivProps } from "types";
import { TabsViewer, Input, InputGroup, InputLeftElement, Button } from "@UI";
import { useDiscoverTabs } from "@UI";

export interface DiscoverHeaderProps {
  containerProps?: HtmlDivProps;
}

export const DiscoverHeader: React.FC<DiscoverHeaderProps> = ({
  containerProps,
}) => {
  const { t } = useTranslation();

  const [searchFilter, setSearchFilter] = React.useState<string>("");

  const { discoverTabs, changeDiscoverTab, currentTab } = useDiscoverTabs();
  function handleSearchFilter(filter: string) {
    setSearchFilter(filter);
  }

  return (
    <div
      className="flex flex-col py-2 gap-2 w-full relative"
    // {...containerProps}
    >
      <InputGroup className="rounded-2xl relative">
        <Input
          className="rounded-2xl bg-gray-100 pl-10 focus:ring-0 active:rign-0"
          value={searchFilter}
          placeholder={`${t("Lets explore", "Lets explore")}`}
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
        <HiSearch className="absolute left-2 w-6 h-6" />
      </InputGroup>

      <TabsViewer
        onTabChange={(idx) => {
          changeDiscoverTab(discoverTabs[idx].link);
        }}
        currentTabIdx={currentTab}
        showPanels={false}
        tabs={discoverTabs}
      />
    </div>
  );
};
