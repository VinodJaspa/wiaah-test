import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  Flex,
  Textarea,
  HStack,
  Box,
  IconButton,
  Icon,
  Button,
} from "@chakra-ui/react";
import { BiImageAlt } from "react-icons/bi";
import { IoVideocam } from "react-icons/io5";
import { Avatar } from "ui";
import React from "react";
import { MdClose } from "react-icons/md";
import { t } from "i18next";

export interface AddNewStoryModalProps {}

const colors: string[] = [
  "red",
  "blue",
  "yellow",
  "purple",
  "green",
  "cyan",
  "gray",
  "lime",
];

export const AddNewStoryModal: React.FC<AddNewStoryModalProps> = () => {
  return (
    <Modal isCentered isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex gap="2rem" w="100%" direction={"column"}>
            <Flex w="100%">
              <Avatar
                justifySelf={"center"}
                name="wiaah"
                size="lg"
                photoSrc="/wiaah_logo.png"
              />
              <IconButton
                // onClick={handlePostViewClose}
                p="0rem"
                fontSize={"xx-large"}
                colorScheme={"blackAlpha"}
                bgColor="transparent"
                aria-label="Close new post modal"
                icon={<Icon as={MdClose} />}
              />
            </Flex>
            <Textarea
              h="15rem"
              w="100%"
              placeholder="type something cool to share"
            />

            <HStack spacing="1rem">
              {colors.map((color, i) => (
                <Box key={i} p="1rem" rounded="full" bgColor={color}></Box>
              ))}
            </HStack>
            <Flex w="100%" justify={"space-between"}>
              <HStack spacing="1rem">
                <Icon
                  cursor={"pointer"}
                  fontSize={"x-large"}
                  fill="primary.main"
                  data-testid="AttachPhotoBtn"
                  as={BiImageAlt}
                />
                <Icon
                  cursor={"pointer"}
                  fontSize={"x-large"}
                  color="primary.main"
                  data-testid="AttachVideoBtn"
                  as={IoVideocam}
                />
              </HStack>
              <Button textTransform={"capitalize"}>{t("post", "post")}</Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
