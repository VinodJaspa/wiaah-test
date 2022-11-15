import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteUserPrivacySettingsCommand } from '@privacy-settings/commands/impl';
import { PrivacySettings } from '@privacy-settings/entities';
import { PrivacySettingsDeletedEvent } from '@privacy-settings/events';
import { PrivacySettingsRepository } from '@privacy-settings/repository';

@CommandHandler(DeleteUserPrivacySettingsCommand)
export class DeleteUserPrivacySettingsCommandHandler
  implements ICommandHandler<DeleteUserPrivacySettingsCommand>
{
  constructor(
    private readonly repo: PrivacySettingsRepository,
    private readonly eventbus: EventBus,
  ) {}
  async execute({
    userId,
  }: DeleteUserPrivacySettingsCommand): Promise<PrivacySettings> {
    try {
      const res = await this.repo.delete(userId);
      if (!res) return null;
      this.eventbus.publish(new PrivacySettingsDeletedEvent(res));
      return res;
    } catch (error) {
      return null;
    }
  }
}
