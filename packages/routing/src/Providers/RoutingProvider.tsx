import React, { ReactNode } from "react";

interface RoutingContextInterface {
  visit: (url: string) => any;
  getCurrentPath: () => string;
  getParam: (param: string) => string | null;
  getQuery: () => any;
  getBaseUrl: () => string;
  back: () => void;
  // removeParam: (param: string) => any;
  // getParams:(params:string[])=> string[]
  // getHash:()=> string
  children: ReactNode;
}

export const routingContext = React.createContext<RoutingContextInterface>({
  children: <div></div>,
  visit: () => {},
  getCurrentPath: () => "",
  getParam: (param) => "",
  getQuery: () => {},
  getBaseUrl: () => "",
  back: () => {},
  // removeParam: () => {},
});

export const RoutingProvider: React.FC<RoutingContextInterface> = ({
  visit,
  getCurrentPath,
  getParam,
  // removeParam,
  getQuery,
  getBaseUrl,
  back,
  children,
  ...props
}) => {
  return (
    <routingContext.Provider
      value={{
        visit,
        getCurrentPath,
        getParam,
        getQuery,
        getBaseUrl,
        back,
        children,
      }}
      {...props}
    ></routingContext.Provider>
  );
};
