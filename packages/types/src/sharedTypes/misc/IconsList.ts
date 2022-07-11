import { TranslationText } from "types";
import { IconType } from "react-icons";

export interface IconListItem {
  iconLabel: TranslationText;
  fillColor?: string;
  icon: IconType;
  size?: string;
}

export type IconList = IconListItem[];
