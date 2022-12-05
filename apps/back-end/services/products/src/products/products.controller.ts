import { Controller, Inject, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import {
  formatCaughtError,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import {
  ContentSuspendedEvent,
  ContentSuspenseRequestEvent,
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
  GetProductsMetaDataMessage,
  GetProductsMetaDataMessageReply,
  IsProductAddableMessage,
  IsProductAddableMessageReply,
  IsProductReviewableMessage,
  IsProductReviewableMessageReply,
  KafkaPayload,
  SellerProductsPurchasedEvent,
} from 'nest-dto';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ProductPurchasedEvent } from '@products/events';
import { ProductPurchasedEvent as KafkaProductPurchasedEvent } from 'nest-dto';
import { ProductStatus, PRODUCT_SERVICE_KEY } from '@products/const';
import { UpdateProductStatusCommand } from '@products/command';
import { Product } from '@products/entities';
import {
  GetShippingAddressQuery,
  GetShippingMethodQuery,
  GetUserDataQuery,
  GetUserDataQueryRes,
} from '@products/queries';
import {
  ShippingAddressQueryRes,
  ShippingMethodQueryRes,
} from '@products/queries';

@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly eventbus: EventBus,
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly querybus: QueryBus,
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

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(PRODUCT_SERVICE_KEY),
  )
  async handleProductSuspense(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    const prod = await this.commandbus.execute<
      UpdateProductStatusCommand,
      Product
    >(new UpdateProductStatusCommand(value.input.id, ProductStatus.suspended));
    if (!prod) return;
    this.eventClient.emit(
      KAFKA_EVENTS.MODERATION.contentSuspensed(PRODUCT_SERVICE_KEY),
      new ContentSuspendedEvent({
        authorId: prod.sellerId,
        id: prod.id,
        type: PRODUCT_SERVICE_KEY,
        byModeration: true,
      }),
    );
  }

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productPurchased)
  async handleProductPurchased(
    @Payload() { value }: { value: KafkaProductPurchasedEvent },
  ) {
    this.eventbus.publish(
      new ProductPurchasedEvent(value.input.productId, value.input.purchaserId),
    );
  }

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased(PRODUCT_SERVICE_KEY),
  )
  async handlePurchasedProducts(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    try {
      const {
        input: {
          shippingMethodId,
          shippingAddressId,
          products,
          buyerId,
          sellerId,
        },
      } = value;
      const shippingMethodPromise = this.querybus.execute<
        GetShippingMethodQuery,
        ShippingMethodQueryRes
      >(new GetShippingMethodQuery(shippingMethodId));
      const shippignAddressPromise = this.querybus.execute<
        GetShippingAddressQuery,
        ShippingAddressQueryRes
      >(new GetShippingAddressQuery(shippingAddressId));
      const buyerPromise = this.querybus.execute<
        GetUserDataQuery,
        GetUserDataQueryRes
      >(new GetUserDataQuery(buyerId));
      const sellerPromise = this.querybus.execute<
        GetUserDataQuery,
        GetUserDataQueryRes
      >(new GetUserDataQuery(sellerId));

      const shippingMethod = await shippingMethodPromise;
      const shippingAddress = await shippignAddressPromise;
      const buyer = await buyerPromise;
      const seller = await sellerPromise;
    } catch (error) {
      console.log(error);
    }
  }
}
