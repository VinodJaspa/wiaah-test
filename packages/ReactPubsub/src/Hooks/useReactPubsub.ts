import { ReactPubsubContext } from "../ReactProvider";
import React from "react";

export function useReactPubsub<TKeys>(getKey: (keys: TKeys) => string) {
  const { publish, subscribe, unSubscribe, keys } =
    React.useContext(ReactPubsubContext);

  //@ts-ignore
  const key = getKey(keys);

  function emit(props?: object) {
    publish(key, props);
  }

  function Listen<TProps = any>(cb: (props?: TProps) => any) {
    subscribe(key, cb);
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
