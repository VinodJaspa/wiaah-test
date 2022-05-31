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
import { BsShop } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { CgShoppingBag } from "react-icons/cg";
import {
  Avatar,
  SearchInput,
  FloatingContainer,
  useNewPost,
  SellerDrawerOpenState,
  ShoppingCart,
  NotifiactionsMenu,
  useGeneralSearchModal,
  GeneralSearchModal,
} from "ui";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useResponsive } from "hooks";

export interface SellerHeaderProps {
  onSearchSubmit?: (searchValue: string) => any;
  props?: BoxProps;
}

export const SellerHeader: React.FC<SellerHeaderProps> = ({
  onSearchSubmit,
  props,
}) => {
  const { openModal: openSearchBox } = useGeneralSearchModal();
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
      {!isMobile && (
        <GeneralSearchModal>
          <SearchInput innerProps={{ onClick: openSearchBox }} />
        </GeneralSearchModal>
      )}

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
          <NotifiactionsMenu>
            <Icon
              fontSize={{ base: "x-large", md: "xx-large" }}
              w="1.2em"
              h="1.2em"
              as={MdOutlineNotifications}
            />
          </NotifiactionsMenu>
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
        <ShoppingCart
          items={[
            {
              id: "1",
              name: "product",
              price: 15,
              quantity: 2,
              thumbnail: "/shop.jpeg",
            },
            {
              id: "2",
              name: "product 2",
              price: 40,
              quantity: 1,
              thumbnail: "/shop-2.jpeg",
            },
            {
              id: "3",
              name: "product 3",
              price: 48,
              quantity: 2,
              thumbnail: "/place-1.jpg",
            },
          ]}
        />
        {!isMobile && (
          <Menu>
            <MenuButton>
              <VStack>
                <Avatar
                  h="1.6em"
                  w="1.6em"
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
                  <Icon fontSize={"xx-large"} as={BsShop} />
                  <Text textTransform={"capitalize"}>
                    {t("shop_management", "Shop Management")}
                  </Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack>
                  <Icon fontSize={"xx-large"} as={CgShoppingBag} />
                  <Text textTransform={"capitalize"}>
                    {t("shopping_management", "Shopping Management")}
                  </Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack>
                  <Icon fontSize={"xx-large"} as={BiWallet} />
                  <Text textTransform={"capitalize"}>
                    {t("wallet", "Wallet")}
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
