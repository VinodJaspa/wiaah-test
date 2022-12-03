import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SearchUserElasticRepository } from '../../repository';
import { CreateOrUpdateUserElasticCommand } from '../impl';

@CommandHandler(CreateOrUpdateUserElasticCommand)
export class CreateOrUpdateUserElasticCommandHandler
  implements ICommandHandler<CreateOrUpdateUserElasticCommand>
{
  constructor(private readonly userElasticRepo: SearchUserElasticRepository) {}

  async execute({ input }: CreateOrUpdateUserElasticCommand): Promise<void> {
    await this.userElasticRepo.indexUser(input);
  }
}
