import {
  ActivatePartnerInput,
  AddPartnerInput,
  DeactivatePartnerInput,
  RemovePartnerInput,
} from '@dto';
import { Partner } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PartnersService } from './partners.service';

@Resolver((of) => Partner)
@UseGuards(new GqlAuthorizationGuard(['admin']))
export class PartnersAdminResolver {
  constructor(private readonly partnersService: PartnersService) {}

  @Mutation((type) => Partner)
  addPartner(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('addPartnerArgs') input: AddPartnerInput,
  ): Promise<Partner> {
    return this.partnersService.addPartner(user.id, input);
  }

  @Mutation((type) => Partner)
  removePartner(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('removePartnerArgs') input: RemovePartnerInput,
  ) {
    return this.partnersService.removePartner(user.id, input);
  }

  @Mutation((type) => Partner)
  deactivatePartner(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('deactivatePartnerArgs') input: DeactivatePartnerInput,
  ): Promise<Partner> {
    return this.partnersService.deActivatePartner(user.id, input);
  }

  @Mutation((type) => Partner)
  activatePartner(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('activatePartnerArgs') input: ActivatePartnerInput,
  ): Promise<Partner> {
    return this.partnersService.activatePartner(user.id, input);
  }
}
