import React from "react";
import { useResponsive, useDimensions } from "hooks";
import { SectionContext } from "state";
import { SettingsSectionType, TranslationTextType } from "types";
import { SettingsSectionsSidebar, TranslationText } from "ui";
import { useRouting } from "routing";

export interface SettingsLayoutProps {
  sections: SettingsSectionType[];
  name: TranslationTextType;
  currentSectionName: string;
  handleSectionChange?: (url: string) => any;
  handleRetrun?: () => any;
}

function flatenSections(
  sections: SettingsSectionType[]
): SettingsSectionType[] {
  const flatedSections = sections.reduce((acc, curr) => {
    return [
      ...acc,
      { ...curr, subSections: undefined },
      ...(curr.subSections ? curr.subSections[0].sections : []),
    ];
  }, [] as SettingsSectionType[]);
  return flatedSections;
}

export const SectionsLayout: React.FC<SettingsLayoutProps> = ({
  currentSectionName: section,
  name,
  sections,
  handleSectionChange,
  handleRetrun,
}) => {
  const flatedSections = flatenSections(sections);

  const mainSection = flatedSections.find(
    (panel) => panel.panelUrl === `/${section}`
  );

  const { isMobile, isTablet } = useResponsive();

  const minGap = isTablet ? 0 : 0;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const { width } = useDimensions(leftPanelRef);

  const leftPanelwidth = width || null;

  const CurrentSection = (): React.ReactElement => {
    if (mainSection) {
      return mainSection.panelComponent;
    } else {
      if (isMobile)
        return (
          <SettingsSectionsSidebar
            currentActive={null}
            onPanelClick={(url) =>
              url &&
              url.length > 0 &&
              handleSectionChange &&
              handleSectionChange(url)
            }
            panelsInfo={sections}
          />
        );
      return <>not found</>;
    }
  };

  function HandleReturn() {
    handleRetrun && handleRetrun();
  }

  return (
    <SectionContext.Provider value={{ onReturn: HandleReturn }}>
      <div className="h-full w-full flex justify-end gap-8">
        <div className="fixed h-full left-[13rem]" ref={leftPanelRef}>
          {!isMobile && (
            <div className="gap-4 w-full sm:w-40 md:w-[15rem] h-full xl:w-[20rem] flex flex-col px-2">
              <p className="text-xl px-4 font-bold">
                <TranslationText translationObject={name} />
              </p>
              <NestedSettingsSectionsSidebar
                sections={sections}
                activePanel={section}
                onChange={(url: string) =>
                  url &&
                  url.length > 0 &&
                  handleSectionChange &&
                  handleSectionChange(url)
                }
              />
            </div>
          )}
        </div>
        <div
          style={{
            width: `calc(100% - ${leftPanelwidth || 0}px)`,
            paddingRight: minGap,
            paddingLeft: minGap,
          }}
          className={`h-full`}
        >
          <>{CurrentSection()}</>
        </div>
      </div>
    </SectionContext.Provider>
  );
};

export interface NestedSettingsSectionsSidebarProps {
  sections: SettingsSectionType[];
  activePanel: string;
  onChange?: (url: string) => any;
}

export const NestedSettingsSectionsSidebar: React.FC<
  NestedSettingsSectionsSidebarProps
> = ({ sections, activePanel, onChange }) => {
  const flatedSections = flatenSections(sections);

  const section = flatedSections.find(
    (panel) => panel.panelUrl === `/${activePanel}`
  );

  return (
    <>
      <SettingsSectionsSidebar
        currentActive={section ? section.panelUrl : null}
        onPanelClick={(url) => onChange && onChange(url)}
        panelsInfo={sections}
      />
    </>
  );
};
