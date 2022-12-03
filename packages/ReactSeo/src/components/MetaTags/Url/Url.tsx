import React from "react";
import { HtmlMetaProps } from "types";
import { useSeoCtx } from "react-seo";
export interface MetaUrlProps extends HtmlMetaProps {
  url: string;
}

export const MetaUrl: React.FC<MetaUrlProps> = ({ url, ...props }) => {
  const { Wrapper } = useSeoCtx();
  return (
    <Wrapper>
      <meta name="url" key="url" content={url} {...props} />
      <meta name="og:url" key="opengraphUrl" content={url} {...props} />
    </Wrapper>
  );
};
