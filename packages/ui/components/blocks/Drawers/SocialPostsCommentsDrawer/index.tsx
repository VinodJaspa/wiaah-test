import {
  usePostsCommentsDrawer,
  PostsViewModalsHeader,
  PostCommentCard,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  InputGroup,
  Input,
  InputRightElement,
  Divider,
  Avatar,
  DrawerHeader,
} from "@UI";
import React from "react";
import { useUserData, useGetPostCommentsQuery, SpinnerFallback } from "@UI";
import { useTranslation } from "react-i18next";
import { useResponsive } from "hooks";

export interface SocialPostsCommentsDrawerProps {}

export const SocialPostsCommentsDrawer: React.FC<
  SocialPostsCommentsDrawerProps
> = () => {
  const [loadingMock, setLoadingMock] = React.useState(true);
  const { t } = useTranslation();
  const { user } = useUserData();
  const { postId, removePostComments } = usePostsCommentsDrawer();
  const { isMobile } = useResponsive();
  const { data, isLoading, isError } = useGetPostCommentsQuery(postId || null);

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
      position={isMobile ? "bottom" : "right"}
      onClose={handleClose}
      isOpen={!!postId}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <PostsViewModalsHeader onBackClick={handleClose} />
        </DrawerHeader>
        <div className="flex flex-col">
          <HStack className="gap-4 px-6 py-4 bg-gray-300">
            <Avatar src={user?.photoSrc} name={user?.name} />
            <InputGroup className="bg-white">
              <InputRightElement className=" px-2">
                <p
                  onClick={handleSendComment}
                  className="cursor-pointer text-primary"
                >
                  {t("send", "Send")}
                </p>
              </InputRightElement>
              <Input placeholder={t("type something", "type something")} />
            </InputGroup>
          </HStack>
          <SpinnerFallback isError={isError} isLoading={loadingMock}>
            <div className="flex flex-col gap-2">
              {Array.isArray(data) &&
                data.map(({ attachment, ...rest }, i) => (
                  <>
                    <div className="py-4 px-6" key={i}>
                      <PostCommentCard main={i === 0} {...rest} />
                    </div>
                    <Divider />
                  </>
                ))}
            </div>
          </SpinnerFallback>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
