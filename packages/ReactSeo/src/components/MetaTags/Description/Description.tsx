import React from "react";
import { HtmlMetaProps } from "types";
import { useSeoCtx } from "react-seo";
export interface MetaDescriptionProps extends HtmlMetaProps {
  content: string;
}

export const MetaDescription: React.FC<MetaDescriptionProps> = ({
  content,
  ...props
}) => {
  const { Wrapper } = useSeoCtx();
  return (
    <Wrapper>
      <meta {...props} name="description" key="description" content={content} />
      <meta
        {...props}
        property="og:description"
        key="opengraphDescription"
        content={content}
      />
    </Wrapper>
  );
};
