import React from "react";
import { HtmlMetaProps } from "types";
import { useSeoCtx } from "react-seo";
export interface MetaVideoProps extends HtmlMetaProps {
  content: string;
}

export const MetaVideo: React.FC<MetaVideoProps> = ({ content, ...props }) => {
  const { Wrapper } = useSeoCtx();
  return (
    <Wrapper>
      <meta property="og:video" content={content} {...props} />;
    </Wrapper>
  );
};
