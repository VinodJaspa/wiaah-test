import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA_MESSAGES } from 'nest-utils';
import {
  IsProductReviewableMessage,
  IsProductReviewableMessageReply,
} from 'nest-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(KAFKA_MESSAGES.productReviewable)
  async productReviewable(
    @Payload() payload: { value: IsProductReviewableMessage },
  ): Promise<IsProductReviewableMessageReply> {
    const isReviewable = await this.productsService.isProductReviewable(
      payload.value.productId,
      payload.value.reviewerId,
    );

    return new IsProductReviewableMessageReply(isReviewable);
  }
}
