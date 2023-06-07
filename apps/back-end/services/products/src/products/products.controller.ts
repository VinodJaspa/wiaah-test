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
  OrderRefundRequestAcceptedEvent,
  ReviewCreatedEvemt,
  SellerProductsPurchasedEvent,
} from 'nest-dto';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ProductPurchasedEvent } from '@products/events';
import { ProductPurchasedEvent as KafkaProductPurchasedEvent } from 'nest-dto';
import { ProductStatus, PRODUCT_SERVICE_KEY } from '@products/const';
import { UpdateProductStatusCommand } from '@products/command';
import { Product } from '@products/entities';
import { PrismaService } from 'prismaService';

@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly eventbus: EventBus,
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
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
          keywords: product.hashtags.map((v) => v).concat([]),
          name: product.title,
          price: product.price,
          thumbnail: product.presentations.find((v) => v.type === 'image').src,
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
          price: prod.price,
          category: [prod.category?.name || ''],
          tax: prod.vat * prod.price,
          thumbnail: prod.presentations.find((v) => v.type === 'image').src,
          title: prod.title,
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

      products.map((v) =>
        this.prisma.product.update({
          where: {
            id: v.id,
          },
          data: {
            totalOrdered: {
              increment: 1,
            },
            totalDiscounted: {
              increment:
                v?.discount?.discountId && v?.discount?.discountAmount ? 1 : 0,
            },
            totalDiscountedAmount: {
              increment: v.discount?.discountAmount || 0,
            },
          },
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  @EventPattern(
    KAFKA_EVENTS.REVIEWS_EVENTS.reviewCreated(PRODUCT_SERVICE_KEY, true),
  )
  async handleUpdateProductReviews(
    @Payload() { value }: { value: ReviewCreatedEvemt },
  ) {
    const { input } = value;

    const product = await this.prisma.product.findUnique({
      where: {
        id: input.contentId,
      },
    });

    if (!product) return;

    await this.prisma.product.update({
      where: {
        id: input.contentId,
      },
      data: {
        reviews: {
          increment: 1,
        },
        rate: product.rateStarCount / (product.reviews * 5),
        rateStarCount: {
          increment: input.rating,
        },
        positiveFeedback: {
          increment: input.rating > 2.5 ? 1 : 0,
        },
        negitiveFeedback: {
          increment: input.rating > 2.5 ? 0 : 1,
        },
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderRefundRequestAccepted())
  async handleProductRefunded(
    @Payload() { value }: { value: OrderRefundRequestAcceptedEvent },
  ) {
    try {
      await this.prisma.product.update({
        where: {
          id: value.input.productId,
        },
        data: {
          unitsRefunded: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.log({ error });
    }
  }
}
