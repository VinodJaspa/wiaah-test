import { HealthCenterRepository } from '@health-center/repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HealthCenterService } from 'prismaClient';
import { UpdateHealthCenterCommand } from '../impl';

@CommandHandler(UpdateHealthCenterCommand)
export class UpdateHealthCenterStatusCommandHandler
  implements ICommandHandler<UpdateHealthCenterCommand>
{
  constructor(private readonly repo: HealthCenterRepository) {}

  execute({
    id,
    status,
  }: UpdateHealthCenterCommand): Promise<HealthCenterService> {
    return this.repo.updateOneStatus(id, status);
  }
}
