import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveReference,
} from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlSelectedQueryFields,
  UserPreferedLang,
} from 'nest-utils';
import {
  CreateHealthCenterInput,
  UpdateHealthCenterInput,
  HealthCenter,
  HealthCenterSpecialty,
  CreateHealthCenterSpecialityInput,
  Doctor,
} from '@health-center';
import { HealthCenterService } from './health-center.service';
import { QueryBus } from '@nestjs/cqrs';

import { SearchHealthCenterInput } from './dto';
import { SearchHealthCenterQuery } from './queries/impl/search-health-centers.query';
import { GqlHealthCenterSelectedFields } from './types';
import { GetHealthCenterByIdQuery } from './queries';
import { PrismaService } from 'prismaService';
import { HealthCenterDoctorSpeakingLanguage, Prisma } from 'prismaClient';

@Resolver(() => HealthCenter)
export class HealthCenterResolver {
  constructor(
    private readonly healthCenterService: HealthCenterService,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => HealthCenter)
  @UseGuards(new GqlAuthorizationGuard([]))
  getHealthCenter(
    @Args('serviceId') serviceId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<HealthCenter> {
    return this.healthCenterService.getHealthCenter(serviceId, user.id);
  }

  @Mutation(() => HealthCenter)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createHealthCenter(
    @Args('createHealthCenterArgs') args: CreateHealthCenterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<HealthCenter> {
    return this.healthCenterService.createHealthCenterService(args, user.id);
  }

  @Mutation(() => HealthCenter)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  updateHealthCenter(
    @Args('updateHealthCenterArgs') args: UpdateHealthCenterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.healthCenterService.updateHealthCenter(args, user.id);
  }

  @Mutation(() => HealthCenterSpecialty)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  createHealthCenterSpeciality(
    @Args('createHealthCenterSpecialityArgs')
    args: CreateHealthCenterSpecialityInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.healthCenterService.createHealthCenterSpeciality(args, user.id);
  }

  @Query(() => [HealthCenter])
  searchHealthCenters(
    @Args('searchHealthCenterArgs') input: SearchHealthCenterInput,
    @GqlSelectedQueryFields() selectedFields: GqlHealthCenterSelectedFields,
    @GetLang() langId: UserPreferedLang,
  ) {
    return this.queryBus.execute<SearchHealthCenterQuery, HealthCenter[]>(
      new SearchHealthCenterQuery({
        langId,
        selectedFields,
        input,
      }),
    );
  }

  @Query(() => [Doctor])
  searchHealthCenterDoctors(
    @Args('searchHealthCenterArgs') input: SearchHealthCenterInput,
    @GqlSelectedQueryFields() selectedFields: GqlHealthCenterSelectedFields,
    @GetLang() langId: UserPreferedLang,
  ) {
    const filters: Prisma.HealthCenterDoctorWhereInput[] = [];

    const { skip, take } = ExtractPagination(input.pagination);

    if (input.maxPrice) {
      filters.push({
        price: {
          lte: input.maxPrice,
        },
      });
    }

    if (input.minPrice) {
      filters.push({
        price: {
          gte: input.minPrice,
        },
      });
    }

    if (input.payment_methods) {
      filters.push({
        healthCenter: {
          payment_methods: {
            hasSome: input.payment_methods,
          },
        },
      });
    }

    if (input.query) {
      filters.push({
        name: {
          contains: input.query,
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

    if (input.speakingLanguage) {
      filters.push({
        speakingLanguages: {
          hasSome: input.speakingLanguage as HealthCenterDoctorSpeakingLanguage,
        },
      });
    }

    if (input.specialistType) {
      filters.push({
        speciality: {
          name: {
            some: {
              value: {
                contains: input.specialistType,
              },
            },
          },
        },
      });
    }

    return this.prisma.healthCenterDoctor.findMany({
      where: {
        AND: filters,
      },
      include: {
        healthCenter: true,
      },
      take,
      skip,
    });
  }

  @ResolveReference()
  resloveRef(
    { id }: { __typename: string; id: string },
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields() fields: GqlHealthCenterSelectedFields,
    @GetLang() langId: UserPreferedLang,
  ) {
    return this.queryBus.execute<GetHealthCenterByIdQuery>(
      new GetHealthCenterByIdQuery({
        id,
        langId,
        selectedFields: fields,
        userId: user.id,
      }),
    );
  }
}
