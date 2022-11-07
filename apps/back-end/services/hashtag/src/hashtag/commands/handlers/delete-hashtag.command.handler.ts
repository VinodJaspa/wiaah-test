import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { HashtagRepository } from '../../repository';
import { Hashtag } from '../../entities';
import { DeleteHashTagCommand } from '../impl';
import { HashtagDeletedEvent } from '../../events';

@CommandHandler(DeleteHashTagCommand)
export class DeleteHashtagCommandHandler
  implements ICommandHandler<DeleteHashTagCommand>
{
  constructor(
    private readonly hashtagRepo: HashtagRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(input: DeleteHashTagCommand): Promise<Hashtag> {
    const tag = await this.hashtagRepo.deleteHashtag(input);
    this.eventBus.publish<HashtagDeletedEvent>(new HashtagDeletedEvent(tag));
    return tag;
  }
}
