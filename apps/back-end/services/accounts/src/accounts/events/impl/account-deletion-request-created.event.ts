import { AccountDeletionRequest } from '@prisma-client';

export class AccountDeletionRequestCreatedEvent {
  constructor(public readonly request: AccountDeletionRequest) {}
}
