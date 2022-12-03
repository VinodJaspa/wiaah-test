import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAffiliationPostCommand } from '@affiliation-post/commands/impl';
import { AffiliationPost } from '@affiliation-post/entities';
import { AffiliationPostRepository } from '@affiliation-post/repository';
import { AffiliationPostCreatedEvent } from '@affiliation-post/events';

@CommandHandler(CreateAffiliationPostCommand)
export class CreateAffiliationPostCommandHandlers
  implements ICommandHandler<CreateAffiliationPostCommand>
{
  constructor(
    private readonly repo: AffiliationPostRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    input,
    userId,
  }: CreateAffiliationPostCommand): Promise<AffiliationPost> {
    const res = await this.repo.create(input, userId);

    this.eventbus.publish(new AffiliationPostCreatedEvent(res));

    return res;
  }
}
