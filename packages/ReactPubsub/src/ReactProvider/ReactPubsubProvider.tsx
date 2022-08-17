import React from "react";
import { ReactPubsubClient } from "../Client";

interface ReactPubsubContextType {
  publish: (key: string, props: any) => any;
  subscribe: (key: string, cb: (props?: any) => any) => any;
  unSubscribe: (key: string) => any;
}

export const ReactPubsubContext = React.createContext<ReactPubsubContextType>({
  publish(key, props) {},
  subscribe(key, cb) {},
  unSubscribe(key) {},
});

interface ReactPubsubProviderProps {
  client: ReactPubsubClient;
}

export const ReactPubsubProvider: React.FC<ReactPubsubProviderProps> = ({
  client,
  ...props
}) => {
  return (
    <ReactPubsubContext.Provider
      value={{
        publish(key, props) {
          console.log("published");
          client.Publish(key, props);
        },
        subscribe(key, cb) {
          console.log("subscribed");
          client.Subscribe(key, cb);
        },
        unSubscribe(key) {
          client.unSubscribe(key);
        },
      }}
      {...props}
    />
  );
};
