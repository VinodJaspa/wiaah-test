import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateUserPrivacySettingsCommand } from '@privacy-settings/commands/impl';
import { PrivacySettings } from '@privacy-settings/entities';
import { PrivacySettingsUpdatedEvent } from '@privacy-settings/events';
import { PrivacySettingsRepository } from '@privacy-settings/repository';

@CommandHandler(UpdateUserPrivacySettingsCommand)
export class UpdateUserPrivacySettingsCommandHandler
  implements ICommandHandler<UpdateUserPrivacySettingsCommand>
{
  constructor(
    private readonly repo: PrivacySettingsRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    input,
    user,
  }: UpdateUserPrivacySettingsCommand): Promise<PrivacySettings> {
    try {
      const res = await this.repo.update(input, user.id);
      this.eventBus.publish(new PrivacySettingsUpdatedEvent(res));
      return res;
    } catch (error) {
      return null;
    }
  }
}
