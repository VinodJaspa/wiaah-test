import { useDimensions } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { TabType } from "types";
import {
  AffiliationOffersCardListWrapper,
  Container,
  FilterModal,
  MediaUploadModal,
  PostCardsListWrapper,
  SocialServicePostsList,
  ShopCardsInfoPlaceholder,
  ShopCardsListWrapper,
  socialAffiliationCardPlaceholders,
  SocialNewsfeedPostsState,
  SocialProfileInfo,
  SpinnerFallback,
  TabsViewer,
  useFileUploadModal,
  useGetMyProfileData,
  useResponsive,
  useUpdateMyProfile,
  newsfeedPosts,
  Divider,
  useGetServicesPostsQuery,
  usePaginationControls,
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
  const { data, isLoading, isError } = useGetMyProfileData();
  const { mutate } = useUpdateMyProfile({
    onSuccess: (data) => {
      client.setQueryData("MyProfileData", data);
      cancelUpload();
    },
  });

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
          posts={[...Array(4)].reduce((acc) => [...acc, ...newsfeedPosts], [])}
        />
      ),
    },
    {
      name: t("shop", "shop"),
      component: (
        <div className="flex flex-col gap-4">
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
          <FilterModal />
          <ShopCardsListWrapper
            grid={isMobile}
            cols={cols}
            items={ShopCardsInfoPlaceholder}
          />
        </div>
      ),
    },
    {
      name: t("services"),
      component: <MyProfileServicesPostsList />,
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
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <MyProfile
        shopInfo={{
          ...data,
          verified: true,
          location: {
            country: "USA",
            countryCode: "CH",
            state: "LA",
            address: "Smart Street",
            postalCode: 8,
            cords: {
              lat: 56,
              lng: 24,
            },
            city: "LA",
          },
          bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
          links: ["https://instagram.com"],
          userId: "",
        }}
      />
      <div
        className={`absolute md:relative w-full h-[${
          dims ? dims.height : "unset"
        }]`}
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

export const MyProfileServicesPostsList = () => {
  const { pagination, controls } = usePaginationControls({
    itemsPerPage: 20,
  });
  const { data, isError, isLoading } = useGetServicesPostsQuery(pagination);
  return (
    <SpinnerFallback isError={isError} isLoading={isLoading}>
      <SocialServicePostsList posts={data?.data || []} />
    </SpinnerFallback>
  );
};
