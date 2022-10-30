import { KafkaMessageInterface } from "./KafkaMessageReply";

export class KafkaMessage<TInput, THeaders = {}>
  implements KafkaMessageInterface
{
  constructor(public input: TInput, public headers?: THeaders) {}

  toString(): string {
    return JSON.stringify({
      input: this.input,
      headers: this.headers || {},
    });
  }
}
