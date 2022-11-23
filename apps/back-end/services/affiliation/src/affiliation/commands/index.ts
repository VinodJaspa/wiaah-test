export * from './impl';
import {
  CreateAffiliationCommandHandler,
  UpdateAffiliationCommandHandler,
  DeleteAffiliationCommandHandler,
} from './handlers';

export const AffiliationCommandHandlers = [
  CreateAffiliationCommandHandler,
  UpdateAffiliationCommandHandler,
  DeleteAffiliationCommandHandler,
];
