import React from "react";
import { HtmlMetaProps } from "types";
import { useSeoCtx } from "react-seo";

export interface MetaImageProps extends HtmlMetaProps {
  content: string;
}

export const MetaImage: React.FC<MetaImageProps> = ({ content, ...props }) => {
  const { Wrapper } = useSeoCtx();
  return (
    <Wrapper>
      <meta property="og:image" content={content} {...props} />
    </Wrapper>
  );
};
