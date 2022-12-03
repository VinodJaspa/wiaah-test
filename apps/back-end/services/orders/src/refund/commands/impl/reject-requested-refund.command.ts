import { RejectRefundRequestInput } from '@refund/dto';

export class RejectRequestedRefundCommand {
  constructor(
    public readonly input: RejectRefundRequestInput,
    public readonly userId: string,
  ) {}
}
