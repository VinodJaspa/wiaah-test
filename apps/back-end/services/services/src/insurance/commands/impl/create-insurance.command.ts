import { CreateInsuranceInput } from '@insurance/dto';
import { Insurance } from '@insurance/entities';

export class CreateInsuranceCommand {
  constructor(public input: CreateInsuranceInput) {}
}

export type CreateInsuranceCommandRes = Insurance | null;
