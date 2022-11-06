import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoryRepository } from '../../repository';
import { Story } from '../../entities';
import { CreateStoryCommand } from '../impl';

@CommandHandler(CreateStoryCommand)
export class CreateStoryCommandHandler
  implements ICommandHandler<CreateStoryCommand>
{
  constructor(private readonly StoryRepo: StoryRepository) {}
  async execute({ input, user }: CreateStoryCommand): Promise<Story> {
    const story = await this.StoryRepo.create(input, user.id);

    return story;
  }
}
