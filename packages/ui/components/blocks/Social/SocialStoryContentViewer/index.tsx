import { Flex, Image, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { SocialStoryContentData } from "types/market/Social";
import {
  useStory,
  useTimer,
  CurrentStoryProgressState,
  PostAttachment,
} from "ui";
import {
  ActionPostStory,
  AffiliationPostStory,
  NewsFeedPostStory,
  ShopPostStory,
} from "../../DataDisplay/StoryDisplays";

export interface SocialStoryContentViewerProps extends SocialStoryContentData {
  play?: boolean;
  onProgress?: (progress: number) => any;
  onFinish?: () => any;
}
export const SocialStoryContentViewer: React.FC<SocialStoryContentViewerProps> =
  ({ storyType, storySrc, storyText, play, id }) => {
    const { nextStory } = useStory();
    const setCurrentStoryProgress = useSetRecoilState(
      CurrentStoryProgressState
    );
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
      if (videoRef.current) {
        if (play) {
          videoRef.current.play();
        } else {
          videoRef.current.currentTime = 0;
          videoRef.current.pause();
        }
      }
      if (play) {
        useTimer(7, setCurrentStoryProgress, 200, nextStory);
      }
    }, [play]);

    const Content = () => {
      switch (storyType) {
        case "image":
          return <PostAttachment src={storySrc} type={storyType} />;
        case "video":
          return (
            <Box>
              <video
                ref={videoRef}
                style={{ maxHeight: "100%", objectFit: "contain" }}
                src={storySrc}
              />
            </Box>
          );
        case "newsFeedPost":
          return <NewsFeedPostStory postId={id} />;
        case "shopPost":
          return <ShopPostStory id={id} />;
        case "affiliationPost":
          return <AffiliationPostStory postId={id} />;
        case "action":
          return <ActionPostStory postId={id} />;
        default:
          return null;
      }
    };
    return (
      <Flex
        // maxW="container.md"
        direction={"column"}
        align={"center"}
        maxW="100%"
        maxH="100%"
        justify={"center"}
      >
        {storyText && (
          // <Flex
          //   w="100%"
          //   justify={"center"}
          //   align="center"
          // >
          <Text
            w="100%"
            textAlign={"center"}
            fontWeight={"bold"}
            py="1rem"
            fontSize={storyType === "text" ? "xx-large" : "lg"}
          >
            {storyText}
          </Text>
          // </Flex>
        )}
        {Content()}
      </Flex>
    );
  };
