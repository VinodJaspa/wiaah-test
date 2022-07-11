import { TranslationTextType } from "types";
export interface TabType {
  name: string;
  component: React.ReactElement;
}

export type TabsTabType = {
  tabTitle: TranslationTextType;
  tabItem: React.ReactNode;
};
