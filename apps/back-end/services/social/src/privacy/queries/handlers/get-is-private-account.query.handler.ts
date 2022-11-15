import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIsPrivateAccountQuery } from '@privacy-settings/queries/impl';
import { PrivacySettingsRepository } from '@privacy-settings/repository';

@QueryHandler(GetIsPrivateAccountQuery)
export class GetIsPrivateAccountQueryHandler
  implements IQueryHandler<GetIsPrivateAccountQuery>
{
  constructor(private readonly repo: PrivacySettingsRepository) {}

  async execute({ userId }: GetIsPrivateAccountQuery): Promise<boolean> {
    const res = await this.repo.getOneByUserId(userId);
    if (!res) return true;

    return res.privateAccount;
  }
}
