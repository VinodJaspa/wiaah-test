import { Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React from "react";

export interface EllipsisTextProps {
  content?: string;
  maxLines: number;
  wordBreak?: boolean;
  ShowMore?: boolean;
  showMoreColor?: string;
  showMoreTextColor?: string;
  displayShowMore?: boolean;
  children?: React.ReactNode;
}

export const EllipsisText: React.FC<EllipsisTextProps> = ({
  content,
  maxLines,
  wordBreak,
  ShowMore = true,
  showMoreColor,
  children,
  displayShowMore,
}) => {
  const { t } = useTranslation();
  const [MaxLines, setMaxLines] = React.useState<number>(maxLines);
  const [showMore, setShowMore] = React.useState<boolean>(true);
  const postTextRef = React.useRef<HTMLParagraphElement>(null);
  const helperTextRef = React.useRef<HTMLParagraphElement>(null);

  const useLinesCount = (ref: React.RefObject<HTMLElement>): number => {
    const [lines, setLines] = React.useState<number>(0);

    React.useEffect(() => {
      if (ref.current) {
        const element = ref.current;
        const computedStyle = window.getComputedStyle(element);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const height = element.getBoundingClientRect().height;
        const numberOfLines = Math.ceil(height / lineHeight);
        setLines(numberOfLines);
      }
    }, [ref]);

    return lines;
  };

  function getLineHeight(
    element: React.RefObject<HTMLElement>,
    text: string,
    maxLines: number,
  ) {
    if (!element || !helperTextRef.current) return false;

    // Create a temporary container to measure line height
    const tempContainer = document.createElement("div");
    tempContainer.style.visibility = "hidden";
    tempContainer.style.position = "absolute";
    tempContainer.style.whiteSpace = "nowrap"; // Ensure single-line text measurement
    tempContainer.textContent = "a"; // A single character for line height measurement

    // Append temporary container to the body for measurement
    document.body.appendChild(tempContainer);
    const lineHeight = tempContainer.offsetHeight;

    // Remove temporary container
    document.body.removeChild(tempContainer);

    // Set the text content to helper text and measure its height
    helperTextRef.current.textContent = text;
    const textHeight = helperTextRef.current.offsetHeight;

    // Compare text height to the maximum allowed height
    return textHeight > lineHeight * maxLines;
  }

  const linesCount = useLinesCount(postTextRef);
  const textEllipsising = getLineHeight(postTextRef, content || "", maxLines);

  function handleShowMore() {
    setMaxLines(10000); // Expand the text
    setShowMore(false); // Hide the "Show More" button after expansion
  }

  function handleShowLess() {
    setMaxLines(maxLines); // Collapse back to original limit
    setShowMore(true); // Show the "Show More" button again
  }

  React.useEffect(() => {
    if (MaxLines > maxLines) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, [MaxLines]);

  return (
    <div className="relative font-base flex flex-col">
      <p
        className="absolute w-full text-[#262626] font-[15px] pointer-events-none hidden"
        ref={helperTextRef}
      ></p>

      {/* Container for content and absolute positioned button */}
      <div className="relative">
        {/* Text content with ellipsis */}
        <Text
          wordBreak={wordBreak ? "break-all" : "break-word"}
          ref={postTextRef}
          noOfLines={MaxLines}
          textAlign={"start"}
          overflow="clip"
          textOverflow="clip"
        >
          <>
            {children}
            {content}
          </>
        </Text>

        {/* Show More button at the end of the content */}
        {linesCount === maxLines && showMore && (
          <div
            className="absolute bottom-0 right-0 cursor-pointer text-primary capitalize"
            style={{ marginTop: "5px" }}
            onClick={handleShowMore}
          >
            <span className={`cursor-pointer ${showMoreColor || ""}`}>
              {t("show more")}
            </span>
          </div>
        )}

        {/* Show Less button after expanding the content */}
        {MaxLines > maxLines && (
          <div
            className="absolute bottom-0 right-0 cursor-pointer text-primary capitalize"
            style={{ marginTop: "5px" }}
            onClick={handleShowLess}
          >
            <span className="cursor-pointer text-primary capitalize">
              {t("show less")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EllipsisText;
