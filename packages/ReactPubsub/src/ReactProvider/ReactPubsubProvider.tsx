import React, { Children, ReactNode } from "react";
import { ReactPubsubClient } from "../Client";

interface ReactPubsubContextType {
  publish: (key: string, props: any) => any;
  subscribe: (key: string, cb: (props?: any) => any) => any;
  unSubscribe: (key: string) => any;
  keys: Record<string, any>;
}

export const ReactPubsubContext = React.createContext<ReactPubsubContextType>({
  publish(key, props) {},
  subscribe(key, cb) {},
  unSubscribe(key) {},
  keys: {},
});

interface ReactPubsubProviderProps {
  client: ReactPubsubClient;
  keys: Record<string, any>;
  children: ReactNode;
}

export const ReactPubsubProvider: React.FC<ReactPubsubProviderProps> = ({
  client,
  keys,
  children,
  ...props
}) => {
  return (
    <ReactPubsubContext.Provider
      value={{
        keys,
        publish(key, props) {
          client.Publish(key, props);
        },
        subscribe(key, cb) {
          client.Subscribe(key, cb);
        },
        unSubscribe(key) {
          client.unSubscribe(key);
        },
      }}
      {...props}
    >
      {children}
    </ReactPubsubContext.Provider>
  );
};
