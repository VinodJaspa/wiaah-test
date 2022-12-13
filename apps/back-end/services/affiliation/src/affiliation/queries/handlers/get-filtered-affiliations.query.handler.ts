import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';
import {
  GetFilteredAffiliationsQuery,
  GetFilteredAffiliationsQueryRes,
} from '../impl';

@QueryHandler(GetFilteredAffiliationsQuery)
export class GetFilteredAffiliationsQueryHandler
  implements IQueryHandler<GetFilteredAffiliationsQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  execute({
    input: { commission, createdAfter, createdBefore, link, price, seller },
  }: GetFilteredAffiliationsQuery): Promise<GetFilteredAffiliationsQueryRes> {
    const filters: Prisma.AffiliationWhereInput[] = [];

    if (commission) {
      filters.push({
        commision: commission,
      });
    }
    if (createdAfter) {
      filters.push({
        createdAt: {
          lte: createdAfter,
        },
      });
    }
    if (createdBefore) {
      filters.push({
        createdAt: {
          gte: createdAfter,
        },
      });
    }

    return this.prisma.affiliation.findMany({
      where: {
        AND: [],
      },
    });
  }
}
