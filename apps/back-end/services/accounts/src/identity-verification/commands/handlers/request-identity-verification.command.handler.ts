import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestIdentityVerificationCommand } from '../impl';
import { IdentityVerificationRepository } from '../../repository';

@CommandHandler(RequestIdentityVerificationCommand)
export class RequestIdentityVerificationCommandHandler
  implements ICommandHandler<RequestIdentityVerificationCommand>
{
  constructor(private readonly repo: IdentityVerificationRepository) {}

  execute({
    input,
    user,
  }: RequestIdentityVerificationCommand): Promise<string> {
    return this.repo.createRequest(input, user.id);
  }
}
