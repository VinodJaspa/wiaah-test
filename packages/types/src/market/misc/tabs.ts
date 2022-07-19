import { TranslationTextType } from "types";
export interface TabType<TComponent = React.ReactElement> {
  name: string;
  component: TComponent;
}

export type TabsTabType = {
  tabTitle: TranslationTextType;
  tabItem: React.ReactNode;
};
