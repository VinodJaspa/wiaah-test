import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { ServiceType } from 'prismaClient';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { GetFilteredServicesInput } from './dto/get-filtered-services.input';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @ResolveReference()
  reslove(ref: { id: string; type: ServiceType }) {
    return this.serviceService.getServiceByIdAndType(ref?.id, ref?.type);
  }

  @Query(() => [Service])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getAllServices(@Args('args') args: GetFilteredServicesInput) {
    const { page, skip } = ExtractPagination(args.pagination);

    return [];
  }
}
