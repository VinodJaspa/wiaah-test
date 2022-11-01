import { CreateMessageInput } from '../../dto';

export class SendMessageCommand {
  constructor(
    public readonly input: {
      message: CreateMessageInput;
      userId: string;
    },
  ) {}
}
