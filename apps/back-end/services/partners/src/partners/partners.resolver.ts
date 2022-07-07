import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PartnersService } from './partners.service';
import { PaginatedPartners, Partner } from '@entities';
import { AddPartnerInput, GetPartnersInput } from '@dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthorizationGuard } from 'nest-utils';

@Resolver(() => Partner)
export class PartnersResolver {
  constructor(private readonly partnersService: PartnersService) {}

  @Query((type) => PaginatedPartners)
  getPartners(
    @Args('getPartnersArgs') input: GetPartnersInput,
  ): Promise<PaginatedPartners> {
    return this.partnersService.getPartners(input);
  }
}
