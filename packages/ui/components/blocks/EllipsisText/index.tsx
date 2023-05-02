import { Flex, Text } from "@chakra-ui/react";
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
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const postTextRef = React.useRef<HTMLParagraphElement>(null);
  const helperTextRef = React.useRef<HTMLParagraphElement>(null);
  const EllipsisRef = React.useRef<HTMLParagraphElement>(null);

  function getLineHeight(element: HTMLElement | null, text: string) {
    if (!element) return;
    const copy = element.cloneNode();
    //@ts-ignore
    copy.style.visibility = "hidden";
    //@ts-ignore
    copy.style.position = "absolute";

    copy.textContent = "a";
    if (element.parentNode) {
      element.parentNode.appendChild(copy);
    }

    //@ts-ignore
    const lineHeight = copy.offsetHeight;

    //@ts-ignore
    copy.remove();

    if (helperTextRef.current) {
      helperTextRef.current.textContent = text;
    }

    const textHeight = helperTextRef.current?.offsetHeight;

    return (textHeight || 1 / lineHeight) > lineHeight * maxLines;
  }

  const textEllipsising = getLineHeight(postTextRef.current, content || "");

  function handleShowMore() {
    setMaxLines(10000);
  }
  function handleShowLess() {
    setMaxLines(maxLines);
  }
  React.useEffect(() => {
    if (MaxLines > maxLines) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, [MaxLines]);

  return (
    <div className="relative font-semibold flex flex-col">
      <p
        className="absolute w-full pointer-events-none hidden"
        ref={helperTextRef}
      ></p>
      <Text
        wordBreak={wordBreak ? "break-all" : "break-word"}
        ref={postTextRef}
        noOfLines={MaxLines}
        textAlign={"start"}
        overflow="clip"
        textOverflow="clip"
      >
        {children}
        {content}
      </Text>
      {textEllipsising && !displayShowMore ? null : showMore === true ? (
        <div className="absolute bottom-0 right-0 justify-end flex w-full text-primary capitalize transform-cpu">
          <div
            className={`${
              showMoreColor ? showMoreColor : "bg-white"
            } flex gap-1`}
          >
            <p className="text-primary" ref={EllipsisRef}>
              ...
            </p>
            <p className="cursor-pointer" onClick={handleShowMore}>
              {t("more")}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="
        flex justify-end absolute bottom-0 right-0 cursor-pointer text-primary capitalize"
          onClick={handleShowLess}
        >
          <p className="w-fit pl-2">{t("show less")}</p>
        </div>
      )}
    </div>
  );
};

export default EllipsisText;
