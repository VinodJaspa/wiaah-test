import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  HStack,
  Avatar,
  InputGroup,
  InputRightElement,
  Text,
  Input,
  Flex,
  Box,
  VStack,
  Divider,
} from "@chakra-ui/react";
import {
  usePostsCommentsDrawer,
  PostsViewModalsHeader,
  PostCommentCard,
} from "ui";
import React from "react";
import { useUserData, useGetPostCommentsQuery, SpinnerFallback } from "ui";
import { useTranslation } from "react-i18next";

export interface SocialPostsCommentsDrawerProps {}

export const SocialPostsCommentsDrawer: React.FC<SocialPostsCommentsDrawerProps> =
  () => {
    const [loadingMock, setLoadingMock] = React.useState(true);
    const { t } = useTranslation();
    const { user } = useUserData();
    const { postId, removePostComments } = usePostsCommentsDrawer();

    const { data, isLoading, isError } = useGetPostCommentsQuery(
      postId || null
    );

    React.useEffect(() => {
      setTimeout(() => {
        setLoadingMock(false);
      }, 5000);
    }, []);

    function handleClose() {
      removePostComments();
    }

    function handleSendComment() {}
    return (
      <Drawer
        placement={"bottom"}
        onClose={handleClose}
        isOpen={!!postId}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent p="0px">
          <DrawerHeader p="0px">
            <PostsViewModalsHeader onBackClick={handleClose} />
          </DrawerHeader>
          <DrawerBody p="0px">
            <Flex direction={"column"}>
              <HStack
                spacing={"1rem"}
                px="1.5rem"
                py="1rem"
                bgColor={"lightGray"}
              >
                <Avatar
                  bgColor={"black"}
                  src={user?.photoSrc}
                  name={user?.name}
                />
                <InputGroup>
                  <InputRightElement pr="2rem">
                    <Text onClick={handleSendComment} color="primary.main">
                      {t("send", "Send")}
                    </Text>
                  </InputRightElement>
                  <Input
                    border="none"
                    bgColor={"white"}
                    _focus={{ outlineColor: "primary.main" }}
                    rounded="full"
                    placeholder={t("type something", "type something")}
                  />
                </InputGroup>
              </HStack>
              <SpinnerFallback isError={isError} isLoading={loadingMock}>
                <VStack divider={<Divider />}>
                  {Array.isArray(data) &&
                    data.map(({ attachment, ...rest }, i) => (
                      <Box key={i} py="1rem" px="1.5rem">
                        <PostCommentCard main={i === 0} {...rest} />
                      </Box>
                    ))}
                </VStack>
              </SpinnerFallback>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };
