import React from "react";
import { HtmlDivProps, SettingsSectionType } from "types";
import { ArrowDownIcon, ArrowUpIcon, TranslationText } from "@partials";
import { PassPropsToFnOrElem } from "utils";
import { IoMdReturnLeft } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useRouting } from "@UI/../routing";

export interface SettingsSectionsSidebarProps {
  innerProps?: HtmlDivProps;
  panelsInfo: Omit<SettingsSectionType, "panelComponent">[];
  onPanelClick?: (panelLink: string, panelName: string) => any;
  currentActive?: string | null;
  sub?: boolean;
  deepSlugs?: string[];
}

export const SettingsSectionsSidebar: React.FC<
  SettingsSectionsSidebarProps
> = ({
  innerProps,
  panelsInfo,
  onPanelClick,
  currentActive,
  sub,
  deepSlugs = [],
}) => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  return (
    <div
      className={`flex cursor-pointer flex-col ${
        sub ? "" : "border-r-[1px]"
      } border-primary-100`}
      {...innerProps}
    >
      {Array.isArray(panelsInfo) &&
        panelsInfo.map(
          ({ panelIcon: Icon, panelName, panelUrl, subSections }, i) => {
            const [open, setOpen] = React.useState<boolean>(false);

            const hasSub = subSections && subSections.length > 0;
            const parantOfCurrent = hasSub
              ? subSections[0].sections.find(
                  (v) => v.panelUrl === currentActive
                )
              : null;

            React.useEffect(() => {
              if (parantOfCurrent && open === false) {
                setOpen(true);
              }
            }, [open]);

            return (
              <>
                <div
                  key={panelUrl + i}
                  onClick={() => {
                    if (hasSub) {
                      if (!parantOfCurrent) {
                        setOpen((v) => !v);
                      }
                    } else {
                      onPanelClick && onPanelClick(panelUrl, panelName);
                    }
                  }}
                  className={`${
                    currentActive === panelUrl ? "bg-primary-50" : ""
                  } hover:bg-primary-light flex justify-between gap-2 py-4 px-8 items-center`}
                >
                  <div className="flex gap-2 items-center">
                    {PassPropsToFnOrElem(Icon, { className: "" })}
                    <div className="flex flex-col">
                      <TranslationText
                        className="font-bold"
                        translationObject={panelName}
                      />
                    </div>
                  </div>
                  {hasSub ? open ? <ArrowDownIcon /> : <ArrowUpIcon /> : null}
                </div>
                {hasSub && open ? (
                  <div className="pl-4">
                    <SettingsSectionsSidebar
                      onPanelClick={onPanelClick}
                      panelsInfo={subSections[0].sections}
                      sub={true}
                      deepSlugs={[panelUrl]}
                      currentActive={currentActive}
                    />
                  </div>
                ) : null}
              </>
            );
          }
        )}
    </div>
  );
};
