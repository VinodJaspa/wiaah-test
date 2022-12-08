import { BaseCommandHandler } from '@insurance/abstraction';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ServiceInsuranceStatusEnum } from 'prismaClient';
import {
  RequestInsurancePaybackCommand,
  RequestInsurancePaybackCommandRes,
} from '../impl';

@CommandHandler(RequestInsurancePaybackCommand)
export class RequestInsurancePaybackCommandHandler
  extends BaseCommandHandler
  implements ICommandHandler<RequestInsurancePaybackCommand>
{
  async execute({
    bookId,
    userId,
  }: RequestInsurancePaybackCommand): Promise<RequestInsurancePaybackCommandRes> {
    const insurance = await this.repo.getOneByBookId(bookId);

    if (insurance.status !== ServiceInsuranceStatusEnum.paid)
      throw new BadRequestException(
        'this insurance is not in the proper state to request a refund',
      );
    if (insurance.buyerId !== userId)
      throw new UnauthorizedException("you don't own this book ticket");

    const res = await this.repo.updateStatus(
      bookId,
      ServiceInsuranceStatusEnum.requested,
    );
    return res;
  }
}
