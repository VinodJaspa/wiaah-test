import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { CreateRefundRequestCommand } from '@refund/commands/impl';
import { Refund } from '@refund/entities';
import { RefundRequestCreatedEvent } from '@refund/events';
import { GetOrderQuery } from '@refund/queries';
import { OrderType } from '@refund/queries/handlers';
import { RefundRepository } from '@refund/repository';
import { DBErrorException } from 'nest-utils';
import { PrismaService } from 'prismaService';

@CommandHandler(CreateRefundRequestCommand)
export class CreateRefundRequestCommandHandler
  implements ICommandHandler<CreateRefundRequestCommand>
{
  constructor(
    private readonly repo: RefundRepository,
    private readonly eventBus: EventBus,
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  async execute({
    input,
    userId,
  }: CreateRefundRequestCommand): Promise<Refund> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: {
        id: input.orderItemId,
      },
      include: {
        Order: true,
      },
    });
    if (orderItem?.Order?.buyerId !== userId)
      throw new UnauthorizedException('you can only refund your orders');
    try {
      const res = await this.repo.createOne(
        input,
        orderItem.Order.sellerId,
        userId,
      );
      this.eventBus.publish(new RefundRequestCreatedEvent(res));
      return res;
    } catch (error) {
      console.error(error);
      throw new DBErrorException('');
    }
  }
}
