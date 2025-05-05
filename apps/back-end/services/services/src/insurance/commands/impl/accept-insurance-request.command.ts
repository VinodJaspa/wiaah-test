import { Insurance } from '@insurance/entities';

export class AcceptInsuranceRequestCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}

export type AcceptInsuranceRequestCommandRes = Insurance;
