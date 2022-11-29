import { CustomTransportStrategy, ServerKafka } from "@nestjs/microservices";
import { Consumer } from "kafkajs";

export class KafkaCustomTransport
  extends ServerKafka
  implements CustomTransportStrategy
{
  //@ts-ignore
  override async bindEvents(consumer: Consumer): Promise<void> {
    const registeredPatterns = [...this.messageHandlers.entries()].map(
      ([pattern, handler]) =>
        pattern.startsWith("/") && pattern.endsWith("/")
          ? new RegExp(
              pattern.slice(1, pattern.length - 2),
              handler.extras.flags || "i"
            )
          : pattern
    );
    const consumerSubscribeOptions = this.options.subscribe || {};
    const subscribeToPattern = async (pattern: string | RegExp) =>
      consumer.subscribe({
        topic: pattern,
        ...consumerSubscribeOptions,
      });
    await Promise.all(registeredPatterns.map(subscribeToPattern));

    const consumerRunOptions = Object.assign(this.options.run || {}, {
      eachMessage: this.getMessageHandler(),
    });
    //@ts-ignore
    await consumer.run(consumerRunOptions);
  }

  public override getHandlerByPattern(pattern: string) {
    const handler = super.getHandlerByPattern(pattern);
    if (handler) {
      return handler;
    }

    return this.getHandlerByRegExp(pattern);
  }

  private getHandlerByRegExp(pattern: string) {
    const route = this.getRouteFromPattern(pattern);

    const keys = this.messageHandlers.keys();
    for (const key of keys) {
      const regexp = new RegExp(key);
      if (regexp.test(route)) return this.messageHandlers.get(key);
    }

    return null;
  }
}
