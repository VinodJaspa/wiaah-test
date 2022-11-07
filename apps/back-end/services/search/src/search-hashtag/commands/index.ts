export * from './impl';
import { CreateHashtagElasticDocumentCommandHandler } from './handlers';

export const SearchHashtagCommandHandlers = [
  CreateHashtagElasticDocumentCommandHandler,
];
