import React from "react";
import { HtmlMetaProps } from "types";
import { useSeoCtx } from "react-seo";

export interface MetaTwitterCardProps extends HtmlMetaProps {
  variant?: "normal" | "large" | "player" | "app";
}

export const MetaTwitterCard: React.FC<MetaTwitterCardProps> = ({
  variant = "normal",
  ...props
}) => {
  const { Wrapper } = useSeoCtx();
  const cardTypes = {
    normal: "summary",
    large: "summary_large_image",
    player: "player",
    app: "app",
  };

  return (
    <Wrapper>
      <meta name="twitter:card" content={cardTypes[variant]} {...props} />;
    </Wrapper>
  );
};
