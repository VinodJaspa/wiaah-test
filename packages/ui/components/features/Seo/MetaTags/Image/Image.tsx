import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaImageProps extends HtmlMetaProps {
  content: string;
}

export const MetaImage: React.FC<MetaImageProps> = ({ content, ...props }) => {
  return (
    <>
      <meta property="og:image" content={content} {...props} />
    </>
  );
};
