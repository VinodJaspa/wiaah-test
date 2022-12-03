import React from "react";

export interface SectionContextValue {
  onReturn: () => any;
}

export const SectionContext = React.createContext<SectionContextValue>({
  onReturn: () => {},
});
