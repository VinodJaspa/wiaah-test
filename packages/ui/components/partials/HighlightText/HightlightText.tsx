import React from "react";
import { setTestid } from "utils";

export interface HighlightTextProps {
  text?: string;
  toHighlight: string;
  children?: React.ReactNode;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text: altText = "",
  toHighlight,
  children,
}) => {
  const [beforeQuery, setBeforeQuery] = React.useState<string>("");
  const [afterQuery, setAfterQuery] = React.useState<string>("");
  const [renderHighlight, setRenderHighlight] = React.useState<string>("");

  const text = typeof children === "string" ? children : altText;

  React.useEffect(() => {
    const queryInStringIdx = text
      .toLowerCase()
      .search(toHighlight.toLocaleLowerCase());
    const queryLength = toHighlight.length;

    if (queryInStringIdx < 0) return;

    const strBefore = text.slice(0, queryInStringIdx);
    const strAfter = text.slice(queryInStringIdx + queryLength, text.length);
    const renderHighlight = text.slice(
      queryInStringIdx,
      queryInStringIdx + queryLength
    );
    setRenderHighlight(renderHighlight);
    setBeforeQuery(strBefore);
    setAfterQuery(strAfter);
  }, [toHighlight, text, children]);

  return (
    <span>
      <p className="inline">{beforeQuery}</p>
      <p {...setTestid("highlightedText")} className="text-primary inline">
        {renderHighlight}
      </p>
      <p className="inline">{afterQuery}</p>
    </span>
  );
};
