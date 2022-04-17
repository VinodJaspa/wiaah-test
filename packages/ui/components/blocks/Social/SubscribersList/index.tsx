import React from "react";
import { Flex, Input, Divider, VStack } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { SubscribersUserInfo } from "types/market/Social";
import { SubscriberCard } from "ui";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
          <SubscriberCard key={user.id} {...user} />
        ))}
      </VStack>
    </Flex>
  );
};

export default SubscribersList;
