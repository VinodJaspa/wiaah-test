import React from "react";
import { PostAttachment, ProfileInfo } from "types";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { ActionHeader, ActionHeaderProps } from "ui";
import { PostAttachmentsViewer } from "../PostAttachmentsViewer";
import { useRouter } from "next/router";

export interface PlaceCardProps {
  user: ProfileInfo;
  placeAttachments: PostAttachment[];
  placeLocation?: string;
  placeType?: string;
  openFrom?: string;
  openTo?: string;
  fixedHeight?: string;
  headerProps?: Partial<ActionHeaderProps>;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  placeAttachments,
  placeLocation,
  placeType,
  user,
  fixedHeight,
  openFrom,
  openTo,
  headerProps,
}) => {
  const router = useRouter();
  return (
    <Box
      bg="black"
      w="100%"
      maxW="30rem"
      h={fixedHeight ? fixedHeight : "auto"}
      position={"relative"}
      overflow="hidden"
      rounded="xl"
    >
      <PostAttachmentsViewer attachments={placeAttachments} />
      {openFrom && openTo && (
        <Flex
          position={"absolute"}
          top="50%"
          left="0px"
          justify={"center"}
          color={"white"}
          transform="auto"
          translateY={"-50%"}
          w="100%"
          bg="blackAlpha.400"
          fontSize={"x-large"}
          fontWeight="bold"
          gap="0.25rem"
        >
          <HStack>
            <Text>{openFrom}</Text>
          </HStack>
          <Text>-</Text>
          <HStack>
            <Text>{openTo}</Text>
          </HStack>
        </Flex>
      )}
      {user && (
        <ActionHeader
          {...headerProps}
          position={"absolute"}
          left="0px"
          bottom="0px"
          w="100%"
          p="0.5rem"
          bgGradient="linear(to-t, blackAlpha.500 80%,transparent)"
          color="white"
          minH={"max-content"}
          subName={placeType}
          actionHashtags={[]}
          userName={user.name || ""}
          userThumbnail={user.thumbnail || ""}
          actionLocation={placeLocation}
          onProfileClick={(profileName) => router.push(`/shop/${profileName}`)}
          onTitleClick={(title) => router.push(`/places?tag=${title}`)}
          onLocationClick={(location) =>
            router.push(`/localisation?tag=${location}`)
          }
        />
      )}
    </Box>
  );
};
