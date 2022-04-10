import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { PostAttachment as PostAttachmentType } from "types/market/Social";
export interface PostAttachmentProps extends PostAttachmentType {
  alt?: string;
}

export const PostAttachment: React.FC<PostAttachmentProps> = ({
  type,
  src,
  alt,
}) => {
  const [playing, setPlaying] = React.useState<boolean>(false);

  function handlePlay() {
    setPlaying(true);
  }
  function handlePause() {
    setPlaying(false);
  }

  switch (type) {
    case "image":
      return <Image alt={alt && alt} src={src} />;

    case "video":
      return (
        <Box position={"relative"} w="100%" h={"auto"}>
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
            onPause={handlePause}
            onPlay={handlePlay}
            controls
            width={"100%"}
            height="auto"
            src={src}
          />
        </Box>
      );
  }
};
