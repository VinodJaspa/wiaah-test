import React from "react";
import { HtmlDivProps, SettingsSectionType } from "types";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Divider,
  Stack,
  TranslationText,
} from "../../../partials";
import { PassPropsToFnOrElem, setTestid } from "utils";
import { useResponsive } from "../../../../src";

export interface SettingsSectionsSidebarProps {
  innerProps?: HtmlDivProps;
  panelsInfo: Omit<SettingsSectionType, "panelComponent">[];
  onPanelClick?: (panelLink: string, panelName: string) => any;
  currentActive?: string | null;
  sub?: boolean;
  deepSlugs?: string[];
  iconOnly?: boolean;
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
  iconOnly = false,
}) => {
    const { isMobile } = useResponsive();
    console.log(currentActive,"currentActive");
    
    return isMobile ? (
      <Stack
        divider={<Divider className="my-0" />}
        col
        className={`flex cursor-pointer flex-col ${sub ? "" : ""
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
                  (v) => v.panelUrl === currentActive,
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
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        onPanelClick && onPanelClick(panelUrl, panelName);
                      }
                    }}
                    className={`flex items-center justify-between gap-2 w-full rounded-md transition-all
                      ${iconOnly ? "px-2" : "px-4"} py-2
                      ${currentActive === panelUrl ? "bg-gray-100 text-black font-semibold rounded-md" : "text-gray-700 hover:bg-gray-50"}`}
                    
                  >
                    <div className="flex gap-2 items-center">
                      {PassPropsToFnOrElem(Icon, { className: "" })}

                      {iconOnly ? null : (
                        <div className="flex flex-col">
                          <TranslationText
                     className="text-sm font-medium"
                            translationObject={panelName}
                          />
                        </div>
                      )}
                    </div>
                    {hasSub ? (
                      open ? (
                        <ArrowUpIcon className="text-2xl" />
                      ) : (
                        <ArrowRightIcon className="text-2xl" />
                      )
                    ) : null}
                  </div>
                  {hasSub && open && !iconOnly ? (
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
            },
          )}
      </Stack>
    ) : (
      <div
        className={`flex cursor-pointer flex-col ${sub ? "" : "border-r-[1px]"
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
                  (v) => v.panelUrl === currentActive,
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
                    {...setTestid(`section-${panelUrl}`)}
                    key={panelUrl + i}
                    onClick={() => {
                      if (hasSub) {
                        if (!parantOfCurrent) {
                          setOpen((v) => !v);
                        }
                      } else {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        onPanelClick && onPanelClick(panelUrl, panelName);
                      }
                    }}
                    className={`flex items-center justify-between gap-2 w-full rounded-md transition-all
                      ${iconOnly ? "px-2" : "px-4"} py-2
                      ${currentActive === panelUrl ? "bg-gray-100 text-black font-semibold rounded-md" : "text-gray-700 hover:bg-gray-50"}`}
                    
                  >
                    <div className="flex gap-2 items-center">
                      {PassPropsToFnOrElem(Icon, { className: "" })}

                      {iconOnly ? null : (
                        <div className="flex flex-col">
                          <TranslationText
                            className="text-sm font-medium"
                            translationObject={panelName}
                          />
                        </div>
                      )}
                    </div>
                    {hasSub ? open ? <ArrowDownIcon /> : <ArrowUpIcon /> : null}
                  </div>
                  {hasSub && open && !iconOnly ? (
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
            },
          )}
      </div>
    );
  };
