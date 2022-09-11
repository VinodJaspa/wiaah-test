import { TranslationTextType } from "types";

export type SettingsSectionType = {
  panelName: string;
  panelIcon: React.ReactNode;
  panelUrl: string;
  panelComponent: React.ReactElement;
  subSections?: {
    key: string;
    sections: SettingsSectionType[];
  }[];
};

export type ClientType = "professional" | "individual";
