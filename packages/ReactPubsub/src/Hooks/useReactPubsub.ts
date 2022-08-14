import { ReactPubsubContext } from "../ReactProvider";
import React from "react";

const PubSubEventKeys = {
  serviceModal: "openServiceModal",
};

export const useReactPubsub = (
  getKey: (keys: typeof PubSubEventKeys) => string
) => {
  const { publish, subscribe, unSbscribe } =
    React.useContext(ReactPubsubContext);

  const key = getKey(PubSubEventKeys);

  function emit(props?: any) {
    publish(key, props);
  }

  function Listen(cb: (props?: any) => any) {
    subscribe(key, cb);
  }

  function removeListner() {
    unSbscribe(key);
  }

  return {
    emit,
    Listen,
    removeListner,
  };
};
