import { Flex, VStack, Icon, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiVolumeFull } from "react-icons/bi";
import { BsPlayFill } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import {
  HiHeart,
  HiOutlineChat,
  HiShare,
  HiDotsHorizontal,
} from "react-icons/hi";
import { SocialActionData } from "types";
import {
  useActionComments,
  useResponsive,
  PostAttachment,
  ActionHeader,
  FloatingContainer,
} from "ui";

export interface ActionsViewerProps {
  action: SocialActionData;
  play?: boolean;
  onActionClick?: (actionId: string) => any;
  dark?: boolean;
  interactionPos?: "in" | "out";
  muteIcon?: boolean;
  playIcon?: boolean;
}

export const ActionViewer: React.FC<ActionsViewerProps> = ({
  action,
  play,
  onActionClick,
  dark,
  muteIcon,
  playIcon,
  interactionPos = "out",
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
          pr={interactionPos === "in" ? "0rem" : "6rem"}
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
                  bg={dark ? "blackAlpha.300" : undefined}
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
                      visibility={muteIcon ? "unset" : "hidden"}
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
                      visibility={playIcon ? "unset" : "hidden"}
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
                  top: muteIcon ? "3.5rem" : "1rem",
                  right: "1rem",
                },
              ]}
            >
              <PostAttachment
                controls={false}
                autoPlay
                play={play}
                type={action.storyType !== "text" ? action.storyType : "image"}
                src={action.storySrc || ""}
                {...action}
              />
            </FloatingContainer>
          </Flex>
        </FloatingContainer>
      )}
    </>
  );
};
