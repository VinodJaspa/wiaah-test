import React from "react";
import {
  Container,
  SocialProfile,
  TabsViewer,
  useResponsive,
  SocialPostsCommentsDrawer,
  ShareWithModal,
  SpinnerFallback,
  Divider,
  HomeIcon,
  ShoppingCartIcon,
  ServicesIcon,
  AffiliationIcon,
  HStack,
  useGetSocialProfileQuery,
  SocialProfileNewsfeedPosts,
  SocialProfileShopPostsList,
  SocialProfileServicePosts,
  SocialProfileAffiliationPostsList,
} from "ui";
import { TabType } from "types";
import { useTranslation } from "react-i18next";
import { useBreakpointValue } from "utils";
import { ProfileVisibility } from "@features/API";

export interface SocialViewProps {
  profileId: string;
}

export const SocialView: React.FC<SocialViewProps> = ({ profileId }) => {
  const { t } = useTranslation();
  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useGetSocialProfileQuery(profileId);
  const cols = useBreakpointValue({ base: 3 });

  if (!profileInfo) return null;

  const sellerTabs: TabType[] = [
    {
      name: (
        <HStack>
          <p>{t("Newsfeed")}</p>
          <HomeIcon />
        </HStack>
      ),
      component: (
        <SocialProfileNewsfeedPosts grid userId={profileInfo?.ownerId} />
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Shop")}</p>
          <ShoppingCartIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col gap-4">
          <SocialProfileShopPostsList userId={profileInfo.ownerId} />
        </div>
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Service")}</p>
          <ServicesIcon />
        </HStack>
      ),
      component: <SocialProfileServicePosts userId={profileInfo.ownerId} />,
    },
    {
      name: (
        <HStack>
          <p>{t("Affilation Offers")}</p>
          <AffiliationIcon />
        </HStack>
      ),
      component: (
        <SocialProfileAffiliationPostsList userId={profileInfo.ownerId} />
      ),
    },
    // {
    //   name: (
    //     <HStack>
    //       <p>{t("Actions")}</p>
    //       <PlayButtonFillIcon />
    //     </HStack>
    //   ),
    //   component: (
    //     <ActionsListWrapper
    //       cols={ActionsCols}
    //       actions={profileActionsPlaceholder}
    //     />
    //   ),
    // },
  ];
  const buyerTabs: TabType[] = [
    {
      name: (
        <HStack>
          <p>{t("Newsfeed")}</p>
          <HomeIcon />
        </HStack>
      ),
      component: (
        <SocialProfileNewsfeedPosts cols={cols} userId={profileInfo.ownerId} />
      ),
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <Container className="flex-grow flex-col flex gap-7">
          {/* <div className="w-full flex justify-center overflow-hidden relative h-[26rem]"> */}
          {profileInfo ? <SocialProfile profileInfo={profileInfo} /> : null}
          <SocialPostsCommentsDrawer />
          <ShareWithModal />
          {/* </div> */}
          {profileInfo && (
            <>
              {profileInfo.visibility === ProfileVisibility.Public ? (
                <>
                  <TabsViewer
                    tabs={
                      profileInfo?.user?.type === "seller"
                        ? sellerTabs
                        : sellerTabs
                    }
                  />
                  <Divider className="my-4" />
                </>
              ) : (
                <>
                  <div className="h-full flex items-center justify-center">
                    <p className="font-bold w-fit text-4xl">
                      {t("This Profile is Private")}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </SpinnerFallback>
    </div>
  );
};
