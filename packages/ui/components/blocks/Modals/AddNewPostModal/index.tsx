import {
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNewPost } from "ui/Hooks";
import { FloatingContainer, Avatar, useUserData } from "ui";
import { MdClose, MdPlace } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { BsFlagFill } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import { TranslationText } from "types";
import { IconType } from "react-icons";
import { CgPlayButtonR } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoVideocamOutline } from "react-icons/io5";

export interface AddNewPostModalProps {}

// const additionalOptions: {
//   optName: TranslationText;
//   fillColor?: string;
//   optIcon: IconType;
//   size?: string;
// }[] = [
//   {
//     optName: {
//       translationKey: "add_image",
//       fallbackText: "Add Image",
//     },
//     optIcon: BiImage,
//     fillColor: "primary.main",
//     size: "1.2em",
//   },
//   {
//     optName: {
//       fallbackText: "Mention friend",
//       translationKey: "mention_friend",
//     },
//     optIcon: FaUserPlus,
//     fillColor: "blue",
//   },
//   {
//     optName: {
//       fallbackText: "Add Emoji",
//       translationKey: "add_emoji",
//     },
//     optIcon: BsEmojiSmile,
//     fillColor: "#f5d02c",
//   },
//   {
//     optName: {
//       fallbackText: "Add Location",
//       translationKey: "add_location",
//     },
//     optIcon: MdPlace,
//     fillColor: "red",
//     size: "1.2em",
//   },
//   {
//     optName: {
//       fallbackText: "Flag",
//       translationKey: "flag",
//     },
//     optIcon: BsFlagFill,
//     fillColor: "#0390fc",
//   },
// ];

export const AddNewPostModal: React.FC<AddNewPostModalProps> = () => {
  const { isOpen, CloseModal } = useNewPost();
  const { user } = useUserData();
  const { t } = useTranslation();
  return user ? (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={CloseModal}
    >
      <ModalOverlay />
      <ModalHeader></ModalHeader>
      <ModalContent maxW="container.md">
        <ModalBody fontSize={"normal"}>
          <Flex direction={"column"} py="1rem" gap="1rem">
            <FloatingContainer
              items={[
                {
                  label: (
                    <IconButton
                      fontSize={"xx-large"}
                      colorScheme={"gray"}
                      color="gray.900"
                      rounded={"full"}
                      bgColor="gray.200"
                      aria-label="close new post modal"
                      icon={<Icon as={MdClose} />}
                      onClick={CloseModal}
                    />
                  ),
                  right: true,
                  top: "center",
                  floatingItemProps: {
                    translateY: "-50%",
                  },
                },
              ]}
            >
              <Text
                justifySelf={"flex-end"}
                fontSize="xx-large"
                fontWeight={"extrabold"}
                textAlign="center"
              >
                {t("create_post", "Create Post")}
              </Text>
            </FloatingContainer>
            <Divider borderColor={"gray.500"} />
            <HStack>
              <Avatar size={"lg"} name={user.name} photoSrc={user.photoSrc} />
              <VStack>
                <Text fontSize={"x-large"}>{user.name}</Text>
              </VStack>
            </HStack>
            <Flex gap="1rem" direction={"column"} w="100%">
              <Textarea
                fontSize={"xx-large"}
                minH="15rem"
                w="100%"
                resize={"none"}
                placeholder={`${t(
                  "what's_on_your_mind",
                  "What's on your mind"
                )}, ${user.name}?`}
              />
              <HStack
                w="100%"
                justify={"center"}
                spacing="2rem"
                fontSize={"xx-large"}
              >
                <Icon
                  cursor={"pointer"}
                  fontSize={"1.3em"}
                  fill="crimson"
                  data-testid="AttachPhotoBtn"
                  as={BiImage}
                />
                <Icon
                  cursor={"pointer"}
                  fontSize={"1.3em"}
                  color="yellow.300"
                  data-testid="AttachVideoBtn"
                  as={IoVideocamOutline}
                />
                <Icon
                  cursor={"pointer"}
                  color="blue.500"
                  data-testid="AddPostLocationBtn"
                  as={HiOutlineLocationMarker}
                />
                <Icon
                  data-testid="AddStatusBtn"
                  cursor={"pointer"}
                  fill="purple.600"
                  as={BsEmojiSmile}
                />
                <Icon
                  data-testid="AttachActionBtn"
                  cursor={"pointer"}
                  color="primary.main"
                  as={CgPlayButtonR}
                />
              </HStack>
              {/* <HStack
                borderWidth={"1px"}
                borderColor={"gray.500"}
                p="0.5rem"
                rounded={"lg"}
                spacing={"1rem"}
                fontSize={"xx-large"}
                w="100%"
                justify={"center"}
              >
                {additionalOptions.map((icon, i) => (
                  <Icon
                    color={icon.fillColor}
                    cursor={"pointer"}
                    fontSize={icon.size}
                    as={icon.optIcon}
                    key={i}
                  />
                ))}
              </HStack> */}
              <Button
                py={"1rem"}
                height="auto"
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "lg", lg: "xl", xl: "xx-large" }}
              >
                {t("post", "Post")}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null;
};
