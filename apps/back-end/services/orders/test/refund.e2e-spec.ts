import {
  ConsoleLogger,
  HttpCode,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AskForRefundInput } from '@refund/dto';
import {
  accountType,
  AuthorizationDecodedUser,
  mockedUser,
  requestGraphql,
  secendMockedUser,
  waitFor,
} from 'nest-utils';
import { ObjectId } from 'mongodb';
import { AppModule } from '../src/app.module';
import { PrismaClient, RefundRequest, RefundType } from '@prisma-client';
import { OrderType } from '@refund/queries/handlers';
import { OrderRefundStatusEnum } from '@refund/const';

describe('refund e2e tests', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {});

  afterAll(async () => {
    if (app) return app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  function createOrder(buyerId: string, sellerId: string) {
    return prisma.order.create({
      data: {
        buyerId,
        sellerId,
        shippingMethodId: new ObjectId().toHexString(),
        status: {
          of: 'compeleted',
        },
      },
    });
  }

  function checkStatusCode(res: any, at: number) {
    return res?.body?.errors?.at(at)?.extensions?.response?.statusCode;
  }

  describe('should create order refund request', () => {
    let input: AskForRefundInput,
      order: OrderType,
      seller: AuthorizationDecodedUser,
      buyer: AuthorizationDecodedUser;

    const askForRefundMutation = `
      mutation refund(
          $id:ID!
          $type:RefundType!
          $fullAmount:Boolean
          $amount:Float
          $reason:String
          ){
              askForRefund(
                  askForRefundArgs:{
                      id:$id
                  type:$type
                  fullAmount:$fullAmount
                  amount:$amount
                  reason:$reason
              }
              )
          }
          `;
    beforeEach(async () => {
      seller = {
        ...mockedUser,
        accountType: accountType.SELLER,
        id: new ObjectId().toHexString(),
      };
      buyer = {
        ...mockedUser,
        accountType: accountType.BUYER,
        id: new ObjectId().toHexString(),
      };

      input = {
        id: new ObjectId().toHexString(),
        amount: 15,
        fullAmount: false,
        reason: 'test reason',
        type: RefundType.money,
      };

      order = await createOrder(buyer.id, seller.id);
      input.id = order.id;
    });

    it('should throw not found error if order not found', async () => {
      const res = await reqGql(
        askForRefundMutation,
        { ...input, id: new ObjectId().toHexString() },
        buyer,
      );

      expect(res.body.errors).toBeDefined();
      expect(checkStatusCode(res, 0)).toBe(HttpStatus.NOT_FOUND);
    });

    it('should throw unauthorized error if the user is not the owner of the order', async () => {
      const res = await reqGql(askForRefundMutation, input, {
        ...buyer,
        id: new ObjectId().toHexString(),
      });

      expect(res.body.errors).toBeDefined();
      expect(checkStatusCode(res, 0)).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should create the request when valid user and order id', async () => {
      const res = await reqGql(askForRefundMutation, input, {
        ...buyer,
      });

      expect(res.body.errors).not.toBeDefined();
      await waitFor(async () => {
        const requests = await prisma.refundRequest.findMany();
        expect(requests).toHaveLength(1);
        const request = requests[0];
        expect(request.orderId).toBe(order.id);
        expect(request.requestedById).toBe(order.buyerId);
        expect(request.sellerId).toBe(order.sellerId);
        expect(request).toMatchObject(input);
      });
    });

    describe('should reject/accept refund request', () => {
      const acceptRefundMut = `
    mutation accept(
        $id:ID!
    ){
        acceptRefundRequest(
            id:$id
        )
    }
    `;

      const rejectRefundMut = `
    mutation reject(
        $id:ID!
        $reason:String
    ){
        rejectRefundRequest(
            args:{
                id:$id
                reason:$reason
            }
        )
    }
    `;
      let request: RefundRequest;
      beforeEach(async () => {
        await reqGql(askForRefundMutation, input, {
          ...buyer,
        });

        request = await prisma.refundRequest.findFirst();
      });

      it('should accept if the right seller', async () => {
        const res = await reqGql(acceptRefundMut, { id: request.id }, seller);
        expect(res.body.errors).not.toBeDefined();
        expect(res.body.data.acceptRefundRequest).toBe(true);
        request = await prisma.refundRequest.findUnique({
          where: {
            id: request.id,
          },
        });
        expect(request.status).toBe(OrderRefundStatusEnum.accept);
      });

      it('should throw if accepting without being the right seller', async () => {
        const res = await reqGql(
          acceptRefundMut,
          { id: request.id },
          { ...seller, id: new ObjectId().toHexString() },
        );
        expect(res.body.errors).toBeDefined();

        expect(res.body.errors).toBeDefined();
        expect(checkStatusCode(res, 0)).toBe(HttpStatus.UNAUTHORIZED);

        request = await prisma.refundRequest.findUnique({
          where: {
            id: request.id,
          },
        });
        expect(request.status).toBe(OrderRefundStatusEnum.pending);
      });

      it('should reject if the right seller', async () => {
        const res = await reqGql(
          rejectRefundMut,
          { id: request.id, reason: 'test reason' },
          seller,
        );

        expect(res.body.errors).not.toBeDefined();
        expect(res.body.data.rejectRefundRequest).toBe(true);

        request = await prisma.refundRequest.findUnique({
          where: {
            id: request.id,
          },
        });

        expect(request.status).toBe(OrderRefundStatusEnum.reject);
      });

      it('should throw if rejecting without being the right seller', async () => {
        const res = await reqGql(
          rejectRefundMut,
          { id: request.id },
          { ...seller, id: new ObjectId().toHexString() },
        );
        expect(res.body.errors).toBeDefined();
        console.log(JSON.stringify(res.body, null, 2));
        expect(checkStatusCode(res, 0)).toBe(HttpStatus.UNAUTHORIZED);

        request = await prisma.refundRequest.findUnique({
          where: {
            id: request.id,
          },
        });
        expect(request.status).toBe(OrderRefundStatusEnum.pending);
      });
    });
  });
});
