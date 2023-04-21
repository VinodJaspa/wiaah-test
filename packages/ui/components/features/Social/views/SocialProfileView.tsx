import React from "react";
import {
  Container,
  SocialProfile,
  TabsViewer,
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
  SimpleTabs,
  SimpleTabHead,
  SimpleTabItemList,
  NewsFeedIcon,
  ShoppingBagIcon,
  VideosPlayIcon,
  NewsFeedOutlineIcon,
  ShoppingBagOutlineIcon,
  AffiliationIconOutline,
  VideosOutlinePlayIcon,
  ServicesOutlineIcon,
  useUserData,
  useGetUserShopType,
  SocialProfileActionList,
} from "@UI";
import { TabType } from "types";
import { useTranslation } from "react-i18next";
import { runIfFn, useBreakpointValue } from "utils";
import { AccountType, ProfileVisibility, StoreType } from "@features/API";
import { useRouting } from "@UI/../routing";

export interface SocialViewProps {
  username: string;
}

export const SocialProfileView: React.FC<SocialViewProps> = ({ username }) => {
  const { t } = useTranslation();
  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useGetSocialProfileQuery(username);
  const { data: shop } = useGetUserShopType(
    { userId: profileInfo?.ownerId! },
    {
      enabled: !!profileInfo?.ownerId,
    }
  );
  const cols = useBreakpointValue({ base: 3 });

  const { getParam, visit, getCurrentPath } = useRouting();
  const idx = getParam("tab");
  const onChange = (idx: string) =>
    visit((r) => r.addQuery({ tab: idx }), false);

  const { user } = useUserData();

  const ownProfile = user?.id === profileInfo?.ownerId;

  if (!profileInfo) return null;

  const showOn = (types: AccountType[]) =>
    types.includes(
      (profileInfo.user?.type as AccountType) || AccountType.Buyer
    );

  const tabValue = parseInt(idx || "0");

  const productsShop = true;

  const tabs: { solid: React.ReactNode; outline: React.ReactNode }[] = [
    { solid: NewsFeedIcon, outline: NewsFeedOutlineIcon },
  ]
    .concat(
      showOn([AccountType.Seller])
        ? [
            productsShop
              ? {
                  solid: ShoppingBagIcon,
                  outline: ShoppingBagOutlineIcon,
                }
              : {
                  solid: ServicesIcon,
                  outline: ServicesOutlineIcon,
                },
            {
              solid: AffiliationIcon,
              outline: AffiliationIconOutline,
            },
          ]
        : []
    )
    .concat([
      {
        solid: VideosPlayIcon,
        outline: VideosOutlinePlayIcon,
      },
    ])
    .filter((v) => !!v);

  return (
    <div className="flex flex-col h-full">
      <SpinnerFallback isLoading={isLoading} isError={isError}>
        <Container className="flex-grow flex-col flex gap-2">
          {profileInfo ? <SocialProfile profileInfo={profileInfo} /> : null}
          <Divider />
          {profileInfo && (
            <>
              {profileInfo.visibility === ProfileVisibility.Public ? (
                <SimpleTabs
                  onChange={(v) => onChange(String(v))}
                  value={parseInt(idx || "0")}
                >
                  <HStack className="justify-around text-xl">
                    <SimpleTabHead>
                      {tabs.map((v, i) => (
                        <div
                          className={`${
                            tabValue === i
                              ? "border-black"
                              : "border-transparent"
                          } border-b-2 pb-2 px-4`}
                        >
                          {runIfFn(tabValue === i ? v.solid : v.outline)}
                        </div>
                      ))}
                    </SimpleTabHead>
                  </HStack>
                  <SimpleTabItemList>
                    <SocialProfileNewsfeedPosts
                      grid
                      userId={profileInfo?.ownerId}
                    />
                    {productsShop ? (
                      <SocialProfileShopPostsList
                        userId={profileInfo.ownerId}
                      />
                    ) : (
                      <SocialProfileServicePosts userId={profileInfo.ownerId} />
                    )}
                    <SocialProfileAffiliationPostsList
                      userId={profileInfo.ownerId}
                    />
                    <SocialProfileActionList userId={profileInfo.ownerId} />
                  </SimpleTabItemList>
                </SimpleTabs>
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
      <SocialPostsCommentsDrawer />
      <ShareWithModal />
    </div>
  );
};
