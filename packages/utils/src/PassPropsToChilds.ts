import { HtmlDivProps } from "types";
import React from "react";

export function PassPropsToChild<T = HtmlDivProps>(
  children: React.TrackableComponent,
  props: T
): React.TrackableComponent {
  function clone(children: React.TrackableComponent) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, props);
    } else {
      return null;
    }
  }

  return Array.isArray(children)
    ? children.map((child) => clone(child))
    : clone(children);
}
