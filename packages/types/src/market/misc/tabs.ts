import { TranslationTextType } from "types";
export interface TabType<TComponent = React.ReactElement> {
  name: React.ReactNode | React.FC;
  component: React.ReactNode | React.FC;
  outlineIcon?: React.ReactNode;
  solidIcon?: React.ReactNode;
}

export type TabsTabType = {
  tabTitle: TranslationTextType;
  tabItem: React.ReactNode;
};
