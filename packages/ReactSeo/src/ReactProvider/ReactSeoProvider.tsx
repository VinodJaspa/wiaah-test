import React, { PropsWithChildren, ReactNode } from "react";

// Define the interface for the SEO context
interface ReactSeoContext {
  TagWrapper: React.FC<React.PropsWithChildren<{}>>;
}

// Create the SEO context
export const ReactSeoContext = React.createContext<ReactSeoContext>({
  TagWrapper: ({ children }) => <>{children}</>, // Default TagWrapper component
});


interface ReactSeoProviderProps {
  TagWrapper: React.FC<PropsWithChildren<{}>>; // ✅ Allows children
  children: ReactNode;
}
// Create the SEO provider component
export const ReactSeoProvider: React.FC<ReactSeoProviderProps> = ({
  TagWrapper,
  children,
}) => {
  return (
    // Provide the TagWrapper component through the SEO context
    <ReactSeoContext.Provider value={{ TagWrapper }}>
      {children}
    </ReactSeoContext.Provider>
  );
};
