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
  openDays?: string[];
  fixedHeight?: string;
  headerProps?: Partial<ActionHeaderProps>;
}

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const PlaceCard: React.FC<PlaceCardProps> = ({
  placeAttachments,
  placeLocation,
  placeType,
  user,
  fixedHeight,
  openFrom,
  openTo,
  headerProps,
  openDays,
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
          direction="column"
          align={"center"}
          top="50%"
          left="0px"
          justify={"center"}
          color={"white"}
          transform="auto"
          translateY={"-50%"}
          w="100%"
          bg="blackAlpha.600"
          fontSize={"x-large"}
          fontWeight="bold"
          gap="0.25rem"
        >
          <HStack>
            <HStack>
              <Text>{openFrom}</Text>
            </HStack>
            <Text>-</Text>
            <HStack>
              <Text>{openTo}</Text>
            </HStack>
          </HStack>
          {openDays && (
            <HStack fontWeight={"normal"}>
              <HStack>
                <Text fontWeight={"bold"} color="primary.main">
                  Open
                </Text>
                {/* <Text color="#f53858">Closed</Text>
                <Text textTransform={"capitalize"}>
                  opens on friday 10:00 AM
                </Text> */}
              </HStack>
              {/* {weekdays.map((day,i)=>{

             const dayFound = openDays.findIndex((openDay:string)=> openDay.toLocaleLowerCase() === day.toLocaleLowerCase())
            return (
                <Text textTransform={"capitalize"} color={dayFound > -1 ? "primary.main" : "whiteAlpha.900"}>
                {day.substring(0,2)}
              </Text>
            )
          }
            )} */}
            </HStack>
          )}
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
