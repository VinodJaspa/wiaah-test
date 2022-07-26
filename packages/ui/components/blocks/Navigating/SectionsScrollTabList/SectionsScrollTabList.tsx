import React from "react";
import { useTranslation } from "react-i18next";
import { useScrollTo } from "state";
import { Tabs, TabsHeader, TabTitle } from "ui";

export type SectionTabType = {
  name: string;
  slug: string;
};

export interface SectionsScrollTabListProps {
  tabs: SectionTabType[];
}

export const SectionsScrollTabList: React.FC<SectionsScrollTabListProps> = ({
  tabs,
}) => {
  const { t } = useTranslation();
  const { ScrollTo } = useScrollTo();
  return (
    <Tabs>
      <TabsHeader className="justify-center" />
      {tabs.map(({ slug, name }, i) => (
        <React.Fragment key={i}>
          <TabTitle TabKey={i}>
            {({ currentTabIdx }) => (
              <p
                onClick={() => ScrollTo(slug)}
                className={`${currentTabIdx === i ? "text-primary" : ""}`}
              >
                {t(name)}
              </p>
            )}
          </TabTitle>
        </React.Fragment>
      ))}
    </Tabs>
  );
};
