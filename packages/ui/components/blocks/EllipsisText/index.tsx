import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import { useTranslation } from "react-i18next";

export interface EllipsisTextProps {
  content: string;
  maxLines: number;
  wordBreak?: boolean;
}

export const EllipsisText: React.FC<EllipsisTextProps> = ({
  content,
  maxLines,
  wordBreak,
}) => {
  const { t } = useTranslation();
  const [MaxLines, setMaxLines] = React.useState<number>(maxLines);
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const postTextRef = React.useRef<HTMLParagraphElement>(null);
  const helperTextRef = React.useRef<HTMLParagraphElement>(null);

  function getLineHeight(element: HTMLElement | null, text: string) {
    if (!element) return;
    const copy = element.cloneNode();
    copy.style.visibility = "hidden";
    copy.style.position = "absolute";

    copy.textContent = "a";
    if (element.parentNode) {
      element.parentNode.appendChild(copy);
    }

    const lineHeight = copy.offsetHeight;

    copy.remove();

    if (helperTextRef.current) {
      helperTextRef.current.textContent = text;
    }

    const textHeight = helperTextRef.current?.offsetHeight;

    return (textHeight || 1 / lineHeight) > lineHeight * maxLines;
  }

  const textEllipsising = getLineHeight(postTextRef.current, content);

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
    <Flex position={"relative"} fontWeight={"semibold"} direction={"column"}>
      <Text
        position={"absolute"}
        w="100%"
        pointerEvents="none"
        visibility={"hidden"}
        ref={helperTextRef}
      ></Text>
      <Text
        wordBreak={wordBreak ? "break-all" : "break-word"}
        ref={postTextRef}
        noOfLines={MaxLines}
        textAlign={"start"}
        overflow="clip"
        textOverflow="clip"
      >
        {content}
      </Text>
      {!textEllipsising ? null : showMore === true ? (
        <Flex
          position={"absolute"}
          bottom="0px"
          right="0px"
          justify={"end"}
          w="100%"
          color="primary.main"
          textTransform={"capitalize"}
          transform="auto"
        >
          <Flex bg="primary.light" gap="0.5rem">
            <Text color="black" bg="primary.light">
              ...
            </Text>
            <Text
              cursor={"pointer"}
              onClick={handleShowMore}
              w="fit-content"
              bg="primary.light"
            >
              {t("show_more", "show more")}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex
          justify={"end"}
          position={"absolute"}
          bottom="0px"
          right="0px"
          cursor={"pointer"}
          color="primary.main"
          textTransform={"capitalize"}
          onClick={handleShowLess}
        >
          <Text w="fit-content" pl="0.5rem" bg="primary.light">
            {t("show_less", "show less")}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default EllipsisText;
