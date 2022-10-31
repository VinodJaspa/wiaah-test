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
  HealthCenterService,
} from '@health-center';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SearchHealthCenterInput } from './dto';
import { SearchHealthCenterQuery } from './queries/impl/search-health-centers.query';
import { GqlHealthCenterSelectedFields } from './types';
import { GetHealthCenterByIdQuery } from './queries';

@Resolver(() => HealthCenter)
export class HealthCenterResolver {
  constructor(
    private readonly healthCenterService: HealthCenterService,
    private readonly queryBus: QueryBus,
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
