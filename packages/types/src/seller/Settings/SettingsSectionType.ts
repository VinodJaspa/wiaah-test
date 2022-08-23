import { IconType } from "react-icons";
import { TranslationTextType } from "types";

export type SettingsSectionType = {
  panelName: string;
  panelIcon: IconType;
  panelUrl: string;
  panelComponent: React.ReactElement;
  subSections?: {
    key: string;
    sections: SettingsSectionType[];
  }[];
};

export type ClientType = "professional" | "individual";
