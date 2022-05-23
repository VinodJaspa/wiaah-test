import { useDimensions } from "@chakra-ui/react";
import React from "react";
import { Translation, useTranslation } from "react-i18next";
import { SettingsSectionType, TranslationTextType } from "types";
import { SettingsSectionsSidebar, TranslationText, useResponsive } from "ui";

export interface SettingsLayoutProps {
  sections: SettingsSectionType[];
  name: TranslationTextType;
  currentSectionName: string;
  handleSectionChange?: (url: string) => any;
}

export const SectionsLayout: React.FC<SettingsLayoutProps> = ({
  currentSectionName: section,
  name,
  sections,
  handleSectionChange,
}) => {
  const { isTablet } = useResponsive();
  const minGap = isTablet ? 0 : 48;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const leftPanelDims = useDimensions(leftPanelRef, true);

  const leftPanelwidth = leftPanelDims ? leftPanelDims.borderBox.width : null;

  const sectionIdx = sections.findIndex(
    (panel) => panel.panelUrl === `/${section}`
  );

  const CurrentSection = (): React.ReactElement => {
    if (sectionIdx > -1) {
      return sections[sectionIdx].panelComponent;
    } else {
      return <>not found</>;
    }
  };

  return (
    <div className="h-full w-full flex justify-end gap-8">
      <div className="fixed left-[5rem]" ref={leftPanelRef}>
        {!isTablet && (
          <div className="gap-4 w-full sm:w-40 md:w-[15rem] xl:w-[20rem] flex flex-col px-2">
            <p className="text-xl px-4 font-bold">
              <TranslationText translationObject={name} />
            </p>
            <SettingsSectionsSidebar
              currentActive={
                sections[sectionIdx] ? sections[sectionIdx].panelUrl : null
              }
              onPanelClick={(url) =>
                handleSectionChange && handleSectionChange(url)
              }
              panelsInfo={sections}
            />
          </div>
        )}
      </div>
      <div
        style={{
          width: `calc(100% - ${leftPanelwidth || 0 + minGap}px)`,
          paddingRight: minGap,
        }}
        className={`h-full`}
      >
        <>{CurrentSection()}</>
      </div>
    </div>
  );
};
