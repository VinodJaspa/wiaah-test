import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaVideoProps extends HtmlMetaProps {
  content: string;
}

export const MetaVideo: React.FC<MetaVideoProps> = ({ content, ...props }) => {
  return <meta property="og:video" content={content} {...props} />;
};
