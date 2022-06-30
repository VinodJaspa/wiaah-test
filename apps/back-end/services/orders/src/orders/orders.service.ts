import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
import {
  GetAccountByIdMessage,
  GetAccountByIdMessageReply,
  GetProductsMetaDataMessage,
  GetProductsMetaDataMessageReply,
} from 'nest-dto';
import { Prisma } from '@prisma-client';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

  async createOrderCluster(sellerId: string, shopId: string) {
    return this.prisma.ordersCluster.create({
      data: {
        shopId,
        sellerId,
      },
    });
  }

  async createOrder(buyerId: string, input: CreateOrderInput): Promise<Order> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetProductsMetaDataMessage,
      GetProductsMetaDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsMetaData,
      new GetProductsMetaDataMessage({
        productsIds: input.items.map((item) => item.itemId),
      }),
    );

    if (!success) throw new Error(error);
    const { ownerId: sellerId, productId, shopId } = data[0];

    const productsOfSameShop = data.every(
      (product) => product.shopId === shopId,
    );

    if (!productsOfSameShop)
      throw new BadRequestException(
        'failed to create order: order contains products from diffrent shops',
      );

    const { address, address2, city, country, state, postalCode, phone } =
      await this.getBuyerInfo(buyerId);

    const orderData: Order = {
      id: randomUUID(),
      status: {
        of: 'pending',
      },
      sellerInfo: {
        id: sellerId,
        shopId,
      },
      buyerInfo: {
        address,
        address2,
        city,
        country,
        phone,
        postalCode,
        state,
        id: buyerId,
      },
      items: input.items,
    };

    await this.prisma.ordersCluster.update({
      where: {
        shopId,
      },
      data: {
        orders: {
          push: orderData,
        },
      },
    });
    return orderData;
  }

  async getBuyerInfo(buyerId: string) {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetAccountByIdMessage,
      GetAccountByIdMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountById,
      new GetAccountByIdMessage({ accountId: buyerId }),
    );

    if (!success) throw new Error(error);

    return data;
  }
}
