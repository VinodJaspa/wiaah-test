import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AcceptInsuranceRequestCommand,
  AcceptInsuranceRequestCommandRes,
} from '@insurance/commands/impl';
import { BaseCommandHandler } from '@insurance/abstraction';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ServiceInsuranceStatusEnum } from 'prismaClient';

@CommandHandler(AcceptInsuranceRequestCommand)
export class RefuseInsuranceRequestCommandHandler
  extends BaseCommandHandler
  implements ICommandHandler<AcceptInsuranceRequestCommand>
{
  async execute({
    id,
    userId,
  }: AcceptInsuranceRequestCommand): Promise<AcceptInsuranceRequestCommandRes> {
    const insurance = await this.repo.getOneByBookId(id);

    if (!insurance) throw new NotFoundException('insurance not found');
    if (insurance.sellerId !== userId)
      throw new UnauthorizedException(
        'you cannot accept insurance requests of books not of your services',
      );

    const res = await this.repo.updateStatus(
      id,
      ServiceInsuranceStatusEnum.refunded,
    );

    return res;
  }
}
