import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  CreateHealthCenterInput,
  UpdateHealthCenterInput,
  HealthCenter,
  HealthCenterSpecialty,
  CreateHealthCenterSpecialityInput,
  HealthCenterService,
} from '@health-center';

@Resolver(() => HealthCenter)
export class HealthCenterResolver {
  constructor(private readonly healthCenterService: HealthCenterService) {}

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
}
