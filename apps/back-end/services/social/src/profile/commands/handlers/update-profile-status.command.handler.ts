import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileStatusCommand } from '@profile/commands/impl';
import { ProfileRepository } from '@profile/repository/profile.repository';

@CommandHandler(UpdateProfileStatusCommand)
export class UpdateProfileStatusCommandHandler
  implements ICommandHandler<UpdateProfileStatusCommand>
{
  constructor(private readonly repo: ProfileRepository) {}

  async execute({
    profileId,
    status,
  }: UpdateProfileStatusCommand): Promise<any> {
    await this.repo.updateOneStatus(profileId, status);
  }
}
