import { Account } from '@entities';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { RestaurantEstablishmentType } from '@restaurant';
import { UploadService } from '@wiaah/upload';
import { WorkingSchedule } from '@working-schedule/entities';
import { GetLang, UserPreferedLang } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Service } from './entities/service.entity';

@Resolver(() => Service)
export class ServiceDetailsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  @Query(() => Service, { nullable: true })
  async getServiceDetails(
    @Args('id') id: string,
    @GetLang() lang: UserPreferedLang,
  ): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (service.status !== 'active') return null;
    return service as any; // TODO: format service data to user prefered lang
  }

  @ResolveReference()
  reslove(ref: { id: string }) {
    return this.prisma.service.findUnique({
      where: {
        id: ref.id,
      },
    });
  }

  @ResolveField(() => WorkingSchedule, { nullable: true })
  workingHours(@Parent() service: Service) {
    return this.prisma.serviceWorkingSchedule.findUnique({
      where: {
        id: service.id,
      },
    });
  }

  @ResolveField(() => Account)
  owner(@Parent() service: Service) {
    return {
      __typename: 'Account',
      id: service.ownerId,
    };
  }

  @ResolveField(() => RestaurantEstablishmentType)
  establishmentType(@Parent() service: Service) {
    if (service.establishmentTypeId) {
      return this.prisma.restaurantEstablishmentType.findUnique({
        where: {
          id: service.establishmentTypeId,
        },
      });
    } else return null;
  }
}
