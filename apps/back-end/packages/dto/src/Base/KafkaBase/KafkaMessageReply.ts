export interface KafkaMessageInterface {
  toString(): string;
}

export class KafkaMessageReply<TData, TError extends Error = Error>
  implements KafkaMessageInterface
{
  constructor(
    public results: {
      success: boolean;
      data: TData;
      error: TError;
    }
  ) {}
  toString(): string {
    return JSON.stringify({
      results: this.results,
    });
  }
}
