import { CreateMessageInput } from '../../dto';

export class SendMessageToUserCommand {
  constructor(public userId: string, public input: CreateMessageInput) {}
}
