import React from "react";
import { HtmlDivProps } from "types";
import { MaybeFn, runIfFn, PassPropsToFnOrElem } from "utils";
import { randomNum } from "../../helpers";

type TrackableComponent = {
  id: string;
  component: React.ReactNode;
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

export const TabsContext = React.createContext<TabsContextValue>({
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
  onTabChange?: (tabIdx: number) => any;
  currentTabIdx?: number;
}

export const Tabs: React.FC<TabsProps> = React.memo(
  ({ children, currentTabIdx = 0, onTabChange, ...props }) => {
    const [currentTab, setCurrentTab] = React.useState<number>(currentTabIdx);
    const [tabsTitles, setTabsTitle] = React.useState<TrackableComponent[]>([]);
    const [tabsComponents, setTabsComponents] = React.useState<
      TrackableComponent[]
    >([]);

    // React.useEffect(() => {
    //   setCurrentTab(currentTabIdx);
    // }, [currentTabIdx]);

    React.useEffect(() => {
      if (onTabChange) {
        onTabChange(currentTab);
      }
    }, [currentTab, onTabChange]);

    const setTabs = React.useCallback((components: TrackableComponent[]) => {
      setTabsComponents(components);
    }, []);

    const addTitle = React.useCallback((component: TrackableComponent) => {
      setTabsTitle((state) => {
        const filteredState = state.filter((comp) => comp.id !== component.id);
        return [...filteredState, component];
      });
    }, []);

    const addTab = React.useCallback((component: TrackableComponent) => {
      setTabsComponents((state) => {
        const filteredState = state.filter((comp) => comp.id !== component.id);
        return [...filteredState, component];
      });
    }, []);

    const setTitles = React.useCallback((components: TrackableComponent[]) => {
      setTabsTitle(components);
    }, []);

    const setCurrentTabIdx = React.useCallback((tabIdx: number) => {
      setCurrentTab(tabIdx);
    }, []);

    const contextValue = React.useMemo(
      () => ({
        currentTabIdx: currentTab,
        setCurrentTabIdx,
        tabsComponents,
        tabsTitles,
        setTabsComponents: setTabs,
        setTabsTitlesComponents: setTitles,
        addTab,
        addTitle,
      }),
      [
        currentTab,
        tabsComponents,
        tabsTitles,
        setTabs,
        setTitles,
        addTab,
        addTitle,
      ],
    );

    return (
      <TabsContext.Provider value={contextValue} {...props}>
        {runIfFn(children, {
          currentTabIdx: currentTab,
          setCurrentTabIdx,
          tabsComponents,
          tabsTitles,
          setTabsComponents: setTabs,
          setTabsTitlesComponents: setTitles,
          addTab,
          addTitle,
        })}
      </TabsContext.Provider>
    );
  },
);

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
              className={`px-2 py-0 cursor-pointer text-lg font-bold`}
            >
              {PassPropsToFnOrElem<TabTitleChildrenPropsType>(tab.component, {
                currentTabIdx,
                setCurrentTabIdx,
                tabsTitles,
                currentActive: currentTabIdx === i,
                ...rest,
              })}
            </div>
          </React.Fragment>
        ))}
      {children}
    </div>
  );
};

type TabTitleChildrenPropsType = TabsContextValue & { currentActive?: boolean };

type TabTitleChildrenType = MaybeFn<{
  currentTabIdx: number;
  currentActive?: boolean;
}>;

export interface TabTitleProps extends Omit<HtmlDivProps, "children"> {
  TabKey?: string | number;
  children: TabTitleChildrenType;
}
export const TabTitle: React.FC<TabTitleProps> = ({ children, TabKey }) => {
  const { addTitle } = React.useContext(TabsContext);
  const hasMounted = React.useRef(false);

  React.useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    addTitle({
      id: `${TabKey}`,
      component:
        typeof children === "function" ? (
          children({ currentTabIdx: TabKey! as number })
        ) : (
          <>{children}</>
        ),
    });
  }, [addTitle, TabKey]); // ✅ removed `currentTabIdx` and `children`

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
    <div {...props} className={`${className || ""}`}>
      {tabsComponents[currentTabIdx]
        ? PassPropsToFnOrElem<TabsContextValue>(
            tabsComponents[currentTabIdx].component,
            {
              currentTabIdx,
              tabsComponents,
              ...rest,
            },
          )
        : null}
      {children}
    </div>
  );
};

export interface TabItemProps {
  key?: string | number;
  children: MaybeFn<{
    currentTabIdx: number;
    currentActive?: boolean;
  }>;
}
export const TabItem: React.FC<TabItemProps> = ({
  children,
  key = randomNum(24643786),
}) => {
  const { addTab } = React.useContext(TabsContext);
  const hasMounted = React.useRef(false);

  React.useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    addTab({
      id: `${key}`,
      component:
        typeof children === "function" ? (
          children({ currentTabIdx: key as number })
        ) : (
          <>{children}</>
        ),
    });
  }, [addTab, key]); // ✅ removed `children` from dependencies

  return null;
};


export const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};
