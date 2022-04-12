import React from "react";
import {
  Flex,
  Input,
  Avatar,
  Text,
  Button,
  Icon,
  Divider,
  VStack,
  Box,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { SubscribersUserInfo } from "types/market/Social";
import { t } from "i18next";

export interface SubscribersListProps {
  users: SubscribersUserInfo[];
  title?: string;
  onClose?: () => void;
}

export const SubscribersList: React.FC<SubscribersListProps> = ({
  users,
  onClose,
  title,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }
  return (
    <Flex
      direction={"column"}
      align="end"
      bg="white"
      px="0.5rem"
      maxH={"40rem"}
      w={"100%"}
      overflowY="scroll"
      gap="0.5rem"
      className="thinScroll"
    >
      <Input
        py="1rem"
        shadow={"md"}
        placeholder={t("search", "Search")}
        value={searchValue}
        onChange={handleChange}
      />
      <VStack
        divider={<Divider />}
        h="100%"
        w="100%"
        py="0.5rem"
        direction={"column"}
      >
        {users.map((user, i) => (
          <Flex gap="1rem" w="100%" justify={"space-between"}>
            <Flex gap="0.5rem">
              <Avatar name={user.name} src={user.avatar} />
              <Text fontWeight={"semibold"}>{user.name}</Text>
            </Flex>
            <Button
              rounded={"full"}
              color={"white"}
              _hover={{ backgroundColor: "primary.hover" }}
              _focus={{ ring: "0" }}
              backgroundColor={"primary.main"}
            >
              {t("follow", "Follow")}
            </Button>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};

export default SubscribersList;
