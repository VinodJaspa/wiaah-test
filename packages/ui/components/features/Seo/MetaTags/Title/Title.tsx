import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaTitleProps extends HtmlMetaProps {
  content: string;
}

export const MetaTitle: React.FC<MetaTitleProps> = ({ content, ...props }) => {
  return (
    <>
      <meta property="og:title" content={content} {...props} />;
      <title>{content}</title>
    </>
  );
};
