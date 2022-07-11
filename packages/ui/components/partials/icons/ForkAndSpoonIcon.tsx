import React from "react";
import { HtmlDivProps } from "types";
import { GiForkKnifeSpoon } from "react-icons/gi";

export const ForkAndSpoonIcon: React.FC<HtmlDivProps> = (props) => {
  return (
    <div {...props}>
      <GiForkKnifeSpoon />
    </div>
  );
};
