import { Injectable } from '@nestjs/common';
import {
  ExtractPagination,
  getTranslatedResource,
  UserPreferedLang,
} from 'nest-utils';
import {
  Prisma,
  HealthCenterDoctor as PrismaHealthCenterDoctor,
  HealthCenterService as PrismaHealthCenterService,
  HealthCenterSpecialty as PrismaHealthCenterSpecialty,
} from 'prismaClient';
import { PrismaService } from 'prismaService';
import { SearchHealthCenterInput } from '../dto';
import {
  HealthCenter,
  HealthCenterDoctor,
  HealthCenterSpecialty,
} from '../entities';
import { GqlHealthCenterSelectedFields } from '../types';
import { HealthCenterElasticRepository } from './health-center.elastic.repository';

@Injectable()
export class HealthCenterRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticRepo: HealthCenterElasticRepository,
  ) {}

  async searchFilteredHealthCenters(
    input: SearchHealthCenterInput,
    selectedFields: GqlHealthCenterSelectedFields,
    langId: UserPreferedLang,
  ): Promise<HealthCenter[]> {
    const hasQuery = input?.query?.length > 0;

    const ids = hasQuery
      ? await this.elasticRepo.getHealthCentersIds(input.query)
      : [];

    const filters: Prisma.HealthCenterServiceWhereInput[] = [];

    if (ids.length > 0) {
      filters.push({
        id: {
          in: ids,
        },
      });
    }

    if (input.rate) {
      filters.push({
        rating: {
          gte: input.rate,
        },
      });
    }

    if (input.payment_methods) {
      filters.push({
        payment_methods: {
          hasSome: input.payment_methods,
        },
      });
    }

    if (input.speakingLanguage) {
      filters.push({
        doctors: {
          every: {},
        },
      });
    }

    const { skip, take } = ExtractPagination(input.pagination);

    const centers = await this.prisma.healthCenterService.findMany({
      where: {
        AND: filters,
      },
      skip,
      take,
    });

    return centers.map((v) => this.formatHealthCenterService(v, langId));
  }

  formatHealthCenterService(
    input: PrismaHealthCenterService & {
      doctors?: (PrismaHealthCenterDoctor & {
        speciality: PrismaHealthCenterSpecialty;
      })[];
    },
    langId: string,
  ): HealthCenter {
    return {
      ...input,
      policies: getTranslatedResource({
        langId,
        resource: input.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId,
        resource: input.serviceMetaInfo,
      }),
      doctors: Array.isArray(input.doctors)
        ? input.doctors.map((v) => this.formatHealthCenterDoctor(v, langId))
        : [],
    };
  }

  formatHealthCenterDoctor(
    input: PrismaHealthCenterDoctor & {
      speciality: PrismaHealthCenterSpecialty;
    },
    langId: UserPreferedLang,
  ): HealthCenterDoctor {
    return {
      ...input,
      description: getTranslatedResource({
        langId,
        resource: input.description,
      }),
      speciality: input.speciality
        ? this.formatHealthCenterDoctorSpeciality(input.speciality, langId)
        : null,
    };
  }

  formatHealthCenterDoctorSpeciality(
    input: PrismaHealthCenterSpecialty,
    langId: string,
  ): HealthCenterSpecialty {
    return {
      ...input,
      description: getTranslatedResource({
        langId,
        resource: input.description,
      }),
      name: getTranslatedResource({
        langId,
        resource: input.name,
      }),
    };
  }
}
