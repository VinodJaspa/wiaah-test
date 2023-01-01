import { Account } from '@entities';

export class IncreamentUserSalesCommand {
  constructor(public userId: string, public amount: number) {}
}

export type IncreamentUserSalesCommandRes = Account;
