import { Flex, HStack, Text, Avatar, Select, Button } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { BlocklistUserInfo } from "types";

export interface BlocklistSectionProps {}

export const BlocklistSection: React.FC<BlocklistSectionProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <Flex w="100%" gap="2rem" direction={"column"}>
      <Text fontWeight={"bold"} fontSize={"xx-large"}>
        {t("block_list", "Block List")}
      </Text>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form>
            <Flex gap="1rem" direction={"column"}>
              <Flex fontWeight={"bold"} w="100%" justify={"space-between"}>
                <Text>{t("name", "Name")}</Text>
                <Text px="1rem">{t("status", "Status")}</Text>
              </Flex>
              {blockList.map((user, i) => (
                <HStack justify={"space-between"}>
                  <HStack>
                    <Avatar bgColor={"black"} src={user.photo} />
                    <Text>{user.name}</Text>
                  </HStack>
                  <Field w="fit-content" as={Select}>
                    <option>{t("inactive", "inActive")}</option>
                    <option>{t("active", "Active")}</option>
                    <option>{t("blocked", "Blocked")}</option>
                  </Field>
                </HStack>
              ))}
              <HStack justify={"end"} w="100%">
                <Button mr="0.75rem" px="2rem">
                  {t("save", "Save")}
                </Button>
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
