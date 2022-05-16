import {
  Flex,
  HStack,
  Text,
  Avatar,
  Select,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BlocklistUserInfo } from "types";

export interface BlocklistSectionProps {}

export const BlocklistSection: React.FC<BlocklistSectionProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <Flex h="full" w="100%" gap="2rem" direction={"column"}>
      <Text fontWeight={"bold"} fontSize={"xx-large"}>
        {t("block_list", "Block List")}
      </Text>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form className="h-full">
            <Flex h="100%" direction={"column"} justify={"space-between"}>
              <Flex gap="1rem" direction={"column"}>
                <Flex fontWeight={"bold"} w="100%" justify={"space-between"}>
                  <Text>{t("name", "Name")}</Text>
                  <Text>{t("status", "Status")}</Text>
                </Flex>
                {blockList.map((user, i) => (
                  <HStack justify={"space-between"}>
                    <HStack>
                      <Avatar bgColor={"black"} src={user.photo} />
                      <Text>{user.name}</Text>
                    </HStack>
                    <Button bgColor={"crimson"} colorScheme={"red"}>
                      {t("unfollow", "Unfollow")}
                    </Button>
                  </HStack>
                ))}
              </Flex>
              <HStack justify={"end"} w="100%">
                <Button px="2rem">{t("save", "Save")}</Button>
              </HStack>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

const blockList: BlocklistUserInfo[] = [
  {
    name: "Wiaah",
    photo: "/wiaah_logo.png",
  },
  {
    name: "seller",
    photo: "/shop.jpeg",
  },
  {
    name: "buyer",
    photo: "/shop-2.jpeg",
  },
  {
    name: "username",
    photo: "/shop-3.jpeg",
  },
  {
    name: "wiaah",
    photo: "/place-1.jpg",
  },
  {
    name: "Wiaah",
    photo: "/place-2.jpg",
  },
];
