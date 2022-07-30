import React from "react";

interface RoutingContextInterface {
  visit: (url: string) => any;
  // getParam:(param:string)=> string
  // getParams:(params:string[])=> string[]
  // getHash:()=> string
}

export const routingContext = React.createContext<RoutingContextInterface>({
  visit: () => {},
});

export const RoutingProvider: React.FC<RoutingContextInterface> = ({
  visit,
  ...props
}) => {
  return <routingContext.Provider value={{ visit }} {...props} />;
};
