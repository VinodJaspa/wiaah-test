import {
  Directive,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  Subscription,
  Query,
  GraphQLSchemaBuilderModule,
  BuildSchemaOptions,
  ID,
} from '@nestjs/graphql';
import { KafkaPubSub } from 'graphql-kafkajs-subscriptions';
import { Kafka } from 'kafkajs';
import { KAFKA_BROKERS } from 'nest-utils';
import { ChatDataSource } from 'src/datasources';

export const pubsub = KafkaPubSub.create({
  topic: 'subscriptions',
  kafka: new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: 'subscriptions',
  }),
  groupIdPrefix: 'sub-service-group',
});

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
class Product {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@Resolver()
export class ChatResolver {
  @Query(() => Boolean)
  tests() {
    return true;
  }

  @Subscription(() => Product, {
    async resolve(
      _payload,
      args,
      ctx: { dataSources: { gatewayApi: ChatDataSource } },
      info,
    ) {
      const payload = JSON.parse(_payload.value.toString());
      const res =
        await ctx.dataSources.gatewayApi.fetchAndMergeNonPayloadChatMessageData(
          payload.id,
          payload,
          info,
        );

      return res;
    },
  })
  async testquery() {
    return (await pubsub).asyncIterator('subscriptions');
  }
}
