import { Insurance } from '@insurance/entities';

export class RequestInsurancePaybackCommand {
  constructor(public readonly bookId: string, public userId: string) {}
}

export type RequestInsurancePaybackCommandRes = Insurance;
