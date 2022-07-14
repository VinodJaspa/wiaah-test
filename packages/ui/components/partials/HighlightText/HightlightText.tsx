import React from "react";

export interface HighlightTextProps {
  text?: string;
  toHighlight: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text: altText = "",
  toHighlight,
  children,
}) => {
  const [beforeQuery, setBeforeQuery] = React.useState<string>("");
  const [afterQuery, setAfterQuery] = React.useState<string>("");

  const text = typeof children === "string" ? children : altText;

  React.useEffect(() => {
    const queryInStringIdx = text.search(toHighlight);
    const queryLength = toHighlight.length;
    if (queryInStringIdx < 0) return;

    const strBefore = text.slice(0, queryInStringIdx);
    const strAfter = text.slice(queryInStringIdx + queryLength, text.length);
    setBeforeQuery(strBefore);
    setAfterQuery(strAfter);
  }, [toHighlight, text]);

  return (
    <>
      <p className="inline">{beforeQuery}</p>
      <p className="text-primary inline">{toHighlight}</p>
      <p className="inline">{afterQuery}</p>
    </>
  );
};
