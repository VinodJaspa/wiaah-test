import { Inject, UnauthorizedException } from '@nestjs/common';
import { Resolver, Subscription, Query, Args, Context } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlCurrentUser,
  KafkaPubsubService,
  KAFKA_EVENTS,
  SERVICES,
} from 'nest-utils';
import { UserJoinedRoom, UserLeftRoom } from 'nest-dto';
import { ChatMessage, ChatRoom } from '@entities';
import { JoinRoomInput } from '@dto';
import { PubsubWithOnUnsubscribe } from '@utils';

import { CtxDatasources } from '../datasources';

@Resolver()
export class ChatResolver {
  constructor(
    @Inject(SERVICES.SUBSCRIPTIONS.token)
    private readonly eventClient: ClientKafka,
    private readonly pubsub: KafkaPubsubService,
  ) {}

  @Query(() => Boolean)
  tests() {
    this.pubsub.publish(
      KAFKA_EVENTS.SUBSCRIPTIONS.roomDataUpdated('63c56dad08628ba8e29b3154'),
      { roomId: '63c56dad08628ba8e29b3154', id: '63c56dad08628ba8e29b3154' },
    );
    console.log('published');
    return true;
  }

  @Subscription(() => ChatMessage, {
    async resolve(
      this: ChatResolver,
      _payload,
      args,
      ctx: CtxDatasources,
      info,
    ) {
      const payload = this.pubsub.parseKafkaMessagePayload(_payload || {});
      const res =
        await ctx.dataSources.gatewayApi.chat.fetchAndMergeNonPayloadChatMessageData(
          payload.id,
          payload,
          ctx,
          info,
        );

      return res;
    },
    async filter(payload, variables, context: CtxDatasources) {
      console.log('context');
      console.log(JSON.stringify({ payload, variables, context }));
      return true;
    },
  })
  async joinRoom(
    @Args('joinRoomArgs') args: JoinRoomInput,
    @Context() ctx: CtxDatasources<{ user: AuthorizationDecodedUser }>,
  ) {
    if (!ctx.user) throw new UnauthorizedException();
    const hasAccess = ctx.dataSources.gatewayApi.chat.fetchCanAccessChatRoom(
      args.roomId,
      ctx,
    );
    if (!hasAccess) throw new UnauthorizedException();
    this.eventClient.emit(
      KAFKA_EVENTS.CHAT.userJoinedRoom,
      new UserJoinedRoom({
        roomId: args.roomId,
        userId: ctx.user.id,
      }),
    );
    return PubsubWithOnUnsubscribe(
      this.pubsub.listen(
        KAFKA_EVENTS.SUBSCRIPTIONS.chatMessageSent(args.roomId),
      ),
      () => {
        this.eventClient.emit(
          KAFKA_EVENTS.CHAT.userLeftRoom,
          new UserLeftRoom({
            roomId: args.roomId,
            userId: ctx.user.id,
          }),
        );
      },
    );
  }

  @Subscription(() => ChatRoom, {
    resolve(this: ChatResolver, _payload, args, context: CtxDatasources, info) {
      const payload = this.pubsub.parseKafkaMessagePayload(_payload);
      console.log({ payload });
      const res =
        context.dataSources.gatewayApi.chat.fetchAndMergeNonPayloadChatRoomData(
          payload.roomId,
          payload,
          context,
          info,
        );

      return res;
    },
  })
  listenToMyRoomsChanges(
    @GqlCurrentUser({ required: false }) user: AuthorizationDecodedUser,
  ) {
    return this.pubsub.listen(
      KAFKA_EVENTS.SUBSCRIPTIONS.roomDataUpdated(user.id),
    );
  }
}
