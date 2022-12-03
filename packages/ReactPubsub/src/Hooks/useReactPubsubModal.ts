import React from "react";
import { ReactPubSubEventKeys, useReactPubsub } from "./useReactPubsub";

export function useReactPubsubModal<TValue extends object>(
  fn: (keys: typeof ReactPubSubEventKeys) => keyof typeof ReactPubSubEventKeys,
  subscribe: boolean = false
) {
  const [value, setValue] = React.useState<TValue>();
  const { Listen, emit } = useReactPubsub(fn);

  function open(value: TValue) {
    emit({ ...value });
  }

  function close() {
    emit();
  }

  if (subscribe) {
    Listen((props) => {
      if (props) {
        setValue(props);
      } else {
        setValue(undefined);
      }
    });
  }

  return {
    isOpen: !!value,
    value,
    close,
    open,
  };
}
