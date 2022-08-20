import React from "react";
import { HtmlMetaProps } from "types";

export interface MetaSubjectProps extends HtmlMetaProps {
  subject: string;
}

export const MetaSubject: React.FC<MetaSubjectProps> = ({
  subject,
  ...props
}) => {
  return <meta name="subject" content={subject} />;
};
