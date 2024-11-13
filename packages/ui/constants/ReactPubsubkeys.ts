export const ReactPubsubKeys = {
  serviceModal: "openServiceModal",
  sharePostWithModal: "openSharePostWithModal",
  openLoginPopup: "openLoginPopup",
  openFileUploadModal: "openFileUploadModal",
  openBookConfirmationModal: "openBookConfirmationModal",
  openOrderDetailsModal: "openOrderDetailsModal",
  openSocialShopPostsFilterDrawer: "OpenSocialShopPostsFilterDrawer",
  openSocialReportModal: "OpenSocialReportModal",
  shareUrlModal: "shareUrlModal",
  showStoryModal: "showStoryModal",
  postMentionsModal: "PostMentionsModal",
  openSocialStoryModal: "open.social.story.modal",
  socialStoryProgressBarsState: "social.story.progress.bars.state",
  openSocialStoryViewersModal: "open.social.story.viewers.modal",
  openPostCommentInput: "open.post.comment.input",
} as const;

export type ReactPubsubKeysType = typeof ReactPubsubKeys;
