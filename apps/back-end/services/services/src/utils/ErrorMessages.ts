import {
  createErrorObject,
  ErrorHandlingService,
  ErrorTranslationMessages,
} from 'nest-utils';

export const ErrorMessages = createErrorObject({
  serviceDuplicationErr: {
    en: 'this account already owns a service, seller accounts can only have 1 service',
    fr: 'this account already owns a service, seller accounts can only have 1 service',
    es: 'this account already owns a service, seller accounts can only have 1 service',
    ge: 'this account already owns a service, seller accounts can only have 1 service',
  },
  forbiddenActionErr: {
    en: 'this account cannot preform this action',
    es: 'this account cannot preform this action',
    ge: 'this account cannot preform this action',
    fr: 'this account cannot preform this action',
  },
  serviceNotActiveErr: {
    en: 'cannot view this service, this service is not active',
    es: 'cannot view this service, this service is not active',
    fr: 'cannot view this service, this service is not active',
    ge: 'cannot view this service, this service is not active',
  },
  healthCenterSpecialityNotFoundErr: {
    en: 'cannot find speciality with the given info',
    es: 'cannot find speciality with the given info',
    fr: 'cannot find speciality with the given info',
    ge: 'cannot find speciality with the given info',
  },
  healthCenterSpecialityCreationDBErr: {
    en: 'failed to create speciality',
    es: 'failed to create speciality',
    ge: 'failed to create speciality',
    fr: 'failed to create speciality',
  },
});

export type ErrorHandlingTypedService = ErrorHandlingService<
  typeof ErrorMessages
>;
