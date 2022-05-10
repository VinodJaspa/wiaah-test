import {
  Flex,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { useNewMessage, useUserData, Avatar } from "ui";
import { useQuery } from "react-query";
import { ChatNewMessageUserInfo } from "types";
import { Form } from "formik";

const suggestedUsersPH: ChatNewMessageUserInfo[] = [
  {
    id: "1",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop.jpeg",
    username: "username",
  },
  {
    id: "2",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-2.jpeg",
    username: "username",
  },
  {
    id: "3",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "username",
  },
  {
    id: "4",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop.jpeg",
    username: "username",
  },
  {
    id: "5",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-2.jpeg",
    username: "username",
  },
  {
    id: "6",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "username",
  },
];

async function getSuggestedUsers({
  queryKey,
}: any): Promise<ChatNewMessageUserInfo[]> {
  return suggestedUsersPH;
}

export const NewMessageModal: React.FC = () => {
  const { user } = useUserData();
  const { closeModal, isOpen } = useNewMessage();
  const { t } = useTranslation();
  const [suggestedUserSelect, setSuggestedUserSelect] =
    React.useState<string>("");
  const {
    data: suggestedUsers,
    isLoading,
    isError,
  } = useQuery(
    ["NewMessageSuggestedUsers", { userId: user?.id }],
    getSuggestedUsers,
    {
      enabled: !!user,
    }
  );

  if (!user) return null;

  return (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"} h={"80%"}>
        <ModalHeader
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            variant={"icon"}
            fontSize="xx-large"
            aria-label={t("close_new_message_modal", "close new message modal")}
            as={MdClose}
            onClick={closeModal}
          />
          <Text fontSize={"1.2em"} fontWeight={"bold"}>
            {t("new_message", "New Message")}
          </Text>
          <Text color="primary.main">{t("next", "Next")}</Text>
        </ModalHeader>
        <ModalBody
          h="100%"
          overflow="scroll"
          className="thinScroll"
          fontSize={"x-large"}
          px="0px"
        >
          <HStack pl="2rem" h="5rem" borderWidth={"1px"} borderColor="gray.400">
            <Text fontWeight="bold">{t("to", "To")}:</Text>
            <Input
              h="100%"
              fontSize={"x-large"}
              placeholder={`${t("search", "Search")}...`}
              border={"none"}
            />
          </HStack>
          <RadioGroup
            onChange={setSuggestedUserSelect}
            value={suggestedUserSelect}
          >
            <Flex py="0.5rem" gap="1rem" px="2rem" direction={"column"}>
              <Text my="0.5rem" fontWeight={"bold"}>
                {t("suggested", "Suggested")}
              </Text>
              <Flex gap="1rem" direction={"column"}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  suggestedUsers &&
                  suggestedUsers.map((user, i) => (
                    <HStack w="100%" justify={"space-between"}>
                      <HStack>
                        <Avatar
                          size={"lg"}
                          name={user.username}
                          photoSrc={user.userPhoto}
                          key={i}
                        />
                        <VStack
                          spacing={"0px"}
                          align={"start"}
                          justify={"space-between"}
                          h="100%"
                        >
                          <Text fontWeight={"bold"}>{user.username}</Text>
                        </VStack>
                      </HStack>
                      <Radio
                        type="radio"
                        value={user.id}
                        colorScheme={"primary"}
                        size={"lg"}
                      />
                    </HStack>
                  ))
                )}
              </Flex>
            </Flex>
          </RadioGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
