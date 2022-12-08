import { Insurance } from '@insurance/entities';

export class GetInsuranceByIdQuery {
  constructor(public id: string, public userId: string) {}
}

export type GetInsuranceByIdQueryRes = Insurance;
