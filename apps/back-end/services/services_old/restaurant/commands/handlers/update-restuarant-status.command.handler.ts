import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRestaurantStatusCommand } from '@restaurant/commands/impl';
import { RestaurantRepository } from '@restaurant/repository';
import { RestaurantService } from 'prismaClient';

@CommandHandler(UpdateRestaurantStatusCommand)
export class UpdateRestaurantStatusCommandHandler
  implements ICommandHandler<UpdateRestaurantStatusCommand>
{
  constructor(private readonly repo: RestaurantRepository) {}

  execute({
    id,
    status,
  }: UpdateRestaurantStatusCommand): Promise<RestaurantService> {
    return this.repo.updateOneStatus(id, status);
  }
}
