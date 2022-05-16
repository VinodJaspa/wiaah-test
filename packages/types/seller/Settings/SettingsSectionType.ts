import { IconType } from "react-icons";
import { TranslationTextType } from "types";

export type SettingsSectionType = {
  panelName: TranslationTextType;
  panelIcon: IconType;
  panelUrl: string;
  panelComponent: React.ReactElement;
};

export type ClientType = "professional" | "individual";
