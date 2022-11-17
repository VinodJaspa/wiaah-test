import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GetMyOrdersInput } from '@dto';

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

  beforeEach(async () => {
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
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should get my orders', async () => {
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
            itemId
            quantity
          }
          sellerInfo {
            id
          }
          buyerInfo {
            id
          }
        }
      }
    `;

    let getOrdersRes = await reqGql(
      getMyOrdersQuery,
      { status: 'compeleted' } as GetMyOrdersInput,
      mockBuyerUser,
    );

    console.log(JSON.stringify(getOrdersRes.body, null, 2));
  });
});
