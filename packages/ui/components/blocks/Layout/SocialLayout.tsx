import { PostCardInfo } from "@UI/../types/src";
import { newsfeedPosts } from "@UI/placeholder";
import { PostAttachmentsViewer } from "@blocks/DataDisplay";
import {
  AddNewPostModal,
  AddNewStoryModal,
  CommentReportModal,
} from "@blocks/Modals";
import { PostViewPopup } from "@blocks/Popups";
import { MasterLocationMapModal } from "@features/GeoLocation";
import { ProductDetailsDrawer } from "@features/Products";
import { ServiceBookingDrawer } from "@features/Services";
import {
  CreateActionDrawer,
  SocialPostMentionsModal,
  SocialPostSettingsPopup,
  SocialReportModal,
  SocialShareCotentModal,
  SocialStoryDrawer,
} from "@features/Social";
import { NotifciationsDrawer } from "@features/notifications";
import { useResponsive } from "@src/index";
import React from "react";
import {
  atom,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export enum ReportContentType {
  story = "story",
  post = "post",
  action = "action",
}

interface SocialAtomValue {
  newPost: boolean;
  chatRoomId?: string;
  userStory?: string;
  viewNotifications: boolean;
  newStory?: boolean;
  unknown: unknown;
  msgNewUser?: boolean;
  productDetailsId?: string;
  shareLink?: string;
  reportContent?: { id: string; type: ReportContentType };
  serviceDetailsId?: string;
  serviceBooking?: { sellerId?: string; servicesIds?: string[] };
  createAction?: boolean;
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
    createAction: false,
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
    reportContent: (id: string, type: ReportContentType) =>
      setControls("reportContent", { id, type }),
    cancelReportContent: () => setControls("reportContent", undefined),
    viewServiceDetails: (serviceId: string) =>
      setControls("serviceDetailsId", serviceId),
    closeServiceDetails: () => setControls("serviceDetailsId", undefined),
    cancelBooking: () => setControls("serviceBooking", undefined),
    bookServices: (props: SocialAtomValue["serviceBooking"]) =>
      setControls("serviceBooking", props),
    createAction: () => setControls("createAction", true),
    cancelCreateAction: () => setControls("createAction", false),

    value,
  };
}

export const SocialLayout: React.FC = ({ children }) => {
  const { isMobile } = useResponsive();
  return (
    <>
      <AddNewPostModal />
      <SocialShareCotentModal />
      {isMobile ? <NotifciationsDrawer /> : null}
      <SocialStoryDrawer />
      <ServiceBookingDrawer />
      <SocialReportModal />
      <SocialPostSettingsPopup />
      <SocialPostMentionsModal />
      <MasterLocationMapModal />
      <ProductDetailsDrawer />
      <CreateActionDrawer />
      <PostViewPopup
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
      />
      {/* <StoryModal /> */}
      <AddNewPostModal />
      <AddNewStoryModal />
      <CommentReportModal />
      <>{children}</>
    </>
  );
};
