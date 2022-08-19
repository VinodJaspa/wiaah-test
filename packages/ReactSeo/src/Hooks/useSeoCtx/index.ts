import React from "react";
import { ReactSeoContext } from "react-seo";

export const useSeoCtx = () => {
  const { TagWrapper } = React.useContext(ReactSeoContext);
  return {
    Wrapper: TagWrapper,
  };
};
