import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { formatCaughtError, KAFKA_MESSAGES } from 'nest-utils';
import { VouchersManagementService } from './vouchers-management.service';
import {
  GetShopVouchersMessage,
  GetShopVouchersMessageReply,
  KafkaPayload,
} from 'nest-dto';

@Controller()
export class VouchersManagementController {
  constructor(private readonly vouchersService: VouchersManagementService) {}

  @MessagePattern(KAFKA_MESSAGES.VOUCHERS_MESSAGES.getShopActiveVouchers)
  async getShopVouchers(
    @Payload() payload: KafkaPayload<GetShopVouchersMessage>,
  ): Promise<GetShopVouchersMessageReply> {
    try {
      const {
        value: {
          input: { shopId },
        },
      } = payload;
      const vouchers = await this.vouchersService.getVouchersByShopId(shopId, {
        status: 'active',
      });

      return new GetShopVouchersMessageReply({
        success: true,
        error: null,
        data: vouchers.map(({ amount, code, status, type, currency }) => ({
          amount,
          code,
          currency,
          type,
        })),
      });
    } catch (error) {
      return new GetShopVouchersMessageReply({
        success: false,
        data: null,
        error: formatCaughtError(error),
      });
    }
  }
}
