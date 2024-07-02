import React from "react";
import { ReactSeoContext } from "react-seo";

export const useSeoCtx = () => {
  const { TagWrapper } = React.useContext(ReactSeoContext);
  if (!TagWrapper) {
    throw new Error("useSeoCtx must be used within a ReactSeoContextProvider");
  }
  return {
    Wrapper: TagWrapper,
  };
};
