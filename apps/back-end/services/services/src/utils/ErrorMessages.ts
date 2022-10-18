import { ErrorHandlingService, ErrorTranslationMessages } from 'nest-utils';

export const ErrorMessages = {
  serviceDuplicationErr: {
    en: 'en, this account already owns a service, seller accounts can only have 1 service',
    fr: 'fr, this account already owns a service, seller accounts can only have 1 service',
    es: 'es, this account already owns a service, seller accounts can only have 1 service',
    ge: 'ge, this account already owns a service, seller accounts can only have 1 service',
  },
};

export type ErrorHandlingTypedService = ErrorHandlingService<
  typeof ErrorMessages
>;
