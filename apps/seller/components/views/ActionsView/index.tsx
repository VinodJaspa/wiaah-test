import {
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { SocialStoryDataWithUser } from "types/market/Social";
import { useTranslation } from "react-i18next";
import { ActionHeader, Avatar, FloatingContainer } from "ui";
import { SocialProfileInfo } from "ui/placeholder/social";
import {
  HiHeart,
  HiThumbDown,
  HiOutlineChat,
  HiShare,
  HiDotsHorizontal,
} from "react-icons/hi";
import { BiVolumeFull } from "react-icons/bi";
import { BsPlayFill } from "react-icons/bs";
import { ActionsDisplay, PostAttachment } from "ui";

// export type ActionPostInteractionsType = {
//   icon:IconType
//   interactionLabel:string
// }

// export const ActionPostInteractions:ActionPostInteractionsType[] = [
//   {
//     icon: HiThumbUp,
//     interactionLabel:"likes"
//   }
// ]

const ActionsPlaceholder = [];

export const ActionsView: React.FC = () => {
  const [active, setActive] = React.useState<number>();
  const { t } = useTranslation();
  return (
    <Flex
      pt="2rem"
      w="100%"
      h="100%"
      justify={"cemter"}
      direction="column"
      align="center"
    >
      <Flex h="50rem" w={{ base: "20rem", md: "25rem" }} overflow="hidden">
        <Flex gap="0.5rem" w="100%" h="40rem">
          {/* actions View */}
          <ActionsDisplay onActiveItemChange={setActive} h="100%">
            {actionsPlaceholders.map(({ storyType, storySrc, ...item }, i) => (
              <Flex
                gap="0.5rem"
                py={i !== 0 && "3rem"}
                h="100%"
                direction={"column"}
              >
                <ActionHeader
                  minH={"max-content"}
                  actionHashtags={[]}
                  actionTitle={item.title}
                  userName={item.user.name}
                  userThumbnail={item.user.thumbnail}
                />
                <FloatingContainer
                  pointerEvents={"none"}
                  items={[
                    {
                      label: (
                        <Icon
                          fontSize={"xx-large"}
                          p="0.25rem"
                          rounded="full"
                          bg="blackAlpha.400"
                          color="white"
                          as={BiVolumeFull}
                        />
                      ),
                      top: "2rem",
                      right: "2rem",
                    },
                    {
                      label: (
                        <Icon
                          fontSize={"xx-large"}
                          p="0.25rem"
                          rounded="full"
                          bg="blackAlpha.400"
                          color="white"
                          as={BsPlayFill}
                        />
                      ),
                      top: "2rem",
                      left: "2rem",
                    },
                  ]}
                >
                  <PostAttachment
                    controls={false}
                    autoPlay
                    play={i === active}
                    key={i}
                    type={storyType !== "text" ? storyType : "image"}
                    src={storySrc}
                    {...item}
                  />
                </FloatingContainer>
              </Flex>
            ))}
          </ActionsDisplay>
        </Flex>
        <Flex
          h="100%"
          justify={"center"}
          px="0.25"
          textAlign={"center"}
          gap="0.5rem"
          direction={"column"}
          fontSize={{ base: "xx-large", md: "7xl" }}
        >
          <VStack spacing="0rem">
            <Icon as={HiHeart} />
            <Text fontSize={"lg"}>1.5k</Text>
          </VStack>
          <VStack spacing="0rem">
            <Icon as={HiOutlineChat} />
            <Text fontSize={"lg"}>500</Text>
          </VStack>
          <VStack spacing="0rem">
            <Icon as={HiShare} />
            <Text fontSize="lg">{t("share", "share")}</Text>
          </VStack>
          <VStack spacing="0rem">
            <Icon as={HiDotsHorizontal} />
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export interface SocialActionData extends SocialStoryDataWithUser {
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  title: string;
}

const actionsPlaceholders: SocialActionData[] = [
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "video",
    storyViews: 1300000,
    storySrc: "/verticalVideo.mp4",
    id: "5",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "image",
    storyViews: 12300,
    storySrc: "/verticalImage.jpg",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    id: "3",

    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "image",
    storyViews: 1900,
    storySrc: "/shop-2.jpeg",
    id: "2",
    storyText: "image story with text",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,

    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "image",
    storyViews: 12300,
    storySrc: "/verticalImage.jpg",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    id: "3",

    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "video",
    storyViews: 500,
    storySrc: "/video.mp4",
    storyText: "video story with Text",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    id: "4",

    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];
