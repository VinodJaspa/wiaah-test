import { RejectReceivedOrderInput } from '@orders/dto';

export class RejectReceivedOrderCommand {
  constructor(
    public readonly input: RejectReceivedOrderInput,
    public readonly userId: string,
  ) {}
}
