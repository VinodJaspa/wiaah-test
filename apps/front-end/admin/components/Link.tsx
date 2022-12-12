import { MainRouterInterface } from "routing";
import { Link as _Link, LinkProps } from "ui";
import React from "react";

export const Link = (props: LinkProps<MainRouterInterface>) =>
  _Link<MainRouterInterface>(props);
