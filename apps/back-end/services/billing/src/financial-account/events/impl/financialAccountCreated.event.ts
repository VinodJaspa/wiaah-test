import { IEvent } from '@nestjs/cqrs';
import { FinancialAccountType } from '@prisma-client';

export class FinancialAccountCreatedEvent implements IEvent {
  constructor(
    public acc: {
      accountId: string;
      label: string;
      type: FinancialAccountType;
      cardLast4?: string;
      userId: string;
      cardType: string;
    },
  ) {}
}
