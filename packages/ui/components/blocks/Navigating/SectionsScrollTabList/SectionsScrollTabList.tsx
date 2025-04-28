import React from "react";
import { useTranslation } from "react-i18next";
import { useScrollTo } from "state";
import { Tabs, TabsHeader, TabTitle } from "../../../partials/";

export type SectionTabType = {
  name: string;
  slug: string;
};

export interface SectionsScrollTabListProps {
  tabs: SectionTabType[];
  visible?: boolean;
}

export const SectionsScrollTabList: React.FC<SectionsScrollTabListProps> = ({
  tabs,
  visible = true,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { ScrollTo } = useScrollTo();

  if (!visible) return null;

  return (
    <Tabs>
      {({ currentTabIdx, setCurrentTabIdx }) => (
        <>
          <TabsHeader className="justify-center flex-wrap">
            {tabs.map(({ slug, name }, index) => (
              <TabTitle key={index} TabKey={index}>
                <p
                  onClick={() => {
                    ScrollTo(slug);
                    setCurrentTabIdx(index);
                  }}
                  className={`cursor-pointer ${currentTabIdx === index ? "text-primary" : "text-black"}`}
                >
                  {t(name)}
                </p>
              </TabTitle>
            ))}
          </TabsHeader>
        </>
      )}
    </Tabs>
  );
};
