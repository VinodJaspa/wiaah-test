import { TranslationTextType } from "types";
import { IconType } from "react-icons";

export interface IconListItem {
  iconLabel: TranslationTextType;
  fillColor?: string;
  icon: IconType;
  size?: string;
}

export type IconList = IconListItem[];
