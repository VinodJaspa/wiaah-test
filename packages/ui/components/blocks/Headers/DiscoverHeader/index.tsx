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
      <InputGroup className="rounded-2xl">
        <InputLeftElement>
          <Button
            className="text-black rounded-l-2xl"
            colorScheme="white"
            aria-label="discover filter search"
            color="black"
          >
            <HiSearch />
          </Button>
        </InputLeftElement>
        <Input
          className="rounded-2xl bg-gray-100"
          value={searchFilter}
          placeholder={`${t("search", "search")}`}
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
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
