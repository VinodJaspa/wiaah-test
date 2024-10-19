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
  return visible ? (
    <Tabs>
      <TabsHeader className="justify-center flex-wrap" />
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
  ) : null;
};
