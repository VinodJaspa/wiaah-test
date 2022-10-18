import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HealthCenter } from './entities';
import { HealthCenterService } from './health-center.service';

@Resolver(() => HealthCenter)
export class HealthCenterResolver {
  constructor(private readonly healthCenterService: HealthCenterService) {}
}
