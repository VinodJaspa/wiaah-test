import { UpdateAffiliationInput } from '@affiliation/dto';

export class UpdateAffiliationCommand {
  constructor(
    public readonly input: UpdateAffiliationInput,
    public readonly sellerId: string,
  ) {}
}
