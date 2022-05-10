import { Box, Center, Flex, FlexProps, Icon, Image } from "@chakra-ui/react";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { PostAttachment as PostAttachmentType } from "types/market/Social";
import { HiDuplicate } from "react-icons/hi";
export interface PostAttachmentProps extends PostAttachmentType {
  alt?: string;
  fixedSize?: boolean;
  play?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  footer?: React.ReactElement;
  style?: FlexProps;
  minimal?: boolean;
  blur?: boolean;
  multiply?: boolean;
  cover?: boolean;
}

export const PostAttachment: React.FC<PostAttachmentProps> = ({
  type = "image",
  src,
  alt,
  fixedSize,
  play,
  autoPlay,
  controls = true,
  footer,
  style,
  minimal,
  blur,
  multiply,
  cover,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (videoRef.current) {
      if (play && autoPlay) {
        videoRef.current.play();
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
    // router.push("localhost:3002/social/wiaah/newsfeed-post/15");
  }

  switch (type) {
    case "image":
      return (
        //@ts-ignore
        <Flex
          justify={"center"}
          align="center"
          w="100%"
          h="100%"
          overflow={"hidden"}
          position={"relative"}
          {...style}
        >
          {multiply && (
            <Center
              position={"absolute"}
              zIndex={2}
              color="white"
              fill={"white"}
              bgColor="blackAlpha.500"
              rounded={"xl"}
              h="2.75rem"
              w="2.75rem"
              top="0.5rem"
              left="0.5rem"
              fontSize={"xx-large"}
            >
              <Icon as={HiDuplicate} />
            </Center>
          )}
          {blur && (
            <Image
              objectFit={"cover"}
              position="absolute"
              filter="blur(0.8rem)"
              w="100%"
              h={"100%"}
              alt={alt && alt}
              src={src}
              data-testid="PostAttachmentBlurImage"
            />
          )}
          <Image
            objectFit={cover ? "cover" : "contain"}
            maxW="100%"
            maxH={"100%"}
            position={blur ? "absolute" : undefined}
            // zIndex={1}
            alt={alt && alt}
            src={src}
            data-testid="PostAttachmentImage"
            onClick={handleGoToPost}
          />
          {footer && (
            <Box
              bgGradient="linear(to-t, blackAlpha.500 80%,transparent)"
              w="100%"
              bottom="0px"
              left="0px"
              zIndex={5}
              position={"absolute"}
            >
              {footer}
            </Box>
          )}
        </Flex>
      );

    case "video":
      return (
        //@ts-ignore
        <Flex
          overflow={fixedSize ? "clip" : "auto"}
          position={"relative"}
          w="100%"
          h="100%"
          align={"center"}
          justify="center"
          onClick={handleGoToPost}
          {...style}
        >
          {!playing && !autoPlay && !minimal && (
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
          {blur && (
            <video
              ref={videoRef}
              onPause={handlePause}
              onPlay={handlePlay}
              controls={controls}
              data-testid="PostAttachmentVideo"
              style={{
                height: "100%",
                objectFit: "cover",
                width: "100%",
                filter: "blur(0.8rem)",
                position: "absolute",
              }}
              src={src}
            />
          )}
          <video
            ref={videoRef}
            onPause={handlePause}
            onPlay={handlePlay}
            controls={controls}
            data-testid="PostAttachmentVideo"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              position: blur ? "absolute" : undefined,
              zIndex: 0,
            }}
            src={src}
          />
          {footer && (
            <Box
              bgColor="blackAlpha.300"
              w="100%"
              bottom="0px"
              left="0px"
              zIndex={5}
              position={"absolute"}
            >
              {footer}
            </Box>
          )}
        </Flex>
      );
  }
};
