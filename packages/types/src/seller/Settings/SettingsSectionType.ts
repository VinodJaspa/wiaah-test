import { IconType } from "react-icons";

export type SettingsSectionType = {
  panelName: string;
  panelIcon: React.ReactNode | IconType;
  panelUrl: string;
  panelComponent: React.ReactElement;
  subSections?: {
    key: string;
    sections: SettingsSectionType[];
  }[];
};

export type ClientType = "professional" | "individual";
