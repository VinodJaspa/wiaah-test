import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserAuthSettingsCommand } from '@auth-settings/commands/impl';
import { UserAuthSetting } from '@auth-settings/entities';
import { UserAuthSettingsRepository } from '@auth-settings/repository';

@CommandHandler(CreateUserAuthSettingsCommand)
export class CreateUserAuthSettingsCommandHandler
  implements ICommandHandler<CreateUserAuthSettingsCommand>
{
  constructor(private readonly repo: UserAuthSettingsRepository) {}

  async execute({
    accountId,
  }: CreateUserAuthSettingsCommand): Promise<UserAuthSetting> {
    const res = await this.repo.create(accountId);
    return res;
  }
}
