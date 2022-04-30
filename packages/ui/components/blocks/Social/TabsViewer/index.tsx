import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabsProps,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types/market/misc/tabs";

export interface TabsViewerProps {
  tabs: TabType[];
  reverseOrder?: boolean;
  showPanels?: boolean;
  tabsProps?: Omit<TabsProps, "children">;
  showTabs?: boolean;
}

export const TabsViewer: React.FC<TabsViewerProps> = ({
  tabs,
  reverseOrder,
  showPanels = true,
  showTabs = true,
  tabsProps,
}) => {
  const { t } = useTranslation();
  return tabs.length > 0 ? (
    <Tabs
      {...tabsProps}
      flexDirection={reverseOrder ? "column-reverse" : "column"}
      align="center"
    >
      {showTabs && (
        <TabList my={showPanels ? "1rem" : "0rem"}>
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
      )}

      {showPanels && (
        <TabPanels>
          {tabs.map(({ component }, i) => (
            <TabPanel px={"0px"} key={i}>
              {component}
            </TabPanel>
          ))}
        </TabPanels>
      )}
    </Tabs>
  ) : null;
};
