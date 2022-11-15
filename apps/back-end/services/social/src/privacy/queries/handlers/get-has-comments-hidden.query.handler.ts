import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHasCommentsHiddenQuery } from '@privacy-settings/queries/impl';
import { PrivacySettingsRepository } from '@privacy-settings/repository';

@QueryHandler(GetHasCommentsHiddenQuery)
export class GetHasCommentsHiddenQueryHandler
  implements ICommandHandler<GetHasCommentsHiddenQuery>
{
  constructor(private readonly repo: PrivacySettingsRepository) {}
  async execute({ userId }: GetHasCommentsHiddenQuery): Promise<boolean> {
    const res = await this.repo.getOneByUserId(userId);
    if (!res) return true;

    return res.hideCommentsNum;
  }
}
