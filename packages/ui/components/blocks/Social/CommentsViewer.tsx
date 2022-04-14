import React from "react";
import { PostComment } from "types/market/Social";
import { Flex, Text, Box } from "@chakra-ui/react";
import { PostCommentCard } from "ui";
import { t } from "i18next";
export interface CommentsViewerProps {
  comments: PostComment[];
  maxInitailComments: number;
}

export const CommentsViewer: React.FC<CommentsViewerProps> = ({
  comments: Comments,
  maxInitailComments,
}) => {
  const [comments, setComments] = React.useState<PostComment[]>(
    Comments.slice(0, maxInitailComments)
  );
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const commentsContainerRef = React.useRef<HTMLDivElement>(null);
  const MockCommentsContainerRef = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const isShowMore = (Comments.length || 1) > maxInitailComments;

  function setHeight(): number {
    const maxH = MockCommentsContainerRef.current?.offsetHeight;
    return maxH || 1;
  }

  const containerHeight = setHeight();

  function handleLoaded() {
    setLoaded((state) => !state);
  }

  React.useEffect(() => {
    setComments(() => {
      if (Comments && !showMore) {
        return Comments.slice(0, 4);
      } else {
        return Comments || [];
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
    <>
      <Flex onLoad={handleLoaded} position={"relative"}>
        <Flex
          ref={commentsContainerRef}
          overflowY={showMore ? "scroll" : "hidden"}
          direction={"column"}
          className="thinScroll"
          height={containerHeight}
          gap="0.5rem"
          data-testid="CommentsWrapper"
        >
          {comments.map((comment, i) => (
            <PostCommentCard data-testid="CommentCard" key={i} {...comment} />
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
          {comments.slice(0, maxInitailComments).map((comment, i) => (
            <PostCommentCard key={i} {...comment} />
          ))}
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
    </>
  );
};
