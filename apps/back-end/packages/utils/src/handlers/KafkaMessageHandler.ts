import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom, timeout as rxjsTimeout, catchError } from "rxjs";
import { throwError } from "rxjs";

export function KafkaMessageHandler<TPattern, TInput, TData>(
  client: ClientKafka,
  messagePattern: TPattern,
  input: TInput,
  timeoutErrMessage = `service timed out: ${messagePattern}`,
  timeout = 5000
): Promise<TData> {
  return firstValueFrom(
    client.send<TData>(messagePattern, input).pipe(
      rxjsTimeout(timeout),
      catchError((err) => {
        return throwError(() => new Error(timeoutErrMessage));
      })
    )
  );
}
