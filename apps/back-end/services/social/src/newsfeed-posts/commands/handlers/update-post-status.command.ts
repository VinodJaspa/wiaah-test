import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostStatusCommand } from '@posts-newsfeed/commands/impl';
import { NewsfeedPostsRepository } from '@posts-newsfeed/repository';

@CommandHandler(UpdatePostStatusCommand)
export class UpdatePostStatusCommandHandler
  implements ICommandHandler<UpdatePostStatusCommand>
{
  constructor(private readonly repo: NewsfeedPostsRepository) {}

  async execute({ postId, status }: UpdatePostStatusCommand): Promise<any> {
    await this.repo.updateOneStatus(postId, status);
  }
}
