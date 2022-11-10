import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewsletterRepository } from '../../repository';
import { ChangeMyNewsletterSettingsCommand } from '../impl';

@CommandHandler(ChangeMyNewsletterSettingsCommand)
export class ChangeMyNewsletterSettingsCommandHandler
  implements ICommandHandler<ChangeMyNewsletterSettingsCommand>
{
  constructor(private readonly repo: NewsletterRepository) {}

  async execute({
    input,
    user,
  }: ChangeMyNewsletterSettingsCommand): Promise<boolean> {
    let newsletter = await this.repo.getUserNewsLetter(user.id);

    if (!newsletter) newsletter = await this.repo.createNewsLetter(user.id);
    if (!newsletter) return false;

    await this.repo.changeNewsLetterSettings(newsletter.id, input);
    return true;
  }
}
