
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCamera } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { TabType } from "types";
import Image from "next/image";
import {
  AffiliationOffersCardListWrapper,
  Container,
  FilterModal,
  MediaUploadModal,
  PostCardsListWrapper,
  profileActionsPlaceholder,
  ShopCardsInfoPlaceholder,
  ShopCardsListWrapper,
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
  SocialShopsPostCardPlaceholder,
  SocialProfileActionList,
  ShadcnFlex,
  ShadCnButton,
  ShadcnText,
} from "ui";
import { getRandomImage, socialAffiliationCardPlaceholders } from "placeholder";
import { MyProfileCustomed } from "./MyProfileCustomed";
import { ProfilePlaceholder as profile } from "ui/placeholder";
import { useDimensions } from "hooks";
import { useMediaQuery } from "react-responsive";

export interface MyProfileView { }

export const MyProfileView: React.FC<MyProfileView> = () => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const dims = useDimensions(boxRef);
  const { t } = useTranslation();
  const client = useQueryClient();
  const { uploadImage, cancelUpload } = useFileUploadModal();
  const { data: _data, isLoading, isError } = useGetMyProfileData();
  const { mutate } = useUpdateMyProfile({
    onSuccess: (data) => {
      client.setQueryData("MyProfileData", data);
      cancelUpload();
    },
  });

  const profileInfo = useRecoilValue(SocialProfileInfoState);
  const { isMobile } = useResponsive();
  const posts = useRecoilValue(SocialNewsfeedPostsState);
  // Define breakpoints
  const isBase = useMediaQuery({ maxWidth: 767 });
  const isXl = useMediaQuery({ minWidth: 1280 });

  // Determine column count based on breakpoints
  const cols = isBase ? 3 : 3; // Keeps the value as 3 for all breakpoints
  const ActionsCols = isBase ? 3 : isXl ? 5 : 3;
  const image = React.useMemo(() => getRandomImage(), []);

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
        <ShadcnFlex gap={4} direction="column">
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
            items={SocialShopsPostCardPlaceholder}
          />
        </ShadcnFlex>
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
      component: <SocialProfileActionList userId="" />,
    },
  ];
  const buyerTabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: <PostCardsListWrapper cols={cols} posts={posts} />,
    },
  ];

  return (
    <ShadcnFlex direction="column">
      <ShadcnFlex className="relative md:static">


        <div className="h-fit" ref={boxRef}>
          <MyProfileCustomed shopInfo={profile} />
        </div>
        <div className={`absolute md:relative w-full ${dims ? `h-[${dims.height}px]` : "h-auto"}`}>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
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
                alt="thumbnail"
                className="absolute md:static w-full h-full overflow-hidden bg-black/20 -z-1 object-cover"
                src={image}
                layout="fill"
              />
              <ShadCnButton
                className="absolute top-4 right-4 bg-white/80 text-xl p-2 rounded-full"
                aria-label={t("change_cover_photo", "Change Cover Photo")}
                onClick={uploadImage}
              >
                <BiCamera />
              </ShadCnButton>

            </>
          </SpinnerFallback>
        </div>
      </ShadcnFlex>
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
            <div className="h-px bg-muted my-4" />

          </>
        ) : (
          <>
            <ShadcnFlex className="h-full flex-grow items-center justify-center">
              <ShadcnText className="font-bold capitalize text-4xl">
                {t("this_profile_is_private", "this profile is private")}
              </ShadcnText>
            </ShadcnFlex>

          </>
        )}
      </Container>
    </ShadcnFlex>
  );
};
