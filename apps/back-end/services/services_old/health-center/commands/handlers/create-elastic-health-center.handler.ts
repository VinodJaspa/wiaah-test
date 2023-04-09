import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HealthCenterElasticRepository } from '../../repository';
import { CreateElasticHealthCenterCommand } from '../impl/elastic';

@CommandHandler(CreateElasticHealthCenterCommand)
export class CreateElasticHealthCenterCommandHandler
  implements ICommandHandler<CreateElasticHealthCenterCommand>
{
  constructor(private readonly elasticRepo: HealthCenterElasticRepository) {}

  async execute({ input }: CreateElasticHealthCenterCommand): Promise<void> {
    this.elasticRepo.createHealthCenterIndex(input);
  }
}
