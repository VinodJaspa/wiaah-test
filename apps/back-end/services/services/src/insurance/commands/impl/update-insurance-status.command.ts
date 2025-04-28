import { Insurance } from '@insurance/entities';
import { ServiceInsuranceStatusEnum } from 'prismaClient';

export class UpdateInsuranceStatusCommand {
  constructor(
    public id: string,
    public status: ServiceInsuranceStatusEnum,
  ) {}
}

export type UpdateInsuranceStatusCommandRes = Insurance;
