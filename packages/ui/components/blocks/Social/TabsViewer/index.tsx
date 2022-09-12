import React from "react";
import {
  Tabs,
  TabList,
  TabItem,
  TabTitle,
  TabsHeader,
  TabsProps,
  Divider,
} from "ui";
import { TabType } from "types";
import { runIfFn } from "utils";

export interface TabsViewerProps extends Omit<TabsProps, "children"> {
  tabs: TabType[];
  reverseOrder?: boolean;
  showPanels?: boolean;
  showTabs?: boolean;
}

export const TabsViewer: React.FC<TabsViewerProps> = ({
  tabs,
  reverseOrder,
  showPanels = true,
  showTabs = true,
  children,
  ...props
}) => {
  return tabs.length > 0 ? (
    <Tabs {...props}>
      {showTabs && (
        <div>
          <TabsHeader
            style={{
              border: "1px 1px 0px 1px solid black",
            }}
            className="justify-center py-[0px]"
          >
            {tabs.map(({ name }, i) => (
              <TabTitle key={i} TabKey={i}>
                {({ currentTabIdx }) => {
                  return (
                    <div
                      className={`${
                        currentTabIdx === i
                          ? "border-primary text-primary fill-primary font-bold"
                          : "font-semibold text-lightBlack border-transparent"
                      } border-b-2 pb-2 leading-6 text-sm`}
                    >
                      {runIfFn(name, { active: currentTabIdx === i })}
                    </div>
                  );
                }}
              </TabTitle>
            ))}
          </TabsHeader>
          <Divider className="my-[0px] border-black border-opacity-20" />
        </div>
      )}
      {children}
      {showPanels && (
        <TabList className="">
          {tabs.map(({ component }, i) => (
            <TabItem key={i}>{component}</TabItem>
          ))}
        </TabList>
      )}
    </Tabs>
  ) : null;
};
