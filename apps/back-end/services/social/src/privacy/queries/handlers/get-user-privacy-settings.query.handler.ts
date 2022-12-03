import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrivacySettingsRepository } from '@privacy-settings/repository';
import { GetUserPrivacySettingsQuery } from '@privacy-settings/queries/impl';
import { PrivacySettings } from '@privacy-settings/entities';

@QueryHandler(GetUserPrivacySettingsQuery)
export class GetUserPrivacySettingsQueryHandler
  implements IQueryHandler<GetUserPrivacySettingsQuery>
{
  constructor(private readonly repo: PrivacySettingsRepository) {}

  async execute({
    userId,
  }: GetUserPrivacySettingsQuery): Promise<PrivacySettings> {
    const res = await this.repo.getOneByUserId(userId);

    return res;
  }
}
