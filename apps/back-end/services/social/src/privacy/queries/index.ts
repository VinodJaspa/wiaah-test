export * from './impl';
import {
  GetUserPrivacySettingsQueryHandler,
  GetHasCommentsHiddenQueryHandler,
  GetHasLikesHiddenQueryHandler,
  GetHasViewsHiddenQueryHandler,
  GetIsPrivateAccountQueryHandler,
} from './handlers';

export const privacySettingsQueryHandlers = [
  GetUserPrivacySettingsQueryHandler,
  GetHasCommentsHiddenQueryHandler,
  GetHasLikesHiddenQueryHandler,
  GetHasViewsHiddenQueryHandler,
  GetIsPrivateAccountQueryHandler,
];
