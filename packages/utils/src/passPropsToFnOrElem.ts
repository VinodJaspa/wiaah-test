import React from "react";
import { PassPropsToChild } from "utils";
export function PassPropsToFnOrElem<Props>(
  valueOrFn: React.TrackableComponent,
  props: Props
) {
  const isFn = typeof valueOrFn === "function";
  return isFn ? valueOrFn(props) : PassPropsToChild(valueOrFn, props);
}
