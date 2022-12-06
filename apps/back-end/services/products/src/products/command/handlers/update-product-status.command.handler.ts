import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductStatusCommand } from '@products/command/impl';
import { ProductRepository } from '@products/repository';

@CommandHandler(UpdateProductStatusCommand)
export class UpdateProductStatusCommandHandler
  implements ICommandHandler<UpdateProductStatusCommand>
{
  constructor(private readonly repo: ProductRepository) {}

  execute({ id, status }: UpdateProductStatusCommand): Promise<any> {
    return this.repo.update(id, { status });
  }
}
