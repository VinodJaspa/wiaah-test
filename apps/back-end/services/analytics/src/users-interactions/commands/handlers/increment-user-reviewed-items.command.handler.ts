import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersInteractions } from '@prisma-client';
import { USER_INTERACTION_SCORE } from '@users-interations/const';
import {
  NumInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';
import { IncrementUserReviewedItemsCommand } from '../impl';

@CommandHandler(IncrementUserReviewedItemsCommand)
export class IncrementUserReviewedItemsCommandHandler
  implements ICommandHandler<IncrementUserReviewedItemsCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}

  async execute({
    authorId,
    userId,
  }: IncrementUserReviewedItemsCommand): Promise<UsersInteractions> {
    const res = await this.repo.update(userId, authorId, {
      reviewedItems: {
        type: NumInputTypeEnum.increment,
        value: 1,
      },
      interactionScore: {
        type: NumInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.reviewingItem,
      },
    });

    return res;
  }
}
