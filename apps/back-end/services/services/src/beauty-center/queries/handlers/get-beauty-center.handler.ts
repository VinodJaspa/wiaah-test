import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BeautyCenterRepository } from '../../repository';
import { BeautyCenter } from '../../entities';
import { GetBeautyCenterByIdQuery } from '../impl';

@QueryHandler(GetBeautyCenterByIdQuery)
export class GetBeautyCenterByIdQueryHandler
  implements IQueryHandler<GetBeautyCenterByIdQuery>
{
  constructor(private readonly beautyCenterRepo: BeautyCenterRepository) {}

  execute({
    args: { id, langId, selectedFields, userId },
  }: GetBeautyCenterByIdQuery): Promise<BeautyCenter> {
    return this.beautyCenterRepo.getBeautyCenterById(
      id,
      userId,
      langId,
      selectedFields,
    );
  }
}
