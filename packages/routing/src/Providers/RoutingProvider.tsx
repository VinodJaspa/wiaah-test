import React from "react";

interface RoutingContextInterface {
  visit: (url: string) => any;
  getCurrentPath: () => string;
  getParam: (param: string) => string | null;
  getQuery: () => any;
  // removeParam: (param: string) => any;
  // getParams:(params:string[])=> string[]
  // getHash:()=> string
}

export const routingContext = React.createContext<RoutingContextInterface>({
  visit: () => {},
  getCurrentPath: () => "",
  getParam: (param) => "",
  getQuery: () => {},
  // removeParam: () => {},
});

export const RoutingProvider: React.FC<RoutingContextInterface> = ({
  visit,
  getCurrentPath,
  getParam,
  // removeParam,
  getQuery,
  ...props
}) => {
  return (
    <routingContext.Provider
      value={{ visit, getCurrentPath, getParam, getQuery }}
      {...props}
    />
  );
};
