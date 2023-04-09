import { Resolver } from '@nestjs/graphql';
import { ServiceOwnershipService } from './service-ownership.service';
import { ServiceOwnership } from './entities/service-ownership.entity';

@Resolver(() => ServiceOwnership)
export class ServiceOwnershipResolver {
  constructor(
    private readonly serviceOwnershipService: ServiceOwnershipService,
  ) {}
}
