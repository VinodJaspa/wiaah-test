import { AskForRefundInput } from '@refund/dto';

export class CreateRefundRequestCommand {
  constructor(
    public readonly input: AskForRefundInput,
    public readonly userId: string,
  ) {}
}
