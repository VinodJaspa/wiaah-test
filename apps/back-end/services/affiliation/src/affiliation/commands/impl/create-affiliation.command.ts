import { CreateAffiliationInput } from '@affiliation/dto';

export class CreateAffiliationCommand {
  constructor(
    public readonly input: CreateAffiliationInput,
    public readonly sellerId: string,
  ) {}
}
