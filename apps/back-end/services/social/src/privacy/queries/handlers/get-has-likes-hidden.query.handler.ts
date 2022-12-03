import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHasLikesHiddenQuery } from '@privacy-settings/queries/impl';
import { PrivacySettingsRepository } from '@privacy-settings/repository';

@QueryHandler(GetHasLikesHiddenQuery)
export class GetHasLikesHiddenQueryHandler
  implements IQueryHandler<GetHasLikesHiddenQuery>
{
  constructor(private readonly repo: PrivacySettingsRepository) {}
  async execute({ userId }: GetHasLikesHiddenQuery): Promise<boolean> {
    const res = await this.repo.getOneByUserId(userId);
    if (!res) return false;

    return res.hideLikesNum;
  }
}
