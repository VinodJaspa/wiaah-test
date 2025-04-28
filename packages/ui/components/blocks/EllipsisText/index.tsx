
import { ShadcnText } from "@UI/components/shadcn-components";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export interface EllipsisTextProps {
  content?: string;
  maxLines: number;
  wordBreak?: boolean;
  ShowMore?: boolean;
  showMoreColor?: string;
  showMoreTextColor?: string;
  displayShowMore?: boolean;
  children?: React.ReactNode;
  index?: number;
  isReply?: boolean;
  isActionView?: boolean;
}

export const EllipsisText: React.FC<EllipsisTextProps> = ({
  content,
  maxLines,
  wordBreak,
  ShowMore = true,
  showMoreColor,
  children,
  displayShowMore,
  index,
  isReply,
  isActionView,
}) => {
  content = `@janedoe ${content || ""} #react #typescript #python`;
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [MaxLines, setMaxLines] = React.useState<number>(maxLines);
  const [showMore, setShowMore] = React.useState<boolean>(true);
  const [modifiedContent, setModifiedContent] = React.useState<string>(
    content || "",
  );

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

    const tempContainer = document.createElement("div");
    tempContainer.style.visibility = "hidden";
    tempContainer.style.position = "absolute";
    tempContainer.style.whiteSpace = "nowrap";
    tempContainer.textContent = "a";
    document.body.appendChild(tempContainer);
    const lineHeight = tempContainer.offsetHeight;
    document.body.removeChild(tempContainer);
    helperTextRef.current.textContent = text;
    const textHeight = helperTextRef.current.offsetHeight;

    return textHeight > lineHeight * maxLines;
  }

  const linesCount = useLinesCount(postTextRef);
  const textEllipsising = getLineHeight(postTextRef, content, maxLines);

  function handleShowMore() {
    setMaxLines(10000);
    setShowMore(false);
  }

  function handleShowLess() {
    setMaxLines(maxLines);
    setShowMore(true);
  }

  React.useEffect(() => {
    const characterLimit = isActionView ? 65 : 150;
    if (index === 0 && content?.length > characterLimit && showMore) {
      setModifiedContent(content?.substring(0, characterLimit));
    } else {
      setModifiedContent(content);
    }
  }, [content, index, showMore, isActionView]);

  const renderMentions = (text: string) => {
    return text.split(" ").map((word, index, arr) => {
      if (word.startsWith("@")) {
        return (
          <strong key={`mention-${index}`}>
            {word}
            {index !== arr.length - 1 ? " " : ""}
          </strong>
        );
      }
      return (
        <React.Fragment key={`text-${index}`}>
          {word}
          {index !== arr.length - 1 ? " " : ""}
        </React.Fragment>
      );
    });
  };

  const renderProcessedContent = () => {
    let hashtagCount = 0;

    return modifiedContent.split(" ").map((word, index, arr) => {
      if (word.startsWith("#")) {
        if (hashtagCount < 7) {
          hashtagCount++;
          return (
            <Link
              key={`${index}-${word}`}
              href={`/hashtag/${word.slice(1)}`}
              className="text-primary"
            >
              {` ${word} `}
            </Link>
          );
        } else {
          return null;
        }
      } else if (word.startsWith("@")) {
        return <strong key={`${index}-${word}`}>{` ${word} `}</strong>;
      }
      return word + (index === arr.length - 1 ? "" : " ");
    });
  };

  return (
    <div className="relative font-base flex flex-col">
      <p
        className="absolute w-full text-[#262626] font-[15px] pointer-events-none hidden"
        ref={helperTextRef}
      ></p>
      <div className="relative">
        <ShadcnText
          className={`${wordBreak ? "break-all" : "break-words"} text-start line-clamp-${MaxLines}`}
          ref={postTextRef}
        >
          <>
            {children}
            {index !== 0 && content && renderMentions(content)}
            {index === 0 && (
              <>
                {renderProcessedContent()}
                {content?.length > (isActionView ? 65 : 150) &&
                  showMore &&
                  content
                    .split(" ")
                    .filter((word) => word.startsWith("#"))
                    .map((word, index) => (
                      <Link
                        key={`extra-${index}-${word}`}
                        href={`/hashtag/${word.slice(1)}`}
                        className="text-primary"
                      >
                        {` ${word} `}
                      </Link>
                    ))
                    .slice(0, 3)}
                {index === 0 &&
                  content?.length > (isActionView ? 65 : 150) &&
                  showMore &&
                  " ..."}
              </>
            )}
          </>
        </ShadcnText>
        {linesCount === maxLines &&
          showMore &&
          content?.length > (isActionView ? 65 : 150) && (
            <div
              className="absolute bottom-0 right-0 cursor-pointer capitalize"
              style={{ marginTop: "5px" }}
              onClick={handleShowMore}
            >
              <span className={`cursor-pointer ${showMoreColor || ""}`}>
                {t("show more")}
              </span>
            </div>
          )}
        {MaxLines > maxLines && (
          <div
            className="absolute -bottom-4 right-0 cursor-pointer capitalize"
            style={{ marginTop: "5px" }}
            onClick={handleShowLess}
          >
            <span className="cursor-pointer capitalize">{t("show less")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EllipsisText;
