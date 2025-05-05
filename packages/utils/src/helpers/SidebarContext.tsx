import React, { useState, createContext } from "react";

interface SidebarProps {
  visible: boolean;
  toggleVisibility: () => void;
}

const defaultState = {
  visible: false,
};

export const SidebarContext = createContext<SidebarProps | null>(null);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(defaultState.visible);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <>
      <SidebarContext.Provider value={{ visible, toggleVisibility }}>
        {children}
      </SidebarContext.Provider>
    </>
  );
};
