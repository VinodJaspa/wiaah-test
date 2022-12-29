import { Account } from '@prisma-client';

export class SellerAccountRequestDeclinedEvent {
  constructor(public account: Account) {}
}
