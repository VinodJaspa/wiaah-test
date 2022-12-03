import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  MockedAdminUser,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  secendMockedUser,
  SERVICES,
  thirdMockedUser,
  waitFor,
} from 'nest-utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GetMyOrdersInput } from '@dto';
import { Kafka } from 'kafkajs';
import { OrderItemType } from '@orders/const';
import { SellerProductsPurchasedEvent } from 'nest-dto';
import { PrismaClient } from '@prisma-client';
import { Order, OrderItem, OrderStatus } from '@orders/entities';

let mockSellerUser: AuthorizationDecodedUser = {
  ...mockedUser,
  accountType: 'seller',
};
let mockBuyerUser: AuthorizationDecodedUser = {
  ...secendMockedUser,
  accountType: 'seller',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockKafka = new NestKafkaClientMock();
  let kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.ORDERS_SERVICE.clientId,
  });

  let prisma: PrismaClient = new PrismaClient();

  let producer = kafka.producer();
  let consumer = kafka.consumer({
    groupId: SERVICES.ORDERS_SERVICE.groupId,
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.ORDERS_SERVICE.token)
      .useValue(mockKafka)
      .compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.ORDERS_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.ORDERS_SERVICE.groupId,
        },
      },
    });

    await app.startAllMicroservices();
    await app.init();
    await producer.connect();
    await consumer.connect();
  });

  beforeEach(async () => {
    mockKafka.reset();
  });

  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
    await consumer.disconnect();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const rejectRecivedOrderMutation = `
    mutation reject(
      $id:ID!
      $reason:String!
    ){
      rejectReceivedOrder(
        args:{
          id:$id
          rejectReason:$reason
        }
      )
    }
    `;
  const rejectRequestedOrderMutation = `
    mutation reject(
      $id:ID!
      $reason:String!
    ){
      rejectRequestedOrder(
        args:{
          id:$id
          rejectReason:$reason
        }
      )
    }
    `;

  const acceptRequestedOrderMutation = `
    mutation reject(
      $id:ID!
    ){
      acceptRequestedOrder(
        args:{
          id:$id
        }
      )
    }
    `;

  const acceptRecivedOrderMutation = `
    mutation reject(
      $id:ID!
    ){
      acceptReceivedOrder(
        args:{
          id:$id
        }
      )
    }
    `;

  const getMyOrdersQuery = `
      query get(
        $status:OrderStatusEnum
      ){
        getMyOrders(
          getMyOrdersArgs:{
            status:$status
          }
        ){
          id
          status {
            of
            rejectReason
          }
          items {
            id
            qty
            type
          }
          seller {
            id
          }
          buyer {
            id
          }
        }
      }
    `;

  describe('manage ordered', () => {
    let order: Order;

    beforeEach(async () => {
      let getOrdersRes = await reqGql(
        getMyOrdersQuery,
        { status: 'compeleted' } as GetMyOrdersInput,
        mockBuyerUser,
      );

      expect(getOrdersRes.body.errors).not.toBeDefined();
      expect(getOrdersRes.body.data.getMyOrders).toStrictEqual([]);

      await producer.send({
        topic: KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased(
          OrderItemType.product,
        ),
        messages: [
          {
            value: new SellerProductsPurchasedEvent({
              buyerId: mockBuyerUser.id,
              sellerId: mockSellerUser.id,
              productsType: OrderItemType.product,
              shippingMethodId: MockedAdminUser.shopId,
              purchasedAtTimestamp: Date.parse(new Date().toString()),
              products: [
                {
                  id: mockedUser.shopId,
                  qty: 1,
                  affiliatorId: thirdMockedUser.id,
                },
              ],
            }).toString(),
          },
        ],
      });

      await waitFor(async () => {
        expect(await prisma.order.findMany()).toHaveLength(1);
        expect((await prisma.order.findMany()).at(0)).toMatchObject({
          buyerId: mockBuyerUser.id,
          sellerId: mockSellerUser.id,
          status: {
            of: 'pending',
            rejectReason: null,
          },
          items: [
            {
              id: mockedUser.shopId,
              qty: 1,
              type: OrderItemType.product,
            },
          ],
        } as Partial<Order>);
      });

      order = (await prisma.order.findMany()).at(0);
    });

    it('should accept requested order', async () => {
      let res = await reqGql(
        acceptRequestedOrderMutation,
        { id: order.id },
        mockBuyerUser,
      );

      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'pending',
      ).toBe(true);

      res = await reqGql(
        acceptRequestedOrderMutation,
        { id: order.id },
        mockSellerUser,
      );

      expect(res.body.errors).not.toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'shipping',
      ).toBe(true);
    });

    it('reject requested order', async () => {
      let res = await reqGql(
        rejectRequestedOrderMutation,
        { id: order.id, reason: 'reason' },
        mockBuyerUser,
      );
      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'pending',
      ).toBe(true);

      res = await reqGql(
        rejectRequestedOrderMutation,
        { id: order.id, reason: 'reason' },
        mockSellerUser,
      );
      expect(res.body.errors).not.toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'rejectedBySeller',
      ).toBe(true);
    });

    it('should accept recieved order', async () => {
      let res = await reqGql(
        acceptRecivedOrderMutation,
        { id: order.id },
        mockSellerUser,
      );
      console.log(JSON.stringify(res.body, null, 2));
      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'pending',
      ).toBe(true);

      res = await reqGql(
        acceptRecivedOrderMutation,
        { id: order.id },
        mockBuyerUser,
      );

      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'pending',
      ).toBe(true);

      res = await reqGql(
        acceptRequestedOrderMutation,
        { id: order.id },
        mockSellerUser,
      );

      res = await reqGql(
        acceptRecivedOrderMutation,
        { id: order.id },
        mockSellerUser,
      );

      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'shipping',
      ).toBe(true);

      res = await reqGql(
        acceptRecivedOrderMutation,
        { id: order.id },
        mockBuyerUser,
      );

      expect(res.body.errors).not.toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'compeleted',
      ).toBe(true);
    });

    it('should reject received order', async () => {
      let res = await reqGql(
        rejectRecivedOrderMutation,
        { id: order.id, reason: 'test buyer reject' },
        mockSellerUser,
      );

      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'pending',
      ).toBe(true);

      res = await reqGql(
        rejectRecivedOrderMutation,
        { id: order.id, reason: 'test buyer reject' },
        mockBuyerUser,
      );

      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'pending',
      ).toBe(true);

      res = await reqGql(
        acceptRequestedOrderMutation,
        { id: order.id },
        mockSellerUser,
      );

      res = await reqGql(
        rejectRecivedOrderMutation,
        { id: order.id, reason: 'test buyer reject' },
        mockSellerUser,
      );

      expect(res.body.errors).toBeDefined();
      expect(
        (await prisma.order.findMany()).at(0).status.of === 'shipping',
      ).toBe(true);

      res = await reqGql(
        rejectRecivedOrderMutation,
        { id: order.id, reason: 'test buyer reject' },
        mockBuyerUser,
      );

      expect(res.body.errors).not.toBeDefined();
      expect((await prisma.order.findMany()).at(0).status).toStrictEqual({
        of: 'rejectedByBuyer',
        rejectReason: 'test buyer reject',
      } as OrderStatus);
    });
  });
});
