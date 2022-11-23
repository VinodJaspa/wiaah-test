import { AffiliationPostRepository } from '@affiliation-post/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserAffiliationPostsQuery } from '@affiliation-post/queries/impl';
import { AffiliationPost } from '@affiliation-post/entities';

@QueryHandler(GetUserAffiliationPostsQuery)
export class GetUserAffiliationPostsQueryHandler
  implements IQueryHandler<GetUserAffiliationPostsQuery>
{
  constructor(private readonly repo: AffiliationPostRepository) {}

  async execute({
    userId,
    authorId,
    pagination,
  }: GetUserAffiliationPostsQuery): Promise<AffiliationPost[]> {
    const res = await this.repo.getAllByAuthorId(authorId, pagination);
    return res;
  }
}
