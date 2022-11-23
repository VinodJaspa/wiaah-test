import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductPost } from '@product-post/entities';
import { ProductPostRepository } from '@product-post/repository';
import { GetUserProductPostsQuery } from '../impl';

@QueryHandler(GetUserProductPostsQuery)
export class GetUserProductPostsQueryHandler
  implements IQueryHandler<GetUserProductPostsQuery>
{
  constructor(private readonly repo: ProductPostRepository) {}

  async execute({
    authorId,
    userId,
    pagination,
  }: GetUserProductPostsQuery): Promise<ProductPost[]> {
    const res = await this.repo.getAllByAuthorId(authorId, pagination);

    return res;
  }
}
