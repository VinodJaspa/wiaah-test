import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaAuthorProps extends HtmlMetaProps {
  author: string;
}

export const MetaAuthor: React.FC<MetaAuthorProps> = ({ author, ...props }) => {
  return <meta property="twitter:creator" content={author} {...props} />;
};
