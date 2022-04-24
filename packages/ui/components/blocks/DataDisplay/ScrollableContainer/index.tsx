import { Flex, Box, Text, FlexProps } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { PostCommentCard } from "ui";

export interface ScrollableContainerProps extends FlexProps {
  children: React.ReactElement[];
  maxShowMoreItems?: number;
  maxInitialItems: number;
  doesShowMore?: boolean;
}

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  maxInitialItems,
  doesShowMore = true,
  maxShowMoreItems = maxInitialItems,
  ...props
}) => {
  const { t } = useTranslation();
  const [items, setItems] = React.useState<React.ReactElement[]>(
    children.slice(0, maxInitialItems)
  );
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const commentsContainerRef = React.useRef<HTMLDivElement>(null);
  const MockCommentsContainerRef = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const isShowMore = (children.length || 1) > maxInitialItems && doesShowMore;

  function setHeight() {
    const maxH = MockCommentsContainerRef.current?.offsetHeight;
    return maxH;
  }

  const containerHeight = setHeight();

  function handleLoaded() {
    setLoaded((state) => !state);
  }

  React.useEffect(() => {
    setItems(() => {
      if (children && !showMore) {
        return children.slice(0, maxInitialItems);
      } else {
        return children || [];
      }
    });
  }, [showMore]);

  function handleShowMoreComments() {
    setShowMore(true);
  }

  function handleShowLessComments() {
    if (commentsContainerRef.current && commentsContainerRef.current.scrollTo) {
      commentsContainerRef.current.scrollTo(0, 0);
    }
    setShowMore(false);
  }

  return (
    <Flex direction={"column"}>
      <Flex {...props} onLoad={handleLoaded} position={"relative"}>
        <Flex
          ref={commentsContainerRef}
          overflowY={showMore ? "scroll" : "hidden"}
          direction={"column"}
          className="thinScroll"
          w="100%"
          height={containerHeight}
          gap="0.5rem"
          data-testid="CommentsWrapper"
        >
          {items.map((Child, i) => (
            <>{Child}</>
          ))}
        </Flex>

        <Flex
          onLoad={handleLoaded}
          ref={MockCommentsContainerRef}
          position="absolute"
          pointerEvents={"none"}
          w="100%"
          visibility="hidden"
          direction={"column"}
          gap="0.5rem"
        >
          {items
            .slice(0, showMore === true ? maxShowMoreItems : maxInitialItems)
            .map((item, i) => [item])}
        </Flex>
      </Flex>
      {isShowMore && (
        <Box
          fontWeight={"semibold"}
          cursor="pointer"
          fontSize="lg"
          w="100%"
          py="0.5rem"
          textAlign={"center"}
          textTransform={"capitalize"}
        >
          {showMore === false ? (
            <Text data-testid="ShowMoreBtn" onClick={handleShowMoreComments}>
              {t("show_more", "show more")}
            </Text>
          ) : (
            <Text data-testid="ShowLessBtn" onClick={handleShowLessComments}>
              {t("show_less", "show less")}
            </Text>
          )}
        </Box>
      )}
    </Flex>
  );
};
