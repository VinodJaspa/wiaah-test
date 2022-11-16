import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserPrivacySettingsCommand } from '@privacy-settings/commands/impl';
import { PrivacySettings } from '@privacy-settings/entities';
import { PrivacySettingsCreatedEvent } from '@privacy-settings/events';
import { PrivacySettingsRepository } from '@privacy-settings/repository';

@CommandHandler(CreateUserPrivacySettingsCommand)
export class CreateUserPrivacySettingsCommandHandler
  implements ICommandHandler<CreateUserPrivacySettingsCommand>
{
  constructor(
    private readonly repo: PrivacySettingsRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    userId,
  }: CreateUserPrivacySettingsCommand): Promise<PrivacySettings> {
    const res = await this.repo.create(userId);

    this.eventbus.publish(new PrivacySettingsCreatedEvent(res));
    return res;
  }
}
