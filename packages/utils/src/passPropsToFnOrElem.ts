import React from "react";
import { PassPropsToChild } from "utils";

type ValueOrFn<Props> = React.ReactNode | ((props: Props) => React.ReactNode);

export function PassPropsToFnOrElem<Props>(
  valueOrFn: ValueOrFn<Props>,
  props: Props
) {
  const isFn = typeof valueOrFn === "function";
  return isFn
    ? (valueOrFn as (props: Props) => React.ReactNode)(props)
    : PassPropsToChild(valueOrFn, props);
}
