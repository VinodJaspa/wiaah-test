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
import { StorySeenByUserInfo } from "types/market/Social";

export interface StorySeenByPopupProps {
  storyId: String;
}

export const StorySeenByPopup: React.FC<StorySeenByPopupProps> = ({}) => {
  const { t } = useTranslation();
  const [userFilter, setUserFilter] = React.useState<string>("");
  const [Users, setUsers] = React.useState<StorySeenByUserInfo[]>([]);
  const { CloseStorySeenBy, isOpen, users } = useStorySeenBy();

  React.useEffect(() => {
    setUsers(users.filter((user) => user.name.includes(userFilter)));
  }, [users, userFilter]);

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
                data-testid="CloseModalBtn"
                cursor={"pointer"}
                onClick={CloseStorySeenBy}
                as={MdClose}
              />
            </Flex>
          </ModalHeader>
          <ModalBody px="0.5rem">
            <Flex gap="1rem" direction={"column"}>
              <Input
                data-testid="SearchUserInput"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                variant={"flushed"}
                placeholder={t("search", "search")}
              />
              <Flex
                maxH="30rem"
                overflowY={"scroll"}
                className="thinScroll"
                direction={"column"}
                data-testid="UsersListContainer"
              >
                {Users.map((user, i) => (
                  <HStack data-testid="UserCard" fontSize={"lg"} key={i}>
                    <Avatar
                      size={"lg"}
                      name={user.name}
                      photoSrc={user.photoSrc}
                    />
                    <Text data-testid="Username">{user.name}</Text>
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
