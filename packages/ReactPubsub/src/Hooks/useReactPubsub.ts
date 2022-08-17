import { ReactPubsubContext } from "../ReactProvider";
import React from "react";

export const ReactPubSubEventKeys = {
  serviceModal: "openServiceModal",
  sharePostWithModal: "openSharePostWithModal",
  openLoginPopup: "openLoginPopup",
};

export const useReactPubsub = (
  getKey: (keys: typeof ReactPubSubEventKeys) => string
) => {
  const { publish, subscribe, unSubscribe } =
    React.useContext(ReactPubsubContext);

  const key = getKey(ReactPubSubEventKeys);

  function emit(props?: object) {
    publish(key, props);
  }

  function Listen(cb: (props?: any) => any) {
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
};
