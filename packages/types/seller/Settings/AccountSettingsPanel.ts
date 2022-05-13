import { IconType } from "react-icons";
import { TranslationText } from "types";

export type AccountSettingsPanel = {
  panelName: TranslationText;
  panelIcon: IconType;
  panelUrl: string;
  panelComponent: React.ReactElement;
};

export type ClientType = "professional" | "individual";
