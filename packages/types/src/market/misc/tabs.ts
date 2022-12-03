import { TranslationTextType } from "types";
export interface TabType<TComponent = React.ReactElement> {
  name: React.ReactNode;
  component: React.ReactNode | React.FC;
}

export type TabsTabType = {
  tabTitle: TranslationTextType;
  tabItem: React.ReactNode;
};
