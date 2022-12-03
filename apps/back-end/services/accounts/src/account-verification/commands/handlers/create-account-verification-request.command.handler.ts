import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountVerificationRequestCommand } from '@acc-verification/commands/impl';
import { AccountVerificationRepository } from '@acc-verification/repository';

@CommandHandler(CreateAccountVerificationRequestCommand)
export class CreateAccountVerificationRequestCommandHandler
  implements ICommandHandler<CreateAccountVerificationRequestCommand>
{
  constructor(private readonly repo: AccountVerificationRepository) {}

  async execute({
    userId,
    input,
  }: CreateAccountVerificationRequestCommand): Promise<boolean> {
    const res = await this.repo.create(input, userId);
    if (!res) return false;

    return true;
  }
}
