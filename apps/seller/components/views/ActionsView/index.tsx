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
import {
  ActionHeader,
  Avatar,
  FloatingContainer,
  PostViewPopup,
  useActionComments,
} from "ui";
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
import { VerticalCarousel, PostAttachment } from "ui";
import { useResponsive } from "ui";
import { CgPlayButtonR } from "react-icons/cg";
import { useRouter } from "next/router";
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
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Flex
      bgColor={"white"}
      w="100%"
      h="100vh"
      overflow={"hidden"}
      direction="column"
      align="center"
    >
      {/* <Text textTransform={"capitalize"} fontSize={"4xl"} fontWeight="bold">
        {t("action", "action")}
      </Text> */}
      <PostViewPopup
        fetcher={async ({ queryKey }) => {
          const id = queryKey[1].postId;
          const action = actionsPlaceholders.find((post) => post.id === id);
          return action ? action : null;
        }}
        queryName="action"
        idParam="actionId"
        renderChild={(props: SocialActionData) => {
          return <ActionViewer action={props} />;
        }}
      />

      <Flex
        h="100%"
        // w={{ base: "100%", sm: "container.sm", md: "25rem" }}
        overflow="hidden"
      >
        {/* actions View */}
        <VerticalCarousel>
          {actionsPlaceholders.map((action, i) => (
            <ActionViewer
              onActionClick={(id) => {
                router.push(
                  router.pathname,
                  { query: { actionId: id } },
                  { shallow: true }
                );
              }}
              action={action}
              key={i}
            />
          ))}
        </VerticalCarousel>
      </Flex>
      {/* </FloatingContainer> */}
    </Flex>
  );
};

export interface ActionsViewerProps {
  action: SocialActionData;
  play?: boolean;
  onActionClick?: (actionId: string) => any;
  dark?: boolean;
}

export const ActionViewer: React.FC<ActionsViewerProps> = ({
  action,
  play,
  onActionClick,
  dark,
}) => {
  const { ToggleComments } = useActionComments();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  return (
    <>
      {action && (
        <FloatingContainer
          h="100%"
          maxW="35rem"
          pr="6rem"
          items={[
            {
              label: (
                <Flex
                  justify={"center"}
                  px="0.25"
                  textAlign={"center"}
                  gap="0.5rem"
                  direction={"column"}
                  color={dark ? "white" : "black"}
                  bg={dark && "blackAlpha.300"}
                  rounded="full"
                  fontSize={{ base: "6xl", md: "7xl" }}
                >
                  <VStack spacing="0rem">
                    <Icon as={HiHeart} />
                    <Text fontSize={"lg"}>1.5k</Text>
                  </VStack>
                  <VStack onClick={ToggleComments} spacing="0rem">
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
              ),
              right: "0.5rem",
              top: "center",
              floatingItemProps: {
                translateY: "-50%",
              },
            },
          ]}
        >
          <Flex
            gap="0.5rem"
            // py={i !== 0 && "3rem"}
            alignSelf={"flex-start"}
            h={"100%"}
            direction={"column"}
            onClick={() => onActionClick && onActionClick(action.id)}
          >
            <FloatingContainer
              pointerEvents={"none"}
              h="100%"
              w="100%"
              display={"flex"}
              alignItems="center"
              items={[
                {
                  label: (
                    <ActionHeader
                      // bgColor={""}
                      w="100%"
                      p="0.5rem"
                      bgGradient="linear(to-t, blackAlpha.500 80%,transparent)"
                      color="white"
                      minH={"max-content"}
                      actionHashtags={[]}
                      actionTitle={action.title}
                      userName={action.user.name}
                      userThumbnail={action.user.thumbnail}
                      actionLocation={"Los Angeles"}
                    />
                  ),
                  bottom: true,
                  left: true,
                  floatingItemProps: {
                    w: "100%",
                  },
                },
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
                  top: "1rem",
                  right: "1rem",
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
                  top: "1rem",
                  left: "1rem",
                },
                {
                  label: (
                    <Icon
                      fontSize={"xx-large"}
                      color="white"
                      as={CgPlayButtonR}
                    />
                  ),
                  top: "3.5rem",
                  right: "1rem",
                },
              ]}
            >
              <PostAttachment
                controls={false}
                autoPlay
                play={play}
                type={action.storyType !== "text" ? action.storyType : "image"}
                src={action.storySrc}
                {...action}
              />
            </FloatingContainer>
          </Flex>
        </FloatingContainer>
      )}
    </>
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
