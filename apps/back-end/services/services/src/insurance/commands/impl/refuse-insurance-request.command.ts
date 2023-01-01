import { Insurance } from '@insurance/entities';

export class RefuseInsuranceRequestCommand {
  constructor(public readonly id: string, public readonly userId: string) {}
}

export type RefuseInsuranceRequestCommandRes = Insurance;
