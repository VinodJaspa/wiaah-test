import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserLocation } from './entities/user-location.entity';
import { UpdateUserLocationInput } from '@user-location/dto';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_EVENTS,
  SERVICES,
} from 'nest-utils';
import { UserCurrentLocationUpdateEvent } from 'nest-dto';

@Resolver(() => UserLocation)
@UseGuards(new GqlAuthorizationGuard([]))
export class UserLocationResolver {
  constructor(
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Mutation(() => Boolean)
  updateUserLocation(
    @Args('updateLocation') args: UpdateUserLocationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    this.eventClient.emit(
      KAFKA_EVENTS.USER_EVENTS.userCurrLocationChanged(),
      new UserCurrentLocationUpdateEvent({
        id: user.id,
        lat: args.lat,
        lon: args.lon,
      }),
    );
  }
}
