import React from "react";
import { useResponsive, useDimensions } from "hooks";
import { SectionContext } from "state";
import { SettingsSectionType, TranslationTextType } from "types";
import { FiMenu, FiX } from "react-icons/fi"; // Add this at top of your component
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
  ...props
}) => {
  const [opened, setOpen] = React.useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { t } = useTranslation();
  const { visit } = useRouting();
  const flatedSections = flatenSections(sections);

  const normalize = (s: string) => s.replace(/^\/+|\/+$/g, "");

  const mainSection = flatedSections.find(
    (panel) => normalize(panel.panelUrl) === normalize(section || "")
  );
  const { isMobile, isTablet } = useResponsive();
  const minGap = isTablet ? 0 : 32;
  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  // const CurrentSection = (): React.ReactElement => {
  //   if (mainSection) {
  //     return mainSection.panelComponent;
  //   } 
  //   else {
  //     if (isMobile)
  //       return (
  //         <div className="flex flex-col p-2 gap-4">
  //           <HStack className="justify-center relative">
  //             <>
  //               <ArrowLeftAlt1Icon className="absolute left-0 top-1/2 -translate-y-1/2" />
  //             </>
  //             <TranslationText
  //               className="text-lg font-semibold"
  //               translationObject={name}
  //             />
  //           </HStack>
  //           <SettingsSectionsSidebar
  //             currentActive={null}
  //             onPanelClick={(url) =>
  //               url &&
  //               url.length > 0 &&
  //               handleSectionChange &&
  //               handleSectionChange(url)
  //             }
  //             panelsInfo={sections}
  //           />
  //         </div>
  //       );
  //     return <>not found</>;
  //   }
  // };
  const CurrentSection = (): React.ReactElement => {
    if (mainSection) {
      return (
        <>
          {isMobile && (
            <div className="p-2">
              <Button onClick={() => setMobileMenuOpen(true)} colorScheme="gray">
                Menu
              </Button>
            </div>
          )}
          {mainSection.panelComponent}
        </>
      );
    } else {
      if (isMobile && mobileMenuOpen) {
        return (
          <div className="fixed top-0 left-0 z-50 w-3/4 h-full bg-white shadow-lg p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold">
                <TranslationText translationObject={name} />
              </p>
              <Button onClick={() => setMobileMenuOpen(false)}>Close</Button>
            </div>
            <SettingsSectionsSidebar
              currentActive={null}
              onPanelClick={(url) => {
                setMobileMenuOpen(false);
                handleSectionChange?.(url);
              }}
              panelsInfo={sections}
            />
          </div>
        );
      }
      return <>not found</>;
    }
  };
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);



  function HandleReturn() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    handleRetrun && handleRetrun();
  }

  return (
    <SectionContext.Provider value={{ onReturn: HandleReturn }}>
      <div className="h-full w-full flex justify-end gap-8">
        <div className="fixed h-full left-[13rem]">
          {!isMobile && (
            <div
              className={`${opened ? "md:w-[10rem] xl:w-[15rem] sm:w-40" : ""
                } gap-4 w-full h-full flex flex-col px-2`}
            >
              {/* <div
                onClick={() => visit((r) => r.management())}
                className="px-6 cursor-pointer w-fit text-xl py-2 my-2 flex gap-4 items-center"
              >
                <IoMdReturnLeft />
                {opened ? <p>{t("Return")}</p> : null}
              </div> */}
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
            width: `calc(100% - ${isMobile ? 0 : opened ? 200 : 96}px)`,
            paddingRight: isMobile ? undefined : minGap,
            paddingLeft: isMobile ? undefined : minGap,
          }}
          className={`h-full p-2`}
        >

          <div className="relative">
            {/* Mobile menu toggle button */}
            {isMobile && !mobileMenuOpen && (
              <div className="p-2">
                <button
                  className="p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <FiMenu size={24} />
                </button>
              </div>
            )}

            {/* Sidebar (mobile) */}
            {isMobile && mobileMenuOpen && (
              <div className="fixed inset-0 z-50 w-3/4 h-full bg-white shadow-xl p-4 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-bold">
                    <TranslationText translationObject={name} />
                  </p>
                  <button
                    className="p-2 text-red-700 rounded-md hover:bg-red-100 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <SettingsSectionsSidebar
                  currentActive={mainSection?.panelUrl ?? null}
                  onPanelClick={(url) => {
                    setMobileMenuOpen(false);
                    handleSectionChange?.(url);
                  }}
                  panelsInfo={sections}
                />
              </div>
            )}

            {/* Main Panel */}
            {!isMobile || !mobileMenuOpen ? mainSection?.panelComponent : null}
          </div>
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
    (panel) => panel.panelUrl === activePanel
  );
  console.log(activePanel, "section");


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
