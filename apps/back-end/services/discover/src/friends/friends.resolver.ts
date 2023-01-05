import { Inject, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { Account, FriendSuggestion } from './entities/friend.entity';
import {
  GetBulkUserMostInteractionersMessage,
  GetBulkUserMostInteractionersMessageReply,
  GetUserMostInteractionersMessage,
  GetUserMostInteractionersMessageReply,
} from 'nest-dto';

@Resolver(() => FriendSuggestion)
@UseGuards(new GqlAuthorizationGuard([]))
export class FriendsResolver {
  constructor(
    @Inject(SERVICES.DISCOVER.token)
    private readonly eventClinet: ClientKafka,
  ) {}

  @Query(() => FriendSuggestion)
  async getMyFriendSuggestions(
    @GqlCurrentUser() account: AuthorizationDecodedUser,
  ): Promise<FriendSuggestion> {
    let users: Account[] = [];

    const {
      results: { data, success },
    } = await KafkaMessageHandler<
      string,
      GetUserMostInteractionersMessage,
      GetUserMostInteractionersMessageReply
    >(
      this.eventClinet,
      KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserMostInteractioners(),
      new GetUserMostInteractionersMessage({
        userId: account.id,
        pagination: {
          page: 1,
          take: 10,
        },
      }),
    );

    if (success) {
      const {
        results: { data: bulkUsers, success },
      } = await KafkaMessageHandler<
        string,
        GetBulkUserMostInteractionersMessage,
        GetBulkUserMostInteractionersMessageReply
      >(
        this.eventClinet,
        KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserMostInteractioners(),
        new GetBulkUserMostInteractionersMessage({
          userIds: data.users.map((v) => v.id),
          pagination: {
            page: 1,
            take: 5,
          },
        }),
      );

      if (success) {
        const users = bulkUsers.users.reduce((acc, { users, id }) => {
          const userScore = data?.users?.find((u) => u.id === id)?.score || 0;
          const formatedUsers = users.map(({ id, score }) => ({
            id,
            finaleScore: userScore + score,
          }));

          return [...acc, ...formatedUsers];
        }, [] as { id: string; finaleScore: number }[]);

        const sorted = users.sort(
          (first, second) => second.finaleScore - first.finaleScore,
        );

        return {
          accounts: sorted,
        };
      }
      return {
        accounts: [],
      };
    }

    return {
      accounts: users,
    };
  }

  @ResolveField(() => [Account])
  accounts(@Parent() parant: FriendSuggestion) {
    return parant.accounts.map((v) => ({ __typename: 'Account', id: v.id }));
  }
}
