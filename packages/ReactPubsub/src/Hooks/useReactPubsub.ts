import { ReactPubsubContext } from "../ReactProvider";
import React from "react";

export const ReactPubSubEventKeys = {
  serviceModal: "openServiceModal",
  sharePostWithModal: "openSharePostWithModal",
  openLoginPopup: "openLoginPopup",
  openFileUploadModal: "openFileUploadModal",
  openBookConfirmationModal: "openBookConfirmationModal",
  openOrderDetailsModal: "openOrderDetailsModal",
  openSocialShopPostsFilterDrawer: "OpenSocialShopPostsFilterDrawer",
  openSocialReportModal: "OpenSocialReportModal",
} as const;

type helperType<T, P, D, E> = T extends P ? D : E;

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
