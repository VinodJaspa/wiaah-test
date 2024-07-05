import { Inject, Injectable } from "@nestjs/common";
import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
import { KafkaMessage } from "kafkajs";
import {
  kafkaPubsubInjectToken,
  kafkaPubsubKafkaInjectToken,
} from "./kafkaPubsub.module";
import type { KafkaPubsubOpts } from "./kafkaPubsub.module";

interface KafkaPubsubImpl {
  publish(event: string, data: any): void;
  listen<TData = any>(events: string | string[]): AsyncIterator<TData>;
}

@Injectable()
export class KafkaPubsubService implements KafkaPubsubImpl {
  constructor(
    @Inject("OPTIONS")
    private readonly options: KafkaPubsubOpts,
    @Inject("KAFKA_PUBSUB")
    private readonly pubsub: KafkaPubSub
  ) { }

  publish<TData>(event: string, data: TData): void {
    this.pubsub.publish(event, JSON.stringify(data));
  }
  listen<TData = any>(event: string): AsyncIterator<TData> {
    console.log("tests");
    return this.pubsub.asyncIterator(event);
  }

  parseKafkaMessagePayload<TMessage = any>(msg: KafkaMessage): TMessage {
    return JSON.parse(msg?.value?.toString() || "");
  }
}
