import { CreateAccountVerificationInput } from '@acc-verification/dto';

export class CreateAccountVerificationRequestCommand {
  constructor(
    public input: CreateAccountVerificationInput,
    public userId: string,
  ) {}
}
