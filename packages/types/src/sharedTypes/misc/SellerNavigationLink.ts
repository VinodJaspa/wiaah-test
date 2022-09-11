import { IconType } from "react-icons";
import { IconProps } from "@chakra-ui/react";
export type NavigationLinkType = {
  name: string;
  icon: React.ReactNode;
  url: string;
  mobileOnly?: boolean;
  size?: Pick<IconProps, "w" | "h">;
};
