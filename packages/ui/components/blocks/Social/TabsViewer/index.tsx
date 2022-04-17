import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types/market/misc/tabs";

export interface TabsViewerProps {
  tabs: TabType[];
}

export const TabsViewer: React.FC<TabsViewerProps> = ({ tabs }) => {
  const { t } = useTranslation();
  return tabs.length > 0 ? (
    <Tabs align="center">
      <TabList my="1rem">
        {tabs.map(({ name }, i) => (
          <Tab
            key={i}
            textTransform={"capitalize"}
            color="gray"
            _focus={{ ring: "0px" }}
            _selected={{ borderColor: "primary.main" }}
          >
            {name}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map(({ component }, i) => (
          <TabPanel px={"0px"} key={i}>
            {component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  ) : null;
};
