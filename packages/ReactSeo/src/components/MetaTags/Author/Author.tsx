import React from "react";
import { useSeoCtx } from "react-seo";

export interface HtmlMetaProps extends React.HTMLProps<HTMLMetaElement> { }

export interface MetaAuthorProps extends HtmlMetaProps {
  author: string;
}

export const MetaAuthor: React.FC<MetaAuthorProps> = ({ author, ...props }) => {
  const { Wrapper } = useSeoCtx();
  return (
    <Wrapper>
      <meta
        property="twitter:creator"
        key="twitterCreator"
        content={author}
        {...props}
      />
    </Wrapper>
  );
};
