export * from './impl';
import {
  GetAccountVerificationRequestsQueryHandler,
  GetAccountSocialFollowersCountQueryHandler,
} from './handlers';

export const accVerificationQueryHandlers = [
  GetAccountVerificationRequestsQueryHandler,
  GetAccountSocialFollowersCountQueryHandler,
];
