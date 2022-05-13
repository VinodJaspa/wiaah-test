import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useDimensions,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCamera } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { TabType } from "types";
import {
  ActionsListWrapper,
  AffiliationOffersCardListWrapper,
  Container,
  FilterModal,
  MediaUploadModal,
  PostCardsListWrapper,
  profileActionsPlaceholder,
  ShopCardsInfoPlaceholder,
  ShopCardsListWrapper,
  socialAffiliationCardPlaceholders,
  SocialNewsfeedPostsState,
  SocialProfileInfo,
  SocialProfileInfoState,
  SpinnerFallback,
  TabsViewer,
  useFileUploadModal,
  useGetMyProfileData,
  useResponsive,
  useUpdateMyProfile,
  newsfeedPosts,
} from "ui";
import { MyProfile } from "./MyProfile";

export interface MyProfileView {}

export const MyProfileView: React.FC<MyProfileView> = () => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const dims = useDimensions(boxRef, true);
  const { t } = useTranslation();
  const client = useQueryClient();
  const { uploadImage, cancelUpload } = useFileUploadModal();
  const { data, isLoading, isError } = useGetMyProfileData();
  const { mutate } = useUpdateMyProfile({
    onSuccess: (data) => {
      client.setQueryData("MyProfileData", data);
      cancelUpload();
    },
  });

  const profileInfo = useRecoilValue(SocialProfileInfoState);
  const { isMobile } = useResponsive();
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  const cols = useBreakpointValue({ base: 3 });
  const ActionsCols = useBreakpointValue({ base: 3, xl: 5 });

  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
  const sellerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: (
        <PostCardsListWrapper
          grid={isMobile}
          cols={cols}
          posts={newsfeedPosts}
        />
      ),
    },
    {
      name: t("shop", "shop"),
      component: (
        <Flex gap="1rem" direction={"column"}>
          <div className="flex justify-end">
            <div
              onClick={() => {
                setFilterOpen(true);
              }}
              className="filter-button mr-2 flex items-center justify-between rounded-lg border p-2 text-xs md:hidden"
            >
              <samp>{t("Filter", "Filter")}</samp>
              <FaChevronDown className="ml-2" />
            </div>
          </div>
          <FilterModal
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />
          <ShopCardsListWrapper
            grid={isMobile}
            cols={cols}
            items={ShopCardsInfoPlaceholder}
          />
        </Flex>
      ),
    },
    {
      name: t("affiliation offers", "affiliation offers"),
      component: (
        <AffiliationOffersCardListWrapper
          grid={isMobile}
          cols={cols}
          items={socialAffiliationCardPlaceholders}
        />
      ),
    },
    {
      name: t("actions", "Actions"),
      component: (
        <ActionsListWrapper
          cols={ActionsCols}
          actions={profileActionsPlaceholder}
        />
      ),
    },
  ];
  const buyerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
  ];

  return (
    <Flex direction={"column"}>
      <Flex position={{ base: "relative", md: "initial" }}>
        <Box h={"fit-content"} ref={boxRef}>
          <MyProfile />
        </Box>
        <Box
          position={{ base: "absolute", md: "relative" }}
          w="100%"
          h={{ base: dims ? dims.borderBox.height : "unset" }}
        >
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {data && (
              <>
                <MediaUploadModal
                  onImgUpload={(src) => {
                    console.log("upload");
                    mutate({
                      profileCoverPhoto: src.toString(),
                    });
                  }}
                />
                <Image
                  position={{ base: "absolute", md: "unset" }}
                  top="0px"
                  left="0px"
                  w="100%"
                  h="100%"
                  overflow={"hidden"}
                  bgColor={"blackAlpha.200"}
                  zIndex={-1}
                  src={data.profileCoverPhoto}
                  objectFit={"cover"}
                />
                <IconButton
                  variant={"icon"}
                  fontSize="xx-large"
                  position={"absolute"}
                  bgColor="whiteAlpha.800"
                  top="1rem"
                  right="1rem"
                  aria-label={t("change_cover_photo", "Change Cover Photo")}
                  as={BiCamera}
                  onClick={uploadImage}
                />
              </>
            )}
          </SpinnerFallback>
        </Box>
      </Flex>
      <Container className="flex-grow flex-col">
        {SocialProfileInfo && SocialProfileInfo.public ? (
          <>
            <TabsViewer
              tabs={
                SocialProfileInfo.accountType === "seller"
                  ? sellerTabs
                  : buyerTabs
              }
            />
            <Divider my="1rem" />
          </>
        ) : (
          <>
            <Flex
              h="100%"
              flexGrow={"inherit"}
              align="center"
              justify={"center"}
            >
              <Text
                fontWeight={"bold"}
                textTransform={"capitalize"}
                fontSize={"xx-large"}
              >
                {t("this_profile_is_private", "this profile is private")}
              </Text>
            </Flex>
          </>
        )}
      </Container>
    </Flex>
  );
};
