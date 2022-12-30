import { WithdrawalRequest } from '@prisma-client';

export class WithdrawalProcessedEvent {
  constructor(public withdrawal: WithdrawalRequest) {}
}
