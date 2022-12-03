import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { IdentityVerificationRepository } from '../../repository';
import { ProvideVVCPictureCommand } from '../impl';

@CommandHandler(ProvideVVCPictureCommand)
export class ProvideVVCPictureCommandHandler
  implements ICommandHandler<ProvideVVCPictureCommand>
{
  constructor(public repo: IdentityVerificationRepository) {}

  execute({ pic, user }: ProvideVVCPictureCommand): Promise<boolean> {
    return this.repo.provideVVCPicture(pic, user.id);
  }
}
