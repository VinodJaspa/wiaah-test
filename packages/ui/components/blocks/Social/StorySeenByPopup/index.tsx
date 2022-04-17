import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  ModalHeader,
  Input,
  Text,
  Icon,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useStorySeenBy, Avatar } from "ui";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
export const StorySeenByPopup: React.FC = () => {
  const { t } = useTranslation();
  const { CloseStorySeenBy, isOpen, users, setStorySeenBy } = useStorySeenBy();

  React.useEffect(() => {}, []);

  return (
    <>
      <Modal
        onClose={CloseStorySeenBy}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        {/* <Modal */}
        <ModalContent mr="1rem">
          <ModalHeader px="0.5rem">
            <Flex justify={"space-between"}>
              <Text textTransform={"capitalize"}>
                {t(
                  "people_who_have_seen_story",
                  "people who have seen this story"
                )}
              </Text>
              <Icon
                cursor={"pointer"}
                onClick={CloseStorySeenBy}
                as={MdClose}
              />
            </Flex>
          </ModalHeader>
          <ModalBody px="0.5rem">
            <Flex gap="1rem" direction={"column"}>
              <Input variant={"flushed"} placeholder={t("search", "search")} />
              <Flex
                maxH="30rem"
                overflowY={"scroll"}
                className="thinScroll"
                direction={"column"}
              >
                {users.map((user, i) => (
                  <HStack fontSize={"lg"} key={i}>
                    <Avatar
                      size={"lg"}
                      name={user.name}
                      photoSrc={user.photoSrc}
                    />
                    <Text>{user.name}</Text>
                  </HStack>
                ))}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
