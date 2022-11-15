import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHasViewsHiddenQuery } from '@privacy-settings/queries/impl';
import { PrivacySettingsRepository } from '@privacy-settings/repository';

@QueryHandler(GetHasViewsHiddenQuery)
export class GetHasViewsHiddenQueryHandler
  implements IQueryHandler<GetHasViewsHiddenQuery>
{
  constructor(private readonly repo: PrivacySettingsRepository) {}
  async execute({ userId }: GetHasViewsHiddenQuery): Promise<boolean> {
    const res = await this.repo.getOneByUserId(userId);
    if (!res) return false;

    return res.hideViewsNum;
  }
}
