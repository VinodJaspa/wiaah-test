import React from "react";

interface RoutingContextInterface {
  visit: (url: string) => any;
  getCurrentPath: () => string;
  // getParam:(param:string)=> string
  // getParams:(params:string[])=> string[]
  // getHash:()=> string
}

export const routingContext = React.createContext<RoutingContextInterface>({
  visit: () => {},
  getCurrentPath: () => "",
});

export const RoutingProvider: React.FC<RoutingContextInterface> = ({
  visit,
  getCurrentPath,
  ...props
}) => {
  return (
    <routingContext.Provider value={{ visit, getCurrentPath }} {...props} />
  );
};
