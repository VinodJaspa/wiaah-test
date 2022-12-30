export * from './impl';
import {
  GetUserFollowersIdsQueryHandler,
  GetCurrencyExchangeQueryHandler,
  GetUserDataQueryHandler,
  GetUserNotificationsSettingsQueryHandler,
} from './handlers';

export const NotificationsQueryHandler = [
  GetUserFollowersIdsQueryHandler,
  GetUserDataQueryHandler,
  GetCurrencyExchangeQueryHandler,
  GetUserNotificationsSettingsQueryHandler,
];
