import { UnauthorizedException } from '@nestjs/common';
import {
  Directive,
  Field,
  ObjectType,
  Resolver,
  Subscription,
  Query,
  ID,
  Args,
  InputType,
  Context,
} from '@nestjs/graphql';
import { AuthorizationDecodedUser, KafkaPubsubService } from 'nest-utils';

import { CtxDatasources } from '../datasources';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
class ChatMessage {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@InputType()
class JoinRoomInput {
  @Field(() => ID)
  roomId: string;
}

@Resolver()
export class ChatResolver {
  constructor(private readonly pubsub: KafkaPubsubService) {}

  @Query(() => Boolean)
  tests() {
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
    return this.pubsub.listen(`chat-room.${args.roomId}`);
  }
}
