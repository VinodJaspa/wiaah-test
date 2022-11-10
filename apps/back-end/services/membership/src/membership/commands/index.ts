export * from './impl';
import {
  CreateMembershipCommandHandler,
  UpdateMembershipCommandHandler,
} from './handlers';

export const membershipCommandHandlers = [
  CreateMembershipCommandHandler,
  UpdateMembershipCommandHandler,
];
