import { ReactPubsubContext } from "../ReactProvider";
import React from "react";

export function useReactPubsub<TKeys>(getKey: (keys: TKeys) => string) {
  const context = React.useContext(ReactPubsubContext);

  if (!context) {
    throw new Error("ReactPubsubContext is not available.");
  }

  const { publish, subscribe, unSubscribe, keys } = context;

  const key = React.useMemo(() => getKey(keys as TKeys), [keys, getKey]);

  function emit<TProps = any>(props?: TProps) {
    publish(key, props);
  }

  function Listen<TProps = any>(cb: (props?: TProps) => any) {
    subscribe(key, cb);
    return () => unSubscribe(key); // Return cleanup function
  }

  function removeListner() {
    unSubscribe(key);
  }

  return {
    emit,
    Listen,
    removeListner,
  };
}
