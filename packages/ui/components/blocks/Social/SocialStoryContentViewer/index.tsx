import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { SocialStoryContentData } from "types/market/Social";
import { useStory, useTimer } from "ui/Hooks";
import { CurrentStoryProgressState } from "ui/state";

export interface SocialStoryContentViewerProps extends SocialStoryContentData {
  play?: boolean;
  onProgress?: (progress: number) => any;
  onFinish?: () => any;
}
export const SocialStoryContentViewer: React.FC<SocialStoryContentViewerProps> =
  ({ storyType, storySrc, storyText, play }) => {
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

    // function handleProgress(progress: number) {
    //   console.log(progress);
    //   onProgress && onProgress(progress);
    // }

    const Content = () => {
      switch (storyType) {
        case "image":
          return (
            <Image
              pointerEvents={"none"}
              w="100%"
              maxH="100%"
              objectFit={"contain"}
              src={storySrc}
            />
          );
        case "video":
          return (
            <video
              ref={videoRef}
              style={{ maxHeight: "100%", objectFit: "contain" }}
              src={storySrc}
            />
          );
        default:
          return null;
      }
    };
    return (
      <Flex
        maxW="container.md"
        direction={"column"}
        align={"center"}
        w="100%"
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
