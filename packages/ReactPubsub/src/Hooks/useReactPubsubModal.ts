import React from "react";
import { useReactPubsub } from "./useReactPubsub";
import { ReactPubsubKeys } from "ui";

export function useReactPubsubModal<TValue extends object>(
  fn: (keys: typeof ReactPubsubKeys) => keyof typeof ReactPubsubKeys,
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
