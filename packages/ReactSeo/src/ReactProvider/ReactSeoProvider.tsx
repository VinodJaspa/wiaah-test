import React, { ReactNode } from "react";

interface ReactSeoContext {
  TagWrapper: React.FC;
}

export const ReactSeoContext = React.createContext<ReactSeoContext>({
  TagWrapper: () => <>{}</>,
});

interface ReactSeoProviderProps {
  TagWrapper: React.FC;
  children: ReactNode;
}

export const ReactSeoProvider: React.FC<ReactSeoProviderProps> = ({
  TagWrapper,
  children,
  ...props
}) => {
  return (
    <ReactSeoContext.Provider
      value={{
        TagWrapper,
      }}
      {...props}
    >
      {children}
    </ReactSeoContext.Provider>
  );
};
