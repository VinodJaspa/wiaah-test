import { Controller, Inject, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { formatCaughtError, KAFKA_MESSAGES } from 'nest-utils';
import {
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
  GetProductsMetaDataMessage,
  GetProductsMetaDataMessageReply,
  IsProductAddableMessage,
  IsProductAddableMessageReply,
  IsProductReviewableMessage,
  IsProductReviewableMessageReply,
  KafkaPayload,
} from 'nest-dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) {}

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
        error: {
          ...error,
          message: formatCaughtError(error),
        },
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
          thumbnail: product.presentations.find((v) => v.type === 'image').src,
          shopId: product.shopId,
        },
        error: null,
      });
    } catch (error) {
      return new GetProductMetaDataMessageReply({
        data: null,
        success: false,
        error: {
          ...error,
          message: formatCaughtError(error),
        },
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsMetaData)
  async getProductsMetaData(
    @Payload() payload: KafkaPayload<GetProductsMetaDataMessage>,
  ): Promise<GetProductsMetaDataMessageReply> {
    try {
      const { productsIds } = payload.value.input;
      const products = await this.productsService.getPublicProductsByIds(
        productsIds,
      );
      return new GetProductsMetaDataMessageReply({
        success: true,
        error: null,
        data: products.map((prod) => ({
          productId: prod.id,
          ownerId: prod.sellerId,
          shopId: prod.shopId,
        })),
      });
    } catch (error) {
      return new GetProductsMetaDataMessageReply({
        success: false,
        error: {
          ...error,
          message: formatCaughtError(error),
        },
        data: null,
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.PRODUCTS_MESSAGES.isProductAddable)
  async isProductAddable(
    @Payload() payload: KafkaPayload<IsProductAddableMessage>,
  ): Promise<IsProductAddableMessageReply> {
    try {
      const { productId } = payload.value.input;
      const product = await this.productsService.getProductById(productId);
      if (!product) throw new NotFoundException('product not found');
      const { visibility } = product;
      return new IsProductAddableMessageReply({
        success: true,
        error: null,
        data: { isAddable: visibility === 'public' },
      });
    } catch (error) {}
  }
}
