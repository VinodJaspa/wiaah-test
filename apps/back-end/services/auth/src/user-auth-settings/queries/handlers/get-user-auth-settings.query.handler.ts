import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserAuthSettingsQuery } from '@auth-settings/queries';
import { UserAuthSettingsRepository } from '@auth-settings/repository';
import { UserAuthSetting } from '@auth-settings/entities';

@QueryHandler(GetUserAuthSettingsQuery)
export class GetUserAuthSettingsQueryHandler
  implements IQueryHandler<GetUserAuthSettingsQuery>
{
  constructor(private readonly repo: UserAuthSettingsRepository) {}

  async execute({ id }: GetUserAuthSettingsQuery): Promise<UserAuthSetting> {
    let res = await this.repo.getOne(id);

    if (!res) res = await this.repo.create(id);

    return res;
  }
}
