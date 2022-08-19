import React from "react";
import { HtmlMetaProps } from "types";
import { SeperatedStringArray } from "utils";

export interface MetaKeywordsProps extends Omit<HtmlMetaProps, "content"> {
  content: string[];
}

export const MetaKeywords: React.FC<MetaKeywordsProps> = ({
  content,
  ...props
}) => {
  return (
    <meta
      {...props}
      property="keyword"
      content={`${SeperatedStringArray(content, ", ")}`}
    />
  );
};
