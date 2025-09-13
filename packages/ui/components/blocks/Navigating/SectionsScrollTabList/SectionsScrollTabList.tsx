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
  const { t } = useTranslation();
  const { ScrollTo } = useScrollTo();

  if (!visible) return null;

  return (
    <Tabs>
      {({ currentTabIdx, setCurrentTabIdx }) => (
        <TabsHeader className="justify-center flex-wrap gap-4">
          {tabs.map(({ slug, name }, index) => (
            <TabTitle key={index} TabKey={index}>
              <p
                onClick={() => {
                  ScrollTo(slug);
                  setCurrentTabIdx(index);
                }}
                className={`cursor-pointer text-md font-medium transition-colors px-2 py-1 rounded-md 
                  ${
                    currentTabIdx === index
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary/80"
                  }`}
              >
                {t(name)}
              </p>
            </TabTitle>
          ))}
        </TabsHeader>
      )}
    </Tabs>
  );
};
