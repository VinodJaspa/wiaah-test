import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../../repository';
import { ChangePasswordCommand } from '../impl';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly repo: AuthRepository) {}

  execute({ input, user }: ChangePasswordCommand): Promise<boolean> {
    return this.repo.changeCurrentPassword(input, user);
  }
}
