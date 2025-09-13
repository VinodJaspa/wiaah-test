// commands/handlers/change-password.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../../repository';
import { ChangePasswordCommand } from '../impl';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly repo: AuthRepository) {}

  execute(command: ChangePasswordCommand): Promise<boolean> {
    const { input, user } = command;
    // console.log('Handling ChangePasswordCommand for user:', user.email , input);
    return this.repo.changeCurrentPassword(input, user);
  }
}
