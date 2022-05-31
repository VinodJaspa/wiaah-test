import React from "react";
import { HtmlDivProps } from "types";
import { MaybeFn, runIfFn, PassPropsToFnOrElem } from "utils";
import { randomNum } from "../../helpers";

type TrackableComponent = {
  id: string;
  component: React.TrackableComponent;
};

interface TabsContextValue {
  currentTabIdx: number;
  tabsComponents: TrackableComponent[];
  tabsTitles: TrackableComponent[];
  setCurrentTabIdx: (idx: number) => any;
  setTabsComponents: (comps: TrackableComponent[]) => any;
  setTabsTitlesComponents: (comps: TrackableComponent[]) => any;
  addTitle: (component: TrackableComponent) => any;
  addTab: (component: TrackableComponent) => any;
}

const TabsContext = React.createContext<TabsContextValue>({
  currentTabIdx: 0,
  tabsComponents: [],
  tabsTitles: [],
  setCurrentTabIdx: () => {},
  setTabsComponents: () => {},
  setTabsTitlesComponents: () => {},
  addTab: () => {},
  addTitle: () => {},
});

export interface TabsProps {
  children: MaybeFn<TabsContextValue>;
}

export const Tabs: React.FC<TabsProps> = ({ children, ...props }) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [tabsTitles, setTabsTitle] = React.useState<TrackableComponent[]>([]);
  const [tabsComponents, setTabsComponents] = React.useState<
    TrackableComponent[]
  >([]);
  console.log("innerstate", currentTab);

  function setTabs(components: TrackableComponent[]) {
    setTabsComponents(components);
  }
  function addTitle(component: TrackableComponent) {
    setTabsTitle((state) => {
      const filteredState = state.filter((comp) => comp.id !== component.id);
      return [...filteredState, component];
    });
  }
  function addTab(component: TrackableComponent) {
    setTabsComponents((state) => {
      const filteredState = state.filter((comp) => comp.id !== component.id);
      return [...filteredState, component];
    });
  }
  function setTitles(components: TrackableComponent[]) {
    setTabsTitle(components);
  }

  function setCurrentTabIdx(tabIdx: number) {
    console.log(tabIdx);
    setCurrentTab(tabIdx);
  }

  return (
    <TabsContext.Provider
      value={{
        currentTabIdx: currentTab,
        setCurrentTabIdx,
        tabsComponents,
        tabsTitles,
        setTabsComponents: setTabs,
        setTabsTitlesComponents: setTitles,
        addTab,
        addTitle,
      }}
      {...props}
    >
      {children}
    </TabsContext.Provider>
  );
};

export interface TabsHeaderProps extends HtmlDivProps {}

export const TabsHeader: React.FC<TabsHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  const { tabsTitles, setCurrentTabIdx, currentTabIdx, ...rest } =
    React.useContext(TabsContext);
  return (
    <div {...props} className={`${className || ""} flex gap-2 w-full py-2`}>
      {Array.isArray(tabsTitles) &&
        tabsTitles.map((tab, i) => (
          <React.Fragment key={i}>
            <div
              onClick={() => {
                setCurrentTabIdx(i);
              }}
              className={`${
                className || ""
              } px-2 py-1 cursor-pointer text-lg font-bold`}
            >
              {PassPropsToFnOrElem<TabTitleChildrenPropsType>(tab.component, {
                currentTabIdx,
                setCurrentTabIdx,
                tabsTitles,
                ...rest,
              })}
            </div>
          </React.Fragment>
        ))}
      {children}
    </div>
  );
};

type TabTitleChildrenPropsType = TabsContextValue;
type TabTitleChildrenType = MaybeFn<TabTitleChildrenPropsType>;
export interface TabTitleProps extends Omit<HtmlDivProps, "children"> {
  TabKey: string | number;
  children: TabTitleChildrenType;
}
export const TabTitle: React.FC<TabTitleProps> = ({
  children,
  TabKey = randomNum(13465433),
}) => {
  const { addTitle } = React.useContext(TabsContext);

  React.useEffect(() => {
    console.log("Test title");
    addTitle({
      id: `${TabKey}`,
      component: typeof children === "function" ? children : <>{children}</>,
    });
  }, [children]);

  return null;
};

export interface TabListProps extends HtmlDivProps {}

export const TabList: React.FC<TabListProps> = ({
  children,
  className,
  ...props
}) => {
  const { currentTabIdx, tabsComponents, ...rest } =
    React.useContext(TabsContext);
  return (
    <div {...props} className={`${className || ""} flex  w-full`}>
      {tabsComponents[currentTabIdx]
        ? PassPropsToFnOrElem<TabsContextValue>(
            tabsComponents[currentTabIdx].component,
            {
              currentTabIdx,
              tabsComponents,
              ...rest,
            }
          )
        : null}
      {children}
    </div>
  );
};

export interface TabItemProps {
  key?: string | number;
  children: MaybeFn<TabsContextValue>;
}
export const TabItem: React.FC<TabItemProps> = ({
  children,
  key = randomNum(24643786),
}) => {
  const { addTab } = React.useContext(TabsContext);
  React.useEffect(() => {
    addTab({
      id: `${key}`,
      component: typeof children === "function" ? children : <>{children}</>,
    });
  }, []);
  return null;
};
