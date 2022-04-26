import {
  Box,
  BoxProps,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  StackProps,
} from "@chakra-ui/react";
import { HiSearch, HiOutlineMail, HiOutlineUsers } from "react-icons/hi";
import { MdOutlineNotifications } from "react-icons/md";
import React from "react";
import { Avatar, Container, FloatingContainer } from "ui";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { SellerDrawerOpenState } from "ui/state";

export interface SellerHeaderProps extends StackProps {}

export const SellerHeader: React.FC<SellerHeaderProps> = () => {
  const { t } = useTranslation();
  return (
    <Box position={"fixed"} zIndex={10} left="0%" w="100%">
      <Container className="pl-24 pr-8">
        <Flex
          borderBottomWidth={"1px"}
          borderColor="gray.200"
          justify={"space-between"}
          // position={"fixed"}
          align="center"
          bg="white"
          w="100%"
          h="3.75rem"
        >
          <Image h="100%" objectFit={"contain"} src="/wiaah_logo.png" />

          <InputGroup display={{ base: "none", md: "initial" }} maxW={"30rem"}>
            <InputRightElement px="2rem" borderLeftWidth={"1px"}>
              <Icon fill="gray" fontSize={"xl"} as={HiSearch} />
            </InputRightElement>
            <Input
              rounded="full"
              pr="5rem"
              placeholder={t("search_on_wiaah", "search on wiaah")}
            />
          </InputGroup>

          <Flex align="center" gap="2rem" p="0.5rem">
            <FloatingContainer
              items={[
                {
                  label: (
                    <Center
                      h="1rem"
                      w="1rem"
                      rounded="full"
                      color="white"
                      bg="primary.main"
                    >
                      4
                    </Center>
                  ),
                  bottom: true,
                  right: true,
                },
              ]}
            >
              <Icon
                fontSize={{ base: "x-large", md: "xx-large" }}
                as={MdOutlineNotifications}
              />
            </FloatingContainer>

            <Icon
              fontSize={{ base: "x-large", md: "xx-large" }}
              as={HiOutlineUsers}
            />

            <FloatingContainer
              items={[
                {
                  label: (
                    <Center
                      h="1rem"
                      w="1rem"
                      rounded="full"
                      color="white"
                      bg="primary.main"
                    >
                      4
                    </Center>
                  ),
                  bottom: true,
                  right: true,
                },
              ]}
            >
              <Icon
                fontSize={{ base: "x-large", md: "xx-large" }}
                as={HiOutlineMail}
              />
            </FloatingContainer>
            <VStack>
              <Avatar
                h="2.5rem"
                w="2.5rem"
                showBorder={false}
                name="wiaah"
                photoSrc="/wiaah_logo.png"
              />
            </VStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
