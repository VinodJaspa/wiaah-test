import React, { ReactNode } from "react";

// Define the interface for the SEO context
interface ReactSeoContext {
  TagWrapper: React.FC<React.PropsWithChildren<{}>>;
}

// Create the SEO context
export const ReactSeoContext = React.createContext<ReactSeoContext>({
  TagWrapper: ({ children }) => <>{children}</>, // Default TagWrapper component
});

// Define the props interface for the SEO provider
interface ReactSeoProviderProps {
  TagWrapper: React.FC; // Accepts a functional component for TagWrapper
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
