import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '@orders/commands/impl';
import { Order } from '@orders/entities';
import { OrdersRepository } from '@orders/repositoy';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({
    buyerId,
    orderItems,
    sellerId,
    shippingMethodId,
    shippingAddressId,
  }: CreateOrderCommand): Promise<Order> {
    const res = await this.repo.create(
      buyerId,
      sellerId,
      orderItems,
      shippingMethodId,
      shippingAddressId,
    );

    return { ...res };
  }
}
