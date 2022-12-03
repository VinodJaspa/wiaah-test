import { CreateMessageInput } from '../../dto';

export class SendMessageCommand {
  constructor(
    public readonly input: {
      message: Omit<CreateMessageInput, 'roomId'> & { roomId: string };
      userId: string;
    },
  ) {}
}
