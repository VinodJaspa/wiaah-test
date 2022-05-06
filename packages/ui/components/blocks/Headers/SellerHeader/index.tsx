import {
  BoxProps,
  Center,
  Flex,
  Icon,
  Image,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HiOutlineMail,
  HiOutlineUserCircle,
  HiOutlineUsers,
  HiMenu,
} from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import {
  Avatar,
  SearchInput,
  FloatingContainer,
  useResponsive,
  useNewPost,
  SellerDrawerOpenState,
} from "ui";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
export interface SellerHeaderProps {
  onSearchSubmit?: (searchValue: string) => any;
  props?: BoxProps;
}

export const SellerHeader: React.FC<SellerHeaderProps> = ({
  onSearchSubmit,
  props,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const setDrawerOpen = useSetRecoilState(SellerDrawerOpenState);

  const { isMobile } = useResponsive();
  const { OpenModal } = useNewPost();

  return (
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

      {!isMobile && <SearchInput />}

      <Flex
        align="center"
        gap={{ base: "1rem", sm: "1rem", md: "2rem" }}
        mt="0.75rem"
        p="0.5rem"
      >
        <Icon
          onClick={OpenModal}
          fontSize={{ base: "x-large", md: "xx-large" }}
          as={FiPlusSquare}
        />
        <FloatingContainer
          items={[
            {
              label: (
                <Center
                  h={"1em"}
                  w="1em"
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
          onClick={() => router.push("/chat")}
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
  );
};
