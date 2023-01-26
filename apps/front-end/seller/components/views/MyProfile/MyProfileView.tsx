import { useDimensions } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { TabType } from "types";
import {
  Container,
  FilterModal,
  MediaUploadModal,
  SocialServicePostsList,
  ShopCardsInfoPlaceholder,
  ShopCardsListWrapper,
  SocialProfileInfo,
  SpinnerFallback,
  TabsViewer,
  useFileUploadModal,
  useResponsive,
  useUpdateMyProfile,
  Divider,
  useGetServicesPostsQuery,
  usePaginationControls,
  SocialProfileNewsfeedPosts,
  useGetMyProfileQuery,
  SocialProfileAffiliationPostsList,
  SocialProfileServicePosts,
  SocialProfileShopPostsList,
} from "ui";
import { useBreakpointValue } from "utils";
import { MyProfile } from "./MyProfile";

export interface MyProfileView {}

export const MyProfileView: React.FC<MyProfileView> = () => {
  const boxRef = React.useRef<HTMLDivElement>(null);

  const dims = useDimensions(boxRef);

  const { t } = useTranslation();

  const client = useQueryClient();

  const { uploadImage, cancelUpload } = useFileUploadModal();

  const { mutate } = useUpdateMyProfile({
    onSuccess: (data) => {
      client.setQueryData("MyProfileData", data);
      cancelUpload();
    },
  });

  const { data: profile, isLoading, isError } = useGetMyProfileQuery();

  const sellerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <SocialProfileNewsfeedPosts userId={profile?.ownerId} />,
    },
    {
      name: t("shop", "shop"),
      component: <SocialProfileShopPostsList userId={profile?.ownerId} />,
    },
    {
      name: t("services"),
      component: <SocialProfileServicePosts userId={profile?.ownerId} />,
    },

    {
      name: t("affiliation offers", "affiliation offers"),
      component: (
        <SocialProfileAffiliationPostsList userId={profile?.ownerId} />
      ),
    },
    {
      name: t("actions", "Actions"),
      component: (
        <div></div>
        // <ActionsListWrapper
        //   cols={ActionsCols}
        //   actions={profileActionsPlaceholder}
        // />
      ),
    },
  ];
  const buyerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <SocialProfileNewsfeedPosts userId={profile?.ownerId} />,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <MyProfile shopInfo={profile} />
      <div
        className={`absolute md:relative w-full h-[${
          dims ? dims.height : "unset"
        }]`}
      >
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {profile && (
            <>
              <MediaUploadModal
                onImgUpload={(src) => {
                  console.log("upload");
                  mutate({
                    profileCoverPhoto: src.toString(),
                  });
                }}
              />
            </>
          )}
        </SpinnerFallback>
      </div>
      <Container className="flex-grow flex flex-col gap-4">
        {SocialProfileInfo && SocialProfileInfo.public ? (
          <>
            <TabsViewer
              tabs={
                SocialProfileInfo.accountType === "seller"
                  ? sellerTabs
                  : buyerTabs
              }
            />
            <Divider />
          </>
        ) : (
          <>
            <div className="h-full flex flex-grow-[inherit] items-center justify-center">
              <p className="font-bold text-2xl">
                {t("This Profile Is Private")}
              </p>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
