import { NotifciationsBaseQueryHandler } from '@manager/abstraction';
import {
  GetUserNotificationsSettingsQuery,
  GetUserNotificationsSettingsQueryRes,
} from '@manager/queries/impl';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserNotificationsSettingsQuery as GetExternalUserNotificationsSettingsQuery } from '@notification-settings/queries';

@QueryHandler(GetUserNotificationsSettingsQuery)
export class GetUserNotificationsSettingsQueryHandler
  extends NotifciationsBaseQueryHandler
  implements IQueryHandler<GetUserNotificationsSettingsQuery>
{
  async execute({
    id,
  }: GetUserNotificationsSettingsQuery): Promise<GetUserNotificationsSettingsQueryRes> {
    const res = await this.querybus.execute<
      GetExternalUserNotificationsSettingsQuery,
      GetUserNotificationsSettingsQueryRes
    >(new GetExternalUserNotificationsSettingsQuery(id));

    return res;
  }
}
