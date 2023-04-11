import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBeautyCenterStatusCommand } from '@beauty-center/commands/impl';
import { BeautyCenterRepository } from '@beauty-center/repository';
import { BeautyCenterService } from 'prismaClient';

@CommandHandler(UpdateBeautyCenterStatusCommand)
export class UpdateBeautyCenterStatusCommandHandler
  implements ICommandHandler<UpdateBeautyCenterStatusCommand>
{
  constructor(private readonly repo: BeautyCenterRepository) {}

  execute({
    id,
    status,
  }: UpdateBeautyCenterStatusCommand): Promise<BeautyCenterService> {
    return this.repo.updateOneStatus(id, status);
  }
}
