import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { PostAttachment as PostAttachmentType } from "types/market/Social";

export interface PostAttachmentProps extends PostAttachmentType {
  alt?: string;
  fixedSize?: boolean;
}

export const PostAttachment: React.FC<PostAttachmentProps> = ({
  type = "image",
  src,
  alt,
  fixedSize,
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
      return (
        <Image
          objectFit={fixedSize ? "cover" : "initial"}
          w="100%"
          h="100%"
          alt={alt && alt}
          src={src}
          data-testid="PostAttachmentImage"
        />
      );

    case "video":
      return (
        <Flex
          overflow={fixedSize ? "clip" : "auto"}
          position={"relative"}
          w="100%"
          h={"100%"}
          align={"center"}
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
            className="object-cover"
            onPause={handlePause}
            onPlay={handlePlay}
            controls
            data-testid="PostAttachmentVideo"
            width={"100%"}
            height={"100%"}
            src={src}
          />
        </Flex>
      );
  }
};
