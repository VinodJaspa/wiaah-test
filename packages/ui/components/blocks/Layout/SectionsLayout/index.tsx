import React from "react";
import { useResponsive, useDimensions } from "hooks";
import { SectionContext } from "state";
import { SettingsSectionType, TranslationTextType } from "types";
import {
  SettingsSectionsSidebar,
  TranslationText,
  Slider,
  HStack,
  ArrowLeftIcon,
} from "ui";
import { useRouting } from "routing";
import { useTranslation } from "react-i18next";

export interface SettingsLayoutProps {
  sections: SettingsSectionType[];
  name: TranslationTextType;
  currentSectionName: string;
  handleSectionChange?: (url: string) => any;
  handleRetrun?: () => any;
}

export const SectionsLayout: React.FC<SettingsLayoutProps> = ({
  currentSectionName: section,
  name,
  sections,
  handleSectionChange,
  handleRetrun,
}) => {
  const { getParam } = useRouting();

  const sectionIdx = sections.findIndex(
    (panel) => panel.panelUrl === `/${section}`
  );
  const mainSection = sections[sectionIdx];

  const serviceSection = getParam("sub");
  const clusterKey = getParam("c");

  const subSectionCluster = mainSection?.subSections?.find(
    (cluster) => cluster.key === clusterKey
  );

  const subSectionIdx =
    typeof serviceSection === "string"
      ? subSectionCluster
        ? subSectionCluster.sections?.findIndex(
            (panel) => panel.panelUrl === `/${serviceSection}`
          )
        : 0
      : 0;

  const subSection = subSectionCluster
    ? subSectionCluster.sections[subSectionIdx] ?? null
    : null;

  console.log({
    clusterKey,
    subSectionCluster,
    mainSection,
    subSectionIdx,
    subSection,
    serviceSection,
  });
  const { isMobile, isTablet } = useResponsive();

  const minGap = isTablet ? 0 : 48;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const { width } = useDimensions(leftPanelRef);

  const leftPanelwidth = width || null;

  const CurrentSection = (): React.ReactElement => {
    if (sectionIdx > -1) {
      return subSection
        ? subSection.panelComponent
        : mainSection.panelComponent;
    } else {
      if (isMobile)
        return (
          <SettingsSectionsSidebar
            currentActive={
              sections[sectionIdx] ? sections[sectionIdx].panelUrl : null
            }
            onPanelClick={(url) =>
              handleSectionChange && handleSectionChange(url)
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
                onChange={handleSectionChange}
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
  const { t } = useTranslation();
  const { getParam, visit, removeParam } = useRouting();
  const sectionIdx = sections.findIndex(
    (panel) => panel.panelUrl === `/${activePanel}`
  );
  const mainSection = sections[sectionIdx];

  const serviceSection = getParam("sub");
  const serviceType = getParam("c");

  const subSectionCluster = mainSection?.subSections?.find(
    (cluster) => cluster.key === serviceType
  );

  const subSectionIdx =
    typeof serviceSection === "string"
      ? subSectionCluster
        ? subSectionCluster.sections?.findIndex(
            (panel) => panel.panelUrl === `/${serviceSection}`
          )
        : 0
      : 0;

  const subSection = subSectionCluster
    ? subSectionCluster.sections[subSectionIdx] ?? null
    : null;

  return (
    <Slider draggingActive={false} currentItemIdx={subSection ? 1 : 0}>
      <SettingsSectionsSidebar
        currentActive={mainSection ? mainSection.panelUrl : null}
        onPanelClick={(url) => onChange && onChange(url)}
        panelsInfo={sections}
      />
      {subSection && (
        <>
          <HStack
            onClick={() => removeParam("c")}
            className="my-2 text-xl cursor-pointer"
          >
            <ArrowLeftIcon />
            <p>{t("Return")}</p>
          </HStack>
          <SettingsSectionsSidebar
            currentActive={subSection ? subSection.panelUrl : null}
            onPanelClick={(url, name) =>
              visit((routes) =>
                routes.addQuery({ s_section: url.split("/")[1] })
              )
            }
            panelsInfo={subSectionCluster?.sections || []}
          />
        </>
      )}
    </Slider>
  );
};
