import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { PostAttachment as PostAttachmentType } from "types/market/Social";
import { useRouter } from "next/router";
export interface PostAttachmentProps extends PostAttachmentType {
  alt?: string;
  fixedSize?: boolean;
  play?: boolean;
}

export const PostAttachment: React.FC<PostAttachmentProps> = ({
  type = "image",
  src,
  alt,
  fixedSize,
  play,
}) => {
  const router = useRouter();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (videoRef.current) {
      if (play) {
        // do something if this is the current showing attachment
      } else {
        videoRef.current.pause();
      }
    }
  }, [play]);

  function handlePlay() {
    setPlaying(true);
  }
  function handlePause() {
    setPlaying(false);
  }

  function handleGoToPost() {
    router.push("localhost:3002/social/wiaah/newsfeed-post/15");
  }

  switch (type) {
    case "image":
      return (
        <Image
          objectFit={"contain"}
          w="100%"
          h={"100%"}
          alt={alt && alt}
          src={src}
          data-testid="PostAttachmentImage"
          onClick={handleGoToPost}
        />
      );

    case "video":
      return (
        <Flex
          overflow={fixedSize ? "clip" : "auto"}
          position={"relative"}
          w="100%"
          align={"center"}
          onClick={handleGoToPost}
        >
          {!playing && (
            <Flex
              position={"absolute"}
              top="0%"
              left="0%"
              w="100%"
              height={"100%"}
              pointerEvents="none"
              justify={"center"}
              align="center"
            >
              <Box
                w="fit-content"
                p="1rem"
                bg="white"
                fontSize={"3rem"}
                rounded="100%"
              >
                <BsPlayFill />
              </Box>
            </Flex>
          )}
          <video
            ref={videoRef}
            onPause={handlePause}
            onPlay={handlePlay}
            controls
            data-testid="PostAttachmentVideo"
            width={"100%"}
            height={"auto"}
            src={src}
          />
        </Flex>
      );
  }
};
