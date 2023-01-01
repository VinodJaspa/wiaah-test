import {
  GetUserDataQueryHandler,
  GetServiceDataQueryHandler,
} from './handlers';
export * from './impl';

export const MailingQueryhandlers = [
  GetUserDataQueryHandler,
  GetServiceDataQueryHandler,
];
