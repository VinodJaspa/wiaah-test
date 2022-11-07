import { DynamicModule, Module } from "@nestjs/common";
import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
import { Kafka } from "kafkajs";
import { KafkaPubsubService } from "./kafkaPubsub.service";

export const kafkaPubsubInjectToken = "kafka_pubsub_inject_token";
export const kafkaPubsubKafkaInjectToken = "kafka_pubsub_kafka_inject_token";

export interface KafkaPubsubOpts {
  brokers: string[];
  topic: string;
  groupIdPrefix: string;
  clientId: string;
}

@Module({})
export class KafkaPubsubModule {
  static register(opts: KafkaPubsubOpts): DynamicModule {
    return {
      module: KafkaPubsubModule,
      providers: [
        {
          provide: "OPTIONS",
          useValue: opts,
        },
        {
          provide: "KAFKA_PUBSUB",
          useFactory: async () =>
            await KafkaPubSub.create({
              topic: opts.topic,
              kafka: new Kafka({
                brokers: opts.brokers,
                clientId: opts.clientId,
              }),
              groupIdPrefix: opts.groupIdPrefix,
            }),
        },
        KafkaPubsubService,
      ],
      exports: [KafkaPubsubService],
    };
  }
}
