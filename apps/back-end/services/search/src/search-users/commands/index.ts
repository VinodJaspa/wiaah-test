export * from './impl';
import { CreateOrUpdateUserElasticCommandHandler } from './handlers';

export const searchUsersCommandHandlers = [
  CreateOrUpdateUserElasticCommandHandler,
];
