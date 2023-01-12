import { Injectable } from '@nestjs/common';
import {
  ExtractPagination,
  getTranslatedResource,
  UserPreferedLang,
} from 'nest-utils';
import {
  Prisma,
  BeautyCenterService as PrismaBeautyCenterService,
  ServiceStatus,
} from 'prismaClient';
import { PrismaService } from 'prismaService';
import { SearchFilteredBeautyCenterInput } from '../dto';
import { BeautyCenter } from '../entities';
import { GqlBeautyCenterSelectedFields } from '../types';
import { BeautyCenterElasticRepository } from './beauty-center.elastic.repository';

@Injectable()
export class BeautyCenterRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticDbRepo: BeautyCenterElasticRepository,
  ) {}

  async updateOneStatus(id: string, status: ServiceStatus) {
    return this.prisma.beautyCenterService.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async getBeautyCenterById(
    id: string,
    userId: string,
    langId: UserPreferedLang,
    selectedFields: GqlBeautyCenterSelectedFields,
  ): Promise<BeautyCenter> {
    const res = await this.prisma.beautyCenterService.findUnique({
      where: {
        id,
      },
    });
    return this.formatBeautyCenterServiceData(res, langId);
  }

  async searchFilteredBeautyCenter(
    input: SearchFilteredBeautyCenterInput,
    langId: UserPreferedLang,
  ): Promise<BeautyCenter[]> {
    const hasQuery = input?.query?.length > 0;

    const ids = hasQuery
      ? await this.elasticDbRepo.searchBeautyCenterIds(input.query)
      : [];

    const filters: Prisma.BeautyCenterServiceWhereInput[] = [];

    if (Array.isArray(ids) && ids.length > 0) {
      filters.push({
        id: {
          in: ids,
        },
      });
    }

    if (input.beautyCenterTypeId) {
      filters.push({
        beauty_center_typeId: input.beautyCenterTypeId,
      });
    }

    if (input.beautySalonTypeId) {
      // filters.push({
      // })
    }

    if (input.rating) {
      filters.push({
        rating: {
          gte: input.rating,
        },
      });
    }

    if (input.maxPrice && input.minPrice) {
      filters.push({
        lowest_price: {
          gte: input.minPrice,
        },
        heigest_price: {
          lte: input.maxPrice,
        },
      });
    } else if (input.maxPrice) {
      filters.push({
        heigest_price: {
          lte: input.maxPrice,
        },
      });
    } else if (input.minPrice) {
      filters.push({
        lowest_price: {
          gte: input.minPrice,
        },
      });
    }

    if (input.treatmentTypeId) {
      filters.push({
        treatments: {
          some: {
            treatmentCategoryId: input.treatmentTypeId,
          },
        },
      });
    }

    const { skip, take } = ExtractPagination(input.pagination);

    const centers = await this.prisma.beautyCenterService.findMany({
      where: {
        AND: filters,
      },
      skip,
      take,
    });

    return centers.map((v) => this.formatBeautyCenterServiceData(v, langId));
  }

  private formatBeautyCenterServiceData(
    input: Partial<PrismaBeautyCenterService>,
    langId: string,
  ): BeautyCenter {
    return {
      ...input,
      policies: getTranslatedResource({
        langId,
        resource: input?.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId,
        resource: input?.serviceMetaInfo,
      }),
      treatments: Array.isArray(input?.treatments)
        ? input?.treatments.map((v) => ({
            ...v,
            title: getTranslatedResource({
              langId,
              resource: v.title,
            }),
          }))
        : [],
    } as BeautyCenter;
  }
}
