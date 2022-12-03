import React from "react";

interface ReactSeoContext {
  TagWrapper: React.FC;
}

export const ReactSeoContext = React.createContext<ReactSeoContext>({
  TagWrapper: ({ children }) => <>{children}</>,
});

interface ReactSeoProviderProps {
  TagWrapper: React.FC;
}

export const ReactSeoProvider: React.FC<ReactSeoProviderProps> = ({
  TagWrapper,
  ...props
}) => {
  return (
    <ReactSeoContext.Provider
      value={{
        TagWrapper,
      }}
      {...props}
    />
  );
};
