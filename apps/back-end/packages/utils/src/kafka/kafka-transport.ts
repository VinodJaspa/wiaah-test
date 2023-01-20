import { CustomTransportStrategy, ServerKafka } from "@nestjs/microservices";
import { Consumer } from "@nestjs/microservices/external/kafka.interface";

export class KafkaCustomTransport
  extends ServerKafka
  implements CustomTransportStrategy
{
  override async bindEvents(consumer: Consumer): Promise<void> {
    console.log({ handlers: this.messageHandlers });
    const registeredPatterns = [...this.messageHandlers.entries()].map(
      ([pattern, handler]) => {
        return pattern?.startsWith("/") && pattern.endsWith("/")
          ? new RegExp(
              pattern.slice(1, pattern.length - 1),
              handler?.extras?.flags || "i"
            )
          : pattern;
      }
    );
    const consumerSubscribeOptions = this.options?.subscribe || {};
    const subscribeToPattern = async (pattern: string | RegExp) => {
      await consumer.subscribe({
        topic: pattern,
        ...consumerSubscribeOptions,
      });
    };
    await Promise.all(registeredPatterns.map(subscribeToPattern));

    const consumerRunOptions = Object.assign(this.options?.run || {}, {
      eachMessage: this.getMessageHandler(),
    });
    await consumer.run(consumerRunOptions);
  }

  //@ts-ignore
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
    for (const _key of keys) {
      const key = _key.split("/")[1] || _key;
      const regexp = new RegExp(key, "i");
      if (regexp.test(route)) return this.messageHandlers.get(_key);
    }

    return null;
  }
}
