import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaUrlProps extends HtmlMetaProps {
  url: string;
}

export const MetaUrl: React.FC<MetaUrlProps> = ({ url, ...props }) => {
  return (
    <>
      <meta name="url" content={url} {...props} />
      <meta name="og:url" content={url} {...props} />
    </>
  );
};
