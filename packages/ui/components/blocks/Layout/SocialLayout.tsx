import {
  AddNewPostModal,
  AddNewStoryModal,
  CommentReportModal,
} from "@blocks/Modals";
import { SocialStoryModal } from "@blocks/Social";
import { ContentHostType, ServiceType } from "@features/API";
import {
  LocationSearchDrawer,
  MarketMapSearchDrawer,
  MasterLocationMapModal,
} from "@features/GeoLocation";
import { NewsletterDrawer } from "@features/Newsletter";
import { RequestRefundDrawer } from "@features/Orders";
import { ProductDetailsDrawer } from "@features/Products";
import { ServiceBookingDrawer } from "@features/Services";
import {
  CreateActionDrawer,
  ChooseActionRemix,
  ProfileOptionsDrawer,
  SocialPostMentionsModal,
  SocialPostSettingsPopup,
  SocialReportModal,
  SocialShareCotentModal,
  SocialStoryDrawer,
  WithdrawalDrawer,
} from "@features/Social";
import { CommentsDrawer } from "@features/Social/components/Drawers/CommentsDrawer";
import { EditMusicDrawer } from "@features/Social/components/Drawers/EditMusicDrawer";
import { SocialMusicDrawer } from "@features/Social/components/Drawers/SocialMusicDrawer";
import { TaggedProfilesDrawer } from "@features/Social/components/Drawers/TaggedProfilesDrawer";
import { NotifciationsDrawer } from "@features/notifications";
import { useResponsive } from "@src/index";
import React from "react";
import {
  atom,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export const SocialContentType = ContentHostType;
export type SocialContentType = ContentHostType;

interface SocialAtomValue {
  newPost: boolean;
  chatRoomId?: string;
  newStory?: boolean;
  newAction?: boolean;
  newPublish?: boolean;
  userStory?: string;
  viewNotifications: boolean;
  unknown: unknown;
  msgNewUser?: boolean;
  productDetailsId?: string;
  shareLink?: string;
  reportContent?: { id: string; type: SocialContentType };
  serviceDetailsId?: string;
  serviceBooking?: { sellerId?: string; servicesIds?: string[] };
  createAction?: {
    audioId?: string;
    remixId?: string;
  };
  editMusicId?: string;
  remixActionId?: string;
  searchMap: boolean;
  profileIdOptions?: string;
  showMyProfileNav: boolean;
  showTaggedProfiles?: {
    contentId: string;
    contentType: SocialContentType;
  };
  showMusicId?: string;
  showMusicSearch: boolean;
  showWithdraw: boolean;
  showSocialContentComments?: {
    type: SocialContentType;
    id: string;
  };
  showAccountDeletionConfirmation: boolean;
  showAccountSuspendConfirmation: boolean;
  searchMixShopAndService?: string;
  requestRefundId?: string;
  showNewsletterRegisteration: boolean;
  showContactUs: boolean;
  marketServiceSearchResultsFilters?: ServiceType;
  marketShowServiceDetails?: string;
  marketShowMapSearch: boolean;
  showProfileFollowers?: string;
  showSocialPostProducts?: string;
  showMessageSettings?: true;
}

const socialAtom = atom<SocialAtomValue>({
  key: "socialLayout",
  default: {
    newPost: false,
    chatRoomId: undefined,
    userStory: undefined,
    viewNotifications: false,
    newStory: false,
    unknown: null,
    msgNewUser: false,
    productDetailsId: undefined,
    shareLink: undefined,
    reportContent: undefined,
    serviceDetailsId: undefined,
    searchMap: false,
    showMyProfileNav: false,
    showMusicSearch: false,
    showWithdraw: false,
    showAccountDeletionConfirmation: false,
    showAccountSuspendConfirmation: false,
    showNewsletterRegisteration: false,
    showContactUs: false,
    marketShowMapSearch: false,
  },
});

const socialLayoutSelector = selectorFamily({
  key: "socialLayoutSelector",
  get:
    (key: keyof SocialAtomValue | undefined = "unknown") =>
    ({ get }) => {
      const state = get(socialAtom);

      const value = state[key];
      return value;
    },
});

export function useSocialControls<TKey extends keyof SocialAtomValue>(
  subKey?: TKey
) {
  const setState = useSetRecoilState(socialAtom);
  const value = useRecoilValue(
    socialLayoutSelector(subKey)
  ) as SocialAtomValue[TKey];

  function setControls<
    TKey extends keyof SocialAtomValue,
    TValue extends SocialAtomValue[TKey]
  >(key: TKey, value: TValue) {
    setState((v) => ({ ...v, [key]: value }));
  }

  return {
    openSocialNewPostModal: () => {
      setControls("newPost", true);
    },
    cancelAddNewPost: () => {
      setControls("newPost", false);
    },
    chatWith: (id: string) => {
      setControls("chatRoomId", id);
    },
    closeChat: () => {
      setControls("chatRoomId", undefined);
    },
    viewUserStory: (userId: string) => {
      setControls("userStory", userId);
    },
    closeStory: () => {
      setControls("userStory", undefined);
    },
    openNotifications: () => {
      setControls("viewNotifications", true);
    },
    closeNotifications: () => {
      setControls("viewNotifications", false);
    },
    addNewStory: () => {
      setControls("newStory", true);
    },
    cancelNewStory: () => {
      setControls("newStory", false);
    },
    msgNewUser: () => setControls("msgNewUser", true),
    cancelMsgNewUser: () => setControls("msgNewUser", false),
    viewProductDetails: (id: string) => setControls("productDetailsId", id),
    cancelViewProductDetails: () => setControls("productDetailsId", undefined),
    shareLink: (link: string) => setControls("shareLink", link),
    cancelShareLink: () => setControls("shareLink", undefined),
    reportContent: (id: string, type: SocialContentType) =>
      setControls("reportContent", { id, type }),
    cancelReportContent: () => setControls("reportContent", undefined),
    viewShop: (serviceId: string) => setControls("serviceDetailsId", serviceId),
    closeServiceDetails: () => setControls("serviceDetailsId", undefined),
    cancelBooking: () => setControls("serviceBooking", undefined),
    bookServices: (props: SocialAtomValue["serviceBooking"]) =>
      setControls("serviceBooking", props),
    createAction: (props: { audioId?: string; remixId?: string }) =>
      setControls("createAction", props),
    cancelCreateAction: () => setControls("createAction", undefined),
    editMusic: (id: string) => setControls("editMusicId", id),
    cancelEditMusic: () => setControls("editMusicId", undefined),
    createRemixAction: (actionId: string) =>
      setControls("remixActionId", actionId),
    cancelRemixAction: () => setControls("remixActionId", undefined),
    openSearchMap: () => setControls("searchMap", true),
    closeSearchMap: () => setControls("searchMap", false),
    openProfileOptions: (id: string) => setControls("profileIdOptions", id),
    closeProfileOptions: () => setControls("profileIdOptions", undefined),
    openMyProfileNav: () => setControls("showMyProfileNav", true),
    closeMyProfileNav: () => setControls("showMyProfileNav", false),
    showContentTaggedProfiles: (
      contentId: string,
      contentType: SocialContentType
    ) => setControls("showTaggedProfiles", { contentId, contentType }),
    hideContentTaggedProfiles: () =>
      setControls("showTaggedProfiles", undefined),

    openMusicDetails: (musicId: string) => setControls("showMusicId", musicId),
    closeMusicDetails: () => setControls("showMusicId", undefined),
    openMusicSearch: () => setControls("showMusicSearch", true),
    closeMusicSearch: () => setControls("showMusicSearch", false),
    showWithdraw: () => setControls("showWithdraw", true),
    closeWithdraw: () => setControls("showWithdraw", false),
    showContentComments: (contentType: SocialContentType, contentId: string) =>
      setControls("showSocialContentComments", {
        id: contentId,
        type: contentType,
      }),
    hideContentComments: () =>
      setControls("showSocialContentComments", undefined),
    showAccountDeletionConfirmation: () =>
      setControls("showAccountDeletionConfirmation", true),
    hideAccountDeletionConfirmation: () =>
      setControls("showAccountDeletionConfirmation", false),
    showAccountSuspendConfirmation: () =>
      setControls("showAccountSuspendConfirmation", true),
    hideAccountSuspendConfirmation: () =>
      setControls("showAccountSuspendConfirmation", false),
    searchMixedShopsServices: (searchQ: string) =>
      setControls("searchMixShopAndService", searchQ),
    cancelSearchMixedShopsServices: () =>
      setControls("searchMixShopAndService", undefined),
    requestRefund: (orderId: string) => setControls("requestRefundId", orderId),
    cancelRequestRefund: () => setControls("requestRefundId", undefined),
    showNewsletterRegisteration: () =>
      setControls("showNewsletterRegisteration", true),
    hideNewsletterRegisteration: () =>
      setControls("showNewsletterRegisteration", false),
    showContactUs: () => setControls("showContactUs", true),
    hideContactUs: () => setControls("showContactUs", false),
    showServiceSearchResultsFilter: (serviceType: ServiceType) =>
      setControls("marketServiceSearchResultsFilters", serviceType),
    hideServiceSearchResultsFilter: () =>
      setControls("marketServiceSearchResultsFilters", undefined),
    showMarketServiceDetails: (id: string) =>
      setControls("marketShowServiceDetails", id),
    hideMarketServiceDetails: () =>
      setControls("marketShowServiceDetails", undefined),
    showMarketMapSearch: () => setControls("marketShowMapSearch", true),
    hideMarketMapSearch: () => setControls("marketShowMapSearch", false),
    showProfileFollowers: (profileId: string) =>
      setControls("showProfileFollowers", profileId),
    hideProfileFollowers: () => setControls("showProfileFollowers", undefined),

    showNewAction: () => setControls("newAction", true),
    hideNewAction: () => setControls("newAction", undefined),

    showNewPublish: () => setControls("newPublish", true),
    hideNewPublish: () => setControls("newPublish", undefined),

    showSocialContentProducts: (id: string) =>
      setControls("showSocialPostProducts", id),
    hideSocialContentProducts: () =>
      setControls("showSocialPostProducts", undefined),

    showMessageSettings: () => setControls("showMessageSettings", true),
    hideMessageSettings: () => setControls("showMessageSettings", undefined),

    value,
  };
}

export const SocialLayout: React.FC = ({ children }) => {
  const { isMobile } = useResponsive();
  return (
    <>
      <AddNewPostModal />
      <SocialShareCotentModal />
      <SocialStoryDrawer />
      <ServiceBookingDrawer />
      <SocialReportModal />
      <SocialPostSettingsPopup />
      <SocialPostMentionsModal />
      {isMobile ? (
        <>
          <NotifciationsDrawer />
          <ProductDetailsDrawer />
          <CreateActionDrawer />
          <EditMusicDrawer />
          <ChooseActionRemix />
          <ProfileOptionsDrawer />
          <LocationSearchDrawer />
          <TaggedProfilesDrawer />
          <SocialMusicDrawer />
          <WithdrawalDrawer />
          <CommentsDrawer />
          <RequestRefundDrawer />
          <NewsletterDrawer />
          <MarketMapSearchDrawer />
        </>
      ) : (
        <>
          <MasterLocationMapModal />
        </>
      )}
      {/* <PostViewPopup
        fetcher={async ({ queryKey }) => {
          const id = queryKey[1].postId;
          const post = newsfeedPosts.find((post) => post.postInfo.id === id);
          return post ? post : null;
        }}
        queryName="newFeedPost"
        idParam="newsfeedpostid"
        renderChild={(props: PostCardInfo) => {
          return (
            <PostAttachmentsViewer
              attachments={props.postInfo.attachments}
              profileInfo={props.profileInfo}
              carouselProps={{
                arrows: true,
              }}
            />
          );
        }}
      /> */}
      <SocialStoryModal />
      <AddNewPostModal />
      <AddNewStoryModal />
      <CommentReportModal />
      <>{children}</>
    </>
  );
};
