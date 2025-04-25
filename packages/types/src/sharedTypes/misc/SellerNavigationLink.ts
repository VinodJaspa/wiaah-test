import { IconBaseProps, IconType } from "react-icons";

export type NavigationLinkType = {
  name: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  url: string;
  mobileOnly?: boolean;

  size?: Pick<IconBaseProps, "width" | "height">;
};
