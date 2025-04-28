import React, { useState, createContext } from "react";

interface SidebarProps {
  visible: boolean;
  toggleVisibility: () => void;
}

const defaultState = {
  visible: false,
};

export const SidebarContext = createContext<SidebarProps | null>(null);

interface Props {
  children?: React.ReactNode;
}

export const SidebarProvider: React.FC<Props> = ({ children }) => {
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
