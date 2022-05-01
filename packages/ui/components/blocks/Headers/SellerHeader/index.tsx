import {
  BoxProps,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HiSearch,
  HiOutlineMail,
  HiOutlineUserCircle,
  HiOutlineUsers,
  HiMenu,
} from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { Avatar, Container, FloatingContainer } from "ui";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ui/Hooks";
import { SellerDrawerOpenState } from "ui/state";
import { useSetRecoilState } from "recoil";

export interface SellerHeaderProps {
  onSearchSubmit?: (searchValue: string) => any;
  props?: BoxProps;
}

export const SellerHeader: React.FC<SellerHeaderProps> = ({
  onSearchSubmit,
  props,
}) => {
  const { t } = useTranslation();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  function handleSearchInputChange(value: string) {
    setSearchInputValue(value);
  }
  const { isMobile } = useResponsive();
  return (
    <Container className={`${isMobile ? "px-4" : "pl-24 pr-8"}`}>
      <Flex
        {...props}
        borderBottomWidth={"1px"}
        borderColor="gray.200"
        justify={"space-between"}
        align="center"
        bg="white"
        w="100%"
        h="3.75rem"
      >
        <Flex h="100%" align="center" gap="0.5rem">
          {isMobile && (
            <Icon
              fontSize={{ base: "x-large", md: "xx-large" }}
              cursor={"pointer"}
              mt="0.75rem"
              onClick={() => setDrawerOpen(true)}
              as={HiMenu}
            />
          )}
          <Image h="100%" objectFit={"contain"} src="/wiaah_logo.png" />
        </Flex>

        {!isMobile && (
          <InputGroup maxW={"30rem"}>
            <InputRightElement px="2rem" borderLeftWidth={"1px"}>
              <IconButton
                aria-label="Search Input Submit button"
                fill="gray"
                fontSize={"xl"}
                variant="noBg"
                icon={<HiSearch />}
              />
            </InputRightElement>
            <Input
              value={searchInputValue}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              rounded="full"
              pr="5rem"
              placeholder={t("search_on_wiaah", "search on wiaah")}
            />
          </InputGroup>
        )}

        <Flex
          align="center"
          gap={{ base: "1rem", sm: "1rem", md: "2rem" }}
          mt="0.75rem"
          p="0.5rem"
        >
          <Icon
            fontSize={{ base: "x-large", md: "xx-large" }}
            as={FiPlusSquare}
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
                bottom: "0.2em",
                right: true,
              },
            ]}
          >
            <Icon
              fontSize={{ base: "x-large", md: "xx-large" }}
              w="1.2em"
              h="1.2em"
              as={MdOutlineNotifications}
            />
          </FloatingContainer>
          {!isMobile && (
            <Icon
              fontSize={{ base: "x-large", md: "xx-large" }}
              as={HiOutlineUsers}
            />
          )}

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
          {!isMobile && (
            <Menu>
              <MenuButton>
                <VStack>
                  <Avatar
                    h="2.5rem"
                    w="2.5rem"
                    showBorder={false}
                    name="wiaah"
                    photoSrc="/wiaah_logo.png"
                  />
                </VStack>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <HStack>
                    <Icon fontSize={"xx-large"} as={HiOutlineUserCircle} />
                    <Text textTransform={"capitalize"}>
                      {t("profile", "profile")}
                    </Text>
                  </HStack>
                </MenuItem>
                <MenuItem>
                  <HStack>
                    <Icon fontSize={"xx-large"} as={IoSettingsOutline} />
                    <Text textTransform={"capitalize"}>
                      {t("settings", "settings")}
                    </Text>
                  </HStack>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <HStack>
                    <Text textTransform={"capitalize"}>
                      {t("log_out", "log out")}
                    </Text>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
