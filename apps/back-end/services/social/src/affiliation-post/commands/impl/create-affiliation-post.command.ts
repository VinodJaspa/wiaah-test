import { CreateAffiliationPostInput } from '@affiliation-post/dto';

export class CreateAffiliationPostCommand {
  constructor(
    public readonly input: CreateAffiliationPostInput,
    public readonly userId: string,
  ) {}
}
