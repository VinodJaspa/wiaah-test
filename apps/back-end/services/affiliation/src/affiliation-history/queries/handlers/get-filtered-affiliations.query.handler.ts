import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  GetFilteredAffiliationsQuery,
  GetFilteredAffiliationsQueryRes,
  GetUsersByNameQuery,
  GetUsersByNameQueryRes,
  SearchFilteredAffiliationsQuery,
  SearchFilteredAffiliationsQueryRes,
  SearchProductsByTitleQuery,
  SearchProductsByTitleQueryRes,
  SearchServicesByTitleQuery,
  SearchServicesByTitleQueryRes,
} from '@affiliation-history/queries/impl';
import { AffiliationRepository } from '@affiliation/repository';
import { PrismaService } from 'prismaService';
import { Prisma } from '@prisma-client';
import { ExtractPagination } from 'nest-utils';

@QueryHandler(GetFilteredAffiliationsQuery)
export class GetFilteredAffiliationsQueryHandler
  implements IQueryHandler<GetFilteredAffiliationsQuery>
{
  constructor(
    private readonly repo: AffiliationRepository,
    private prisma: PrismaService,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    input: {
      affiliation_link,
      affiliator,
      commission,
      money_generated,
      price,
      purchasedAfter,
      purchasedBefore,
      purchaser,
      seller,
      title,
      pagination,
    },
  }: GetFilteredAffiliationsQuery): Promise<GetFilteredAffiliationsQueryRes> {
    const elagibleIDs = [];
    const filters: Prisma.AffiliationPurchaseWhereInput[] = [];

    let sellersPromise: Promise<GetUsersByNameQueryRes>;
    let buyersPromise: Promise<GetUsersByNameQueryRes>;
    let affiliatorsPromise: Promise<GetUsersByNameQueryRes>;
    let productsPromise: Promise<SearchProductsByTitleQueryRes>;
    let servicesPromise: Promise<SearchServicesByTitleQueryRes>;
    let affiliationsPromise: Promise<SearchFilteredAffiliationsQueryRes>;

    if (purchasedAfter) {
      filters.push({
        createdAt: {
          gte: purchasedAfter,
        },
      });
    }

    if (purchasedBefore) {
      filters.push({
        createdAt: {
          lte: purchasedBefore,
        },
      });
    }

    if (seller) {
      sellersPromise = this.querybus.execute<
        GetUsersByNameQuery,
        GetUsersByNameQueryRes
      >(new GetUsersByNameQuery(seller, pagination));
    }
    if (sellersPromise) {
      const users = await sellersPromise;
      filters.push({
        sellerId: {
          in: users.map((v) => v.id),
        },
      });
    }

    if (purchaser) {
      buyersPromise = this.querybus.execute<
        GetUsersByNameQuery,
        GetUsersByNameQueryRes
      >(new GetUsersByNameQuery(seller, pagination));
    }
    if (buyersPromise) {
      const users = await buyersPromise;
      filters.push({
        purchaserId: {
          in: users.map((v) => v.id),
        },
      });
    }

    if (affiliator) {
      affiliatorsPromise = this.querybus.execute<
        GetUsersByNameQuery,
        GetUsersByNameQueryRes
      >(new GetUsersByNameQuery(seller, pagination));
    }
    if (affiliatorsPromise) {
      const users = await affiliatorsPromise;
      filters.push({
        affiliatorId: {
          in: users.map((v) => v.id),
        },
      });
    }

    if (title) {
      productsPromise = this.querybus.execute(
        new SearchProductsByTitleQuery(
          {
            title,
            price,
          },
          pagination,
        ),
      );
      servicesPromise = this.querybus.execute(
        new SearchServicesByTitleQuery(
          {
            price,
            title,
          },
          pagination,
        ),
      );
    }

    if (productsPromise) {
      const prod = await productsPromise;

      elagibleIDs.push(...prod.map((v) => v.id));
    }

    if (servicesPromise) {
      const services = await servicesPromise;

      elagibleIDs.push(...services.map((v) => v.id));
    }

    if (affiliation_link) {
      affiliationsPromise = this.querybus.execute(
        new SearchFilteredAffiliationsQuery({
          commission,
          link: affiliation_link,
        }),
      );
    }

    if (affiliationsPromise) {
      const affilitions = await affiliationsPromise;

      filters.push({
        affiliatorId: {
          in: affilitions.map((v) => v.id),
        },
      });
    }

    const { skip, take } = ExtractPagination(pagination);

    const res = await this.prisma.affiliationPurchase.findMany({
      where: {
        AND: [
          {
            itemId: {
              in: elagibleIDs,
            },
          },
          ...filters,
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });

    return res;
  }
}
