import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationSettingsService } from '@notification-settings/notification-settings.service';
import {
  GetUserNotificationsSettingsQuery,
  GetUserNotificationsSettingsQueryRes,
} from '@notification-settings/queries/impl';

@QueryHandler(GetUserNotificationsSettingsQuery)
export class GetUserNotificationsSettingsQueryHandler
  implements IQueryHandler<GetUserNotificationsSettingsQuery>
{
  constructor(private service: NotificationSettingsService) {}

  async execute({
    userId,
  }: GetUserNotificationsSettingsQuery): Promise<GetUserNotificationsSettingsQueryRes> {
    const settings = await this.service.getOneByUserId(userId);

    return settings;
  }
}
