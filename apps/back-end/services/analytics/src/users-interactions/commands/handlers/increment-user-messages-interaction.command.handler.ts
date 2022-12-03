import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { USER_INTERACTION_SCORE } from '@users-interations/const';
import {
  NumInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';
import { IncrementUserMessagesInteractionCommand } from '../impl';

@CommandHandler(IncrementUserMessagesInteractionCommand)
export class IncrementUserMessagesInteractionCommandHandler
  implements ICommandHandler<IncrementUserMessagesInteractionCommand>
{
  constructor(public readonly repo: UsersInteractionsRepository) {}

  async execute({
    sendById,
    sendToId,
  }: IncrementUserMessagesInteractionCommand): Promise<any> {
    const res = await this.repo.update(sendById, sendToId, {
      messages: {
        type: NumInputTypeEnum.increment,
        value: 1,
      },
      interactionScore: {
        type: NumInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.message,
      },
    });

    return res;
  }
}
