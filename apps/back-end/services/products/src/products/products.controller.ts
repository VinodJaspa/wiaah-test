import { Controller, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { formatCaughtError, KAFKA_MESSAGES } from 'nest-utils';
import {
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
  IsProductReviewableMessage,
  IsProductReviewableMessageReply,
  KafkaPayload,
} from 'nest-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(KAFKA_MESSAGES.productReviewable)
  async productReviewable(
    @Payload() payload: { value: IsProductReviewableMessage },
  ): Promise<IsProductReviewableMessageReply> {
    try {
      const isReviewable = await this.productsService.isProductReviewable(
        payload.value.input.productId,
        payload.value.input.reviewerId,
      );

      return new IsProductReviewableMessageReply({
        success: true,
        data: isReviewable,
        error: null,
      });
    } catch (error) {
      return new IsProductReviewableMessageReply({
        success: false,
        error: formatCaughtError(error),
        data: null,
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductMetaData)
  async getProductMetaData(
    @Payload() payload: KafkaPayload<GetProductMetaDataMessage>,
  ): Promise<GetProductMetaDataMessageReply> {
    try {
      const product = await this.productsService.getProductById(
        payload.value.input.productId,
      );

      if (!product) throw new NotFoundException('product not found');
      if (product.visibility !== 'public')
        throw new NotFoundException('this product is private');

      return new GetProductMetaDataMessageReply({
        success: true,
        data: {
          name: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        },
        error: null,
      });
    } catch (error) {
      return new GetProductMetaDataMessageReply({
        data: null,
        error: formatCaughtError(error),
        success: false,
      });
    }
  }
}
