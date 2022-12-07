import { GetUserNotificationsSettingsQueryRes as _res } from '@notification-settings/queries/impl';

export class GetUserNotificationsSettingsQuery {
  constructor(public id: string) {}
}

export type GetUserNotificationsSettingsQueryRes = _res;
