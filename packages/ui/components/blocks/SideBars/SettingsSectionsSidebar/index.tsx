import React from "react";
import { HtmlDivProps, SettingsSectionType } from "types";
import { TranslationText, Divider } from "ui";

export interface SettingsSectionsSidebarProps {
  innerProps?: HtmlDivProps;
  panelsInfo: Omit<SettingsSectionType, "panelComponent">[];
  onPanelClick?: (panelLink: string) => any;
  currentActive?: string | null;
}

export const SettingsSectionsSidebar: React.FC<SettingsSectionsSidebarProps> =
  ({ innerProps, panelsInfo, onPanelClick, currentActive }) => {
    return (
      <div
        className="flex cursor-pointer flex-col border-r-[1px] border-primary-100"
        {...innerProps}
      >
        {Array.isArray(panelsInfo) &&
          panelsInfo.map(({ panelIcon: Icon, panelName, panelUrl }, i) => (
            <div
              onClick={() => onPanelClick && onPanelClick(panelUrl)}
              className={`${
                currentActive === panelUrl ? "bg-primary-50" : ""
              } hover:bg-primary-light flex gap-2 py-4 px-8 items-center`}
            >
              <Icon className="text-2xl" />
              <div className="flex flex-col">
                <TranslationText
                  className="font-bold"
                  translationObject={panelName}
                />
              </div>
            </div>
          ))}
      </div>
    );
  };
