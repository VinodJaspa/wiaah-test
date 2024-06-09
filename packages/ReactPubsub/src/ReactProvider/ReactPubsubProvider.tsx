import React, { ReactNode } from "react";
import { ReactPubsubClient } from "../Client";

interface ReactPubsubContextType {
  publish: (key: string, props: any) => any;
  subscribe: (key: string, cb: (props?: any) => any) => any;
  unSubscribe: (key: string) => any;
  keys: Record<string, any>;
}

export const ReactPubsubContext = React.createContext<ReactPubsubContextType>({
  publish: () => { },
  subscribe: () => { },
  unSubscribe: () => { },
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
}) => {
  const publish = (key: string, props: any) => {
    client.Publish(key, props);
  };

  const subscribe = (key: string, cb: (props?: any) => any) => {
    client.Subscribe(key, cb);
  };

  const unSubscribe = (key: string) => {
    client.unSubscribe(key);
  };

  return (
    <ReactPubsubContext.Provider
      value={{
        publish,
        subscribe,
        unSubscribe,
        keys,
      }}
    >
      {children}
    </ReactPubsubContext.Provider>
  );
};
