import React from "react";
import { HtmlMetaProps } from "types";
import { useSeoCtx } from "react-seo";

export interface MetaTitleProps extends HtmlMetaProps {
  content: string;
}

export const MetaTitle: React.FC<MetaTitleProps> = ({ content, ...props }) => {
  const { Wrapper } = useSeoCtx();
  return (
    <Wrapper>
      <title key={"title"}>{content}</title>;
      <meta
        property="og:title"
        key="opengraphTitle"
        content={content}
        {...props}
      />
    </Wrapper>
  );
};
