import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaTwitterCardProps extends HtmlMetaProps {
  variant?: "normal" | "large" | "player" | "app";
}

export const MetaTwitterCard: React.FC<MetaTwitterCardProps> = ({
  variant = "normal",
  ...props
}) => {
  const cardTypes = {
    normal: "summary",
    large: "summary_large_image",
    player: "player",
    app: "app",
  };

  return <meta name="twitter:card" content={cardTypes[variant]} {...props} />;
};
