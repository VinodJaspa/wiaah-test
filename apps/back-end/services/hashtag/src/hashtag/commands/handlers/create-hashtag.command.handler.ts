import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { HashtagRepository } from '../../repository';
import { Hashtag } from '../../entities';
import { CreateHashtagCommand } from '../impl';
import { HashtagCreatedEvent } from 'src/hashtag/events';

@CommandHandler(CreateHashtagCommand)
export class CreateHashtagCommandHandler
  implements ICommandHandler<CreateHashtagCommand>
{
  constructor(
    private readonly hashtagRepo: HashtagRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(input: CreateHashtagCommand): Promise<Hashtag> {
    const tag = await this.hashtagRepo.createHashtag(input);
    this.eventBus.publish<HashtagCreatedEvent>(new HashtagCreatedEvent(tag));
    return tag;
  }
}
