import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HashtagRepository } from '../../repository';
import { Hashtag } from '../../entities';
import {
  DecrementHashtagUsageCommand,
  IncrementHashtagUsageCommand,
} from '../impl';

@CommandHandler(IncrementHashtagUsageCommand)
export class IncrementHashtagUsageCommandHandler
  implements ICommandHandler<IncrementHashtagUsageCommand>
{
  constructor(private readonly hashtagRepo: HashtagRepository) {}

  execute({ id }: IncrementHashtagUsageCommand): Promise<Hashtag> {
    return this.hashtagRepo.incrementHashtagUsage(id);
  }
}

@CommandHandler(DecrementHashtagUsageCommand)
export class DecrementHashtagUsageCommandHandler
  implements ICommandHandler<DecrementHashtagUsageCommand>
{
  constructor(private readonly hashtagRepo: HashtagRepository) {}

  execute({ id }: DecrementHashtagUsageCommand): Promise<Hashtag> {
    return this.hashtagRepo.decrementHashtagUsage(id);
  }
}
