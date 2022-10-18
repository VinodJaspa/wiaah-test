import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServiceOwnershipService } from './service-ownership.service';
import { ServiceOwnership } from './entities/service-ownership.entity';
import { CreateServiceOwnershipInput } from './dto/create-service-ownership.input';
import { UpdateServiceOwnershipInput } from './dto/update-service-ownership.input';

@Resolver(() => ServiceOwnership)
export class ServiceOwnershipResolver {
  constructor(
    private readonly serviceOwnershipService: ServiceOwnershipService,
  ) {}
}
