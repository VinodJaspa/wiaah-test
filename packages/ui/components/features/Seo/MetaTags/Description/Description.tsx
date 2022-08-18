import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaDescriptionProps extends HtmlMetaProps {
  content: string;
}

export const MetaDescription: React.FC<MetaDescriptionProps> = ({
  content,
  ...props
}) => {
  return (
    <>
      <meta {...props} name="description" content={content} />
      <meta {...props} property="og:description" content={content} />
    </>
  );
};
