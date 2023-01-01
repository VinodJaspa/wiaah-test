import { Account } from '@prisma-client';

export class AccountSuspendedEvent {
  constructor(public readonly account: Account) {}
}
