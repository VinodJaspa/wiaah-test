import {
  AspectRatio,
  Avatar,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { useShareWithModal, useGetShareWithFriends } from "ui";
import { SpinnerFallback } from "../../FallbackDisplays";

export interface ShareWithModalProps {}

export const ShareWithModal: React.FC<ShareWithModalProps> = ({}) => {
  const { postId, cancelShare } = useShareWithModal();
  const { t } = useTranslation();

  const [messageValue, setMessageValue] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const { data, isLoading, isError } = useGetShareWithFriends(search);
  const [filtered, setFiltered] = React.useState<typeof data>([]);

  const [shareWith, setShareWith] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (data) {
      setFiltered(data.filter(({ name }) => name.includes(search)));
    }
  }, [search]);

  function handleAddToShareList(userId: string) {
    setShareWith((state) => [...state, userId]);
  }
  function handleRemoveFromShareList(userId: string) {
    setShareWith((state) => state.filter((user) => user !== userId));
  }

  return (
    <Modal
      size={"xl"}
      autoFocus={false}
      isOpen={!!postId}
      onClose={cancelShare}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{t("share_with", "Share with")}</Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Flex direction={"column"} gap="1rem">
            <Input
              variant={"flushed"}
              borderBottomWidth="0.1em"
              borderColor={"lightgray"}
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              placeholder={`${t("write_a_message", "Write a message")}...`}
            />
            <InputGroup>
              <InputLeftElement w="auto">
                <Icon as={HiSearch} />
              </InputLeftElement>
              <Input
                variant={"flushed"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderBottomWidth="0.1em"
                borderColor={"lightgray"}
                placeholder={t("search", "Search")}
              />
            </InputGroup>
            <Flex
              gap="1rem"
              maxH={"20rem"}
              overflowY="scroll"
              className="thinScroll"
              direction={"column"}
            >
              <SpinnerFallback isLoading={isLoading} isError={isError}>
                {filtered &&
                  filtered.map((user, idx) => (
                    <HStack key={user.id + idx}>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? handleAddToShareList(user.id)
                            : handleRemoveFromShareList(user.id);
                        }}
                        borderColor={"black"}
                      />
                      <AspectRatio w="3rem" ratio={1 / 1}>
                        <Image
                          bgColor={"black"}
                          objectFit="contain"
                          w="100%"
                          h="100%"
                          rounded={"lg"}
                          src={user.photo}
                        />
                      </AspectRatio>
                      <Text>{user.name}</Text>
                    </HStack>
                  ))}
              </SpinnerFallback>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter gap={"0.5rem"}>
          <Button>{t("share", "Share")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
