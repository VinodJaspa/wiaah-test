import {
  AspectRatio,
  Box,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { FloatingContainer, FloatingContainerProps } from "ui";
import { useResponsive } from "ui/hooks";
export type StoryUserData = {
  name: string;
  userPhotoSrc: string;
};

export interface StoryDisplayProps {
  storyUserData: StoryUserData;
  seen?: boolean;
  floatingIcon?: FloatingContainerProps;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({
  storyUserData,
  seen,
  floatingIcon,
}) => {
  const { isMobile } = useResponsive();
  return (
    <VStack spacing="0.5rem">
      <FloatingContainer {...floatingIcon}>
        <Box
          // ratio={1 / 1}
          w={isMobile ? "3.5rem" : "10rem"}
          h={isMobile ? "3.5rem" : "10rem"}
          rounded={"xl"}
          bgGradient="linear(to-r, primary.200, primary.700)"
          p={seen ? "0.0625rem" : "0.125rem"}
        >
          <Box w="100%" h="100%" rounded="inherit" bg="white" p="0.125rem">
            <Image
              w="100%"
              h="100%"
              rounded={"inherit"}
              objectFit={"cover"}
              src={storyUserData.userPhotoSrc}
            />
          </Box>
        </Box>
      </FloatingContainer>
      <Text fontSize={{ base: "md", md: "xl" }}>{storyUserData.name}</Text>
    </VStack>
  );
};
