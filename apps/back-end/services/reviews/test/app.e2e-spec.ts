import { Test, TestingModule } from '@nestjs/testing';
import { Controller, INestApplication } from '@nestjs/common';
import {
  ClientKafka,
  KafkaReplyPartitionAssigner,
  MessagePattern,
  MicroserviceOptions,
  Payload,
  Transport,
} from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  mockedUser,
  requestGraphql,
  secendMockedUser,
  SERVICES,
  thirdMockedUser,
  waitFor,
} from 'nest-utils';
import { Consumer, Kafka, Producer } from 'kafkajs';
import {
  GetIsUserPurchasedProductMessage,
  GetIsUserPurchasedProductMessageReply,
  NewProductCreatedEvent,
} from 'nest-dto';
import { ObjectId } from 'mongodb';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma-client';
import { ProductRating } from '@product-review/entities';
import { CreateProductReviewInput } from '@product-review/dto';
import { ReviewProductType } from '@product-review/const';

const mockKafkaGetIsUserPurchasedProductMessagehandler = jest.fn();

@Controller()
class TestController {
  @MessagePattern(
    KAFKA_MESSAGES.REVIEW_SERVICE.getIsUserPurchasedProduct(ReviewProductType),
  )
  handle(@Payload() { value }: { value: any }) {
    console.log('ran');
    return mockKafkaGetIsUserPurchasedProductMessagehandler(value);
  }
}

describe('reviews e2e', () => {
  let app: INestApplication;
  let mockListner: INestApplication;
  const kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.PRODUCTS_SERVICE.clientId,
  });

  const producer: Producer = kafka.producer();

  const consumer: Consumer = kafka.consumer({
    groupId: SERVICES.PRODUCTS_SERVICE.groupId,
  });

  const prisma = new PrismaClient();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const listner = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    mockListner = listner.createNestApplication();

    mockListner.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: 'test-client',
        },
        consumer: {
          groupId: 'test-group',
        },
      },
    });
    await mockListner.startAllMicroservices();
    await mockListner.init();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.REVIEWS_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.REVIEWS_SERVICE.groupId,
        },
      },
    });

    await app.startAllMicroservices();
    await app.init();
    await producer.connect();
    await consumer.connect();
  });

  beforeEach(() =>
    mockKafkaGetIsUserPurchasedProductMessagehandler.mockReset(),
  );

  jest.setTimeout(60000);
  afterAll(async () => {
    if (app) await app.close();
    if (mockListner) mockListner.close();
    await producer.disconnect();
    await consumer.disconnect();
    await consumer.stop();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  describe('product reviews', () => {
    const productId = thirdMockedUser.shopId;
    const reviewProduct = `
      mutation review(
        $productId:ID!
        $rate:Float!
        $message:String!
      ){
        reviewProduct(
          args:{
            productId:$productId
            rate:$rate
            message:$message
          }
        ){
          id
        }
      }
    `;

    const deleteReview = `
      mutation delete(
        $id:ID!
      ){
        removeReview(
          id:$id
        ){
          id
        }
      }
    `;

    const reviewProductInput: CreateProductReviewInput = {
      message: 'test review message',
      rate: 3,
      productId: productId,
    };

    beforeEach(async () => {
      await producer.send({
        topic: KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated,
        messages: [
          {
            value: new NewProductCreatedEvent({
              id: productId,
              ownerId: mockedUser.id,
              shopId: mockedUser.shopId,
            }).toString(),
          },
        ],
      });
      await waitFor(async () => {
        const productsRatings = await prisma.productRating.findMany();

        expect(productsRatings.length).toBe(1);
        expect(productsRatings.at(0)).toStrictEqual({
          givenStars: 0,
          id: productId,
          rating: 0,
          reviews: 0,
        } as ProductRating);
      });
    });

    it('should throw errors if trying to review a product not purchased', async () => {
      mockKafkaGetIsUserPurchasedProductMessagehandler.mockReturnValue(
        new GetIsUserPurchasedProductMessageReply({
          data: {
            hasPurchased: false,
            product: null,
          },
          error: null,
          success: true,
        }),
      );

      const res = await reqGql(reviewProduct, reviewProductInput, mockedUser);

      expect(res.body.errors).toBeDefined();

      expect(await prisma.productReview.count()).toBe(0);
    });

    it('should create review if user have purchased product', async () => {
      mockKafkaGetIsUserPurchasedProductMessagehandler.mockReturnValue(
        new GetIsUserPurchasedProductMessageReply({
          data: {
            hasPurchased: true,
            product: {
              id: productId,
              sellerId: secendMockedUser.id,
            },
          },
          error: null,
          success: true,
        }),
      );

      let res = await reqGql(reviewProduct, reviewProductInput, mockedUser);

      expect(res.body.errors).not.toBeDefined();

      expect(await prisma.productReview.count()).toBe(1);
      expect(await prisma.productReview.findFirst()).toMatchObject(
        reviewProductInput,
      );
      let rating: ProductRating;

      await waitFor(async () => {
        rating = await prisma.productRating.findUnique({
          where: {
            id: productId,
          },
        });

        expect(rating.givenStars).toBe(3);
        expect(rating.reviews).toBe(1);
        expect(rating.rating).toBe(3);
      });

      res = await reqGql(
        reviewProduct,
        { ...reviewProductInput, rate: 2 } as CreateProductReviewInput,
        mockedUser,
      );

      expect(res.body.errors).toBeDefined();

      rating = await prisma.productRating.findUnique({
        where: {
          id: productId,
        },
      });

      expect(rating.givenStars).toBe(3);
      expect(rating.reviews).toBe(1);
      expect(rating.rating).toBe(3);

      res = await reqGql(
        reviewProduct,
        { ...reviewProductInput, rate: 2 } as CreateProductReviewInput,
        secendMockedUser,
      );

      expect(res.body.errors).not.toBeDefined();

      await waitFor(async () => {
        rating = await prisma.productRating.findUnique({
          where: {
            id: productId,
          },
        });

        expect(rating.givenStars).toBe(5);
        expect(rating.reviews).toBe(2);
        expect(rating.rating).toBe(2.5);
      });
    });

    describe('review deletion', () => {
      let reviewId: string;
      beforeEach(async () => {
        mockKafkaGetIsUserPurchasedProductMessagehandler.mockReturnValue(
          new GetIsUserPurchasedProductMessageReply({
            data: {
              hasPurchased: true,
              product: {
                id: productId,
                sellerId: secendMockedUser.id,
              },
            },
            error: null,
            success: true,
          }),
        );

        const res = await reqGql(reviewProduct, reviewProductInput, mockedUser);
        reviewId = res.body.data.reviewProduct.id;
      });

      it('should throw error if deleting not own review', async () => {
        const res = await reqGql(
          deleteReview,
          { id: reviewId },
          secendMockedUser,
        );

        expect(res.body.errors).toBeDefined();
        expect(
          await prisma.productReview.findUnique({
            where: {
              id: reviewId,
            },
          }),
        ).toBeDefined();
      });

      it('should delete review if the request comes from its owner', async () => {
        const res = await reqGql(deleteReview, { id: reviewId }, mockedUser);

        expect(res.body.errors).not.toBeDefined();
        expect(
          await prisma.productReview.findUnique({
            where: {
              id: reviewId,
            },
          }),
        ).toBeNull();

        await waitFor(async () => {
          const rating = await prisma.productRating.findUnique({
            where: {
              id: productId,
            },
          });

          expect(rating.givenStars).toBe(0);
          expect(rating.reviews).toBe(0);
          expect(rating.rating).toBe(0);
        });
      });
    });
  });
});
