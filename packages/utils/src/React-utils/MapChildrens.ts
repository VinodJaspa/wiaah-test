import React from "react";
import { runIfFn } from "../runIfFun";

export function MapChildren<TProps>(
  children: React.ReactNode,
  props: TProps
): React.ReactNode {
  return Array.isArray(children)
    ? children.map((child) => runIfFn(child, props))
    : runIfFn(children, props);
}
