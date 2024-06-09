import React, { createContext, ReactNode } from "react";

interface RoutingContextInterface {
  visit: (url: string) => any;
  getCurrentPath: () => string;
  getParam: (param: string) => string | null;
  getQuery: () => any;
  getBaseUrl: () => string;
  back: () => void;
}

const defaultRoutingContext: RoutingContextInterface = {
  visit: () => { },
  getCurrentPath: () => "",
  getParam: () => null,
  getQuery: () => { },
  getBaseUrl: () => "",
  back: () => { },
};

interface RoutingProviderProps extends RoutingContextInterface {
  children: ReactNode;
}

export const routingContext = createContext<RoutingContextInterface>(
  defaultRoutingContext
);

export const RoutingProvider: React.FC<RoutingProviderProps> = ({
  children,
  ...methods
}) => {
  // 'children' is removed from the context value
  return (
    <routingContext.Provider value={methods}>
      {children}
    </routingContext.Provider>
  );
};
