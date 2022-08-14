import React from "react";

interface RoutingContextInterface {
  visit: (url: string) => any;
  getCurrentPath: () => string;
  getParam: (param: string) => string | null;
  // getParams:(params:string[])=> string[]
  // getHash:()=> string
}

export const routingContext = React.createContext<RoutingContextInterface>({
  visit: () => {},
  getCurrentPath: () => "",
  getParam: (param) => "",
});

export const RoutingProvider: React.FC<RoutingContextInterface> = ({
  visit,
  getCurrentPath,
  getParam,
  ...props
}) => {
  return (
    <routingContext.Provider
      value={{ visit, getCurrentPath, getParam }}
      {...props}
    />
  );
};
