import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Place, PlaceSuggestions } from './entities/place.entity';
import { Inject } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlCurrentUser,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetBulkUsersPaidBookingMessage,
  GetBulkUsersPaidBookingMessageReply,
  GetFilteredServicesMessage,
  GetFilteredServicesMessageReply,
  GetUserMostInteractionersMessage,
  GetUserMostInteractionersMessageReply,
  GetUserPaidBookingMessage,
  GetUserPaidBookingMessageReply,
} from 'nest-dto';
import { GetPlaceSuggestionInput } from './dto/get-place-suggestions.input';

@Resolver(() => PlaceSuggestions)
export class PlacesResolver {
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token) private eventClient: ClientKafka,
  ) {}

  @Query(() => PlaceSuggestions)
  async getPlaceSuggestions(
    @Args('args') args: GetPlaceSuggestionInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<PlaceSuggestions> {
    const {
      results: { data: friends, success },
    } = await KafkaMessageHandler<
      string,
      GetUserMostInteractionersMessage,
      GetUserMostInteractionersMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserMostInteractioners(),
      new GetUserMostInteractionersMessage({
        userId: user.id,
        pagination: {
          page: 1,
          take: 10,
        },
      }),
    );

    if (!success)
      return {
        places: [],
      };

    const {
      results: { data: userPaidBookingsData, success: userPaidBookingsSuccess },
    } = await KafkaMessageHandler<
      string,
      GetUserPaidBookingMessage,
      GetUserPaidBookingMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.BOOKING_MESSAGES.getBookedPaidServices(),
      new GetUserPaidBookingMessage({ userId: user.id }),
    );

    const {
      results: {
        data: friendsPaidBookingsData,
        success: friendsPaidBookingsSuccess,
      },
    } = await KafkaMessageHandler<
      string,
      GetBulkUsersPaidBookingMessage,
      GetBulkUsersPaidBookingMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.BOOKING_MESSAGES.getBulkBookedPaidServices(),
      new GetBulkUsersPaidBookingMessage({
        userIds: friends.users.map((v) => v.id),
        pagination: { page: 1, take: 1000 },
      }),
    );

    const paidBookingsIds = userPaidBookingsSuccess
      ? userPaidBookingsData.bookings.map((v) => v.serviceId)
      : [];
    const friendsPaidBookingsIds = friendsPaidBookingsSuccess
      ? friendsPaidBookingsData.users.reduce(
          (acc, curr) => acc.concat(curr.bookings.map((v) => v.serviceId)),
          [] as string[],
        )
      : [];

    const {
      results: { data: filteredServicesData, success: filteredServicesSuccess },
    } = await KafkaMessageHandler<
      string,
      GetFilteredServicesMessage,
      GetFilteredServicesMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SERVICES_MESSAGES.getFilteredServices(),
      new GetFilteredServicesMessage({
        servicesIds: [friendsPaidBookingsIds, paidBookingsIds].flat(),
        city: user.city,
        country: user.country,
        lat: user.lat,
        lon: user.lon,
        pagination: { page: 1, take: 1000 },
      }),
    );

    const weightedServices: {
      id: string;
      userId: string;
      score: number;
      type: string;
    }[] = [];

    if (filteredServicesSuccess) {
      for (const service of filteredServicesData.services) {
        let serviceScore = 0;

        if (paidBookingsIds.includes(service.id)) serviceScore += 5;

        if (friendsPaidBookingsIds.includes(service.id)) {
          const friendBook = friendsPaidBookingsData.users.find((v) =>
            v.bookings.some((v) => v.serviceId === service.id),
          );
          if (friendBook) {
            const friend = friends.users.find((v) => v.id === friendBook.id);

            if (friend) {
              serviceScore += friend.score + 5;
            }
          }
        }

        if (service.location.country === user.country) serviceScore += 3;

        if (service.location.city === user.city) serviceScore += 3;

        if (service.location.distance) {
          const distanceScore =
            Math.abs(Math.min(service.location.distance, 100) - 100) / 3;

          serviceScore += distanceScore;
        }

        weightedServices.push({
          id: service.id,
          score: serviceScore,
          type: service.type,
          userId: service.userId,
        });
      }
    }

    const sortedServices = weightedServices.sort((x, y) => y.score - x.score);
    console.log('sorted', { sortedServices });
    return { places: sortedServices.map(({ id, type }) => ({ id, type })) };
  }

  @ResolveField(() => [Place])
  places(@Parent() suggestion: PlaceSuggestions) {
    return suggestion.places.map(({ id, type }) => ({
      __typename: 'Place',
      id,
      type,
    }));
  }
}
