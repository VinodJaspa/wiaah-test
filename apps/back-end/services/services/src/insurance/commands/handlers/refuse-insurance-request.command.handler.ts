import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  RefuseInsuranceRequestCommand,
  RefuseInsuranceRequestCommandRes,
} from '@insurance/commands/impl';
import { BaseCommandHandler } from '@insurance/abstraction';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ServiceInsuranceStatusEnum } from 'prismaClient';

@CommandHandler(RefuseInsuranceRequestCommand)
export class RefuseInsuranceRequestCommandHandler
  extends BaseCommandHandler
  implements ICommandHandler<RefuseInsuranceRequestCommand>
{
  async execute({
    id,
    userId,
  }: RefuseInsuranceRequestCommand): Promise<RefuseInsuranceRequestCommandRes> {
    const insurance = await this.repo.getOneByBookId(id);

    if (!insurance) throw new NotFoundException('insurance not found');
    if (insurance.sellerId !== userId)
      throw new UnauthorizedException(
        'you cannot refuse insurance requests of books not of your services',
      );

    const res = await this.repo.updateStatus(
      id,
      ServiceInsuranceStatusEnum.refused,
    );

    return res;
  }
}
