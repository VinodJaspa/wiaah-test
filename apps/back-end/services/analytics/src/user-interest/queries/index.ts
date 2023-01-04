import {
  GetProductMetadataQueryHandler,
  GetServiceMetadataQueryHandler,
} from './handlers';
export * from './impl';

export const UserInterestsQueryHandlers = [
  GetProductMetadataQueryHandler,
  GetServiceMetadataQueryHandler,
];
