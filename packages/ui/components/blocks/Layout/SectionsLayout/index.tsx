import React from "react";
import { useResponsive, useDimensions } from "hooks";
import { SectionContext } from "state";
import { SettingsSectionType, TranslationTextType } from "types";
import {
  ArrowLeftAlt1Icon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  HStack,
  SectionsScrollTabListProps,
  SettingsSectionsSidebar,
  TranslationText,
} from "@UI";
import { useRouting } from "routing";
import { IoMdReturnLeft } from "react-icons/io";
import { useTranslation } from "react-i18next";

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
      ...(curr.subSections ? curr?.subSections[0]?.sections || [] : []),
    ];
  }, [] as SettingsSectionType[]);
  return flatedSections;
}

export const SectionsLayout: React.FC<SettingsLayoutProps> = ({
  currentSectionName: section,
  sections,
  handleSectionChange,
  handleRetrun,
  name,
}) => {
  const [opened, setOpen] = React.useState<boolean>(true);
  const { t } = useTranslation();
  const { visit } = useRouting();
  const flatedSections = flatenSections(sections);

  const mainSection = flatedSections.find(
    (panel) => panel.panelUrl === `/${section}`
  );

  const { isMobile, isTablet } = useResponsive();

  const minGap = isTablet ? 0 : 32;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const CurrentSection = (): React.ReactElement => {
    if (mainSection) {
      return mainSection.panelComponent;
    } else {
      if (isMobile)
        return (
          <div className="flex flex-col p-2 gap-4">
            <HStack className="justify-center relative">
              <>
                <ArrowLeftAlt1Icon className="absolute left-0 top-1/2 -translate-y-1/2" />
              </>
              <TranslationText
                className="text-lg font-semibold"
                translationObject={name}
              />
            </HStack>
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
          </div>
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
        <div className="fixed h-full left-[13rem]">
          {!isMobile && (
            <div
              className={`${opened ? "md:w-[15rem] xl:w-[20rem] sm:w-40" : ""
                } gap-4 w-full h-full flex flex-col px-2`}
            >
              <div
                onClick={() => visit((r) => r.management())}
                className="px-6 cursor-pointer w-fit text-xl py-2 my-2 flex gap-4 items-center"
              >
                <IoMdReturnLeft />
                {opened ? <p>{t("Return")}</p> : null}
              </div>
              <HStack>
                {opened ? (
                  <p className="text-xl px-4 font-bold">
                    <TranslationText translationObject={name} />
                  </p>
                ) : null}
                <Button
                  className="text-xl px-6"
                  onClick={() => setOpen((v) => !v)}
                  colorScheme="white"
                >
                  {opened ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                </Button>
              </HStack>
              <NestedSettingsSectionsSidebar
                sections={sections}
                activePanel={section}
                onChange={(url: string) =>
                  url &&
                  url.length > 0 &&
                  handleSectionChange &&
                  handleSectionChange(url)
                }
                iconOnly={!opened}
              />
            </div>
          )}
        </div>
        <div
          style={{
            width: `calc(100% - ${isMobile ? 0 : opened ? 320 : 96}px)`,
            paddingRight: isMobile ? undefined : minGap,
            paddingLeft: isMobile ? undefined : minGap,
          }}
          className={`h-full p-2`}
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
  iconOnly?: boolean;
}

export const NestedSettingsSectionsSidebar: React.FC<
  NestedSettingsSectionsSidebarProps
> = ({ sections, activePanel, onChange, iconOnly }) => {
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
        iconOnly={iconOnly}
      />
    </>
  );
};
