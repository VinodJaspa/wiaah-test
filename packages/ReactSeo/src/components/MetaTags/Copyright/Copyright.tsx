import React from "react";
import { HtmlMetaProps } from "types";
import { useSeoCtx } from "react-seo";

export interface MetaCopyrightProps extends HtmlMetaProps {
  content: string;
}

export const MetaCopyright: React.FC<MetaCopyrightProps> = ({ content }) => {
  const { Wrapper } = useSeoCtx();
  return (
    <Wrapper>
      <meta name="copyright" content={content} />;
    </Wrapper>
  );
};
