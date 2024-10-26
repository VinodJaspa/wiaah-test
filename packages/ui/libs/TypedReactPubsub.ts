import { ReactPubsubKeysType } from "@const";
import { useReactPubsub } from "react-pubsub";

export const useTypedReactPubsub = (
  fn: (keys: ReactPubsubKeysType) => string,
) => useReactPubsub<ReactPubsubKeysType>(fn);
