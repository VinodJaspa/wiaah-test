import { Test, TestingModule } from '@nestjs/testing';
import {
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  mockedUser,
  SERVICES,
  waitFor,
} from 'nest-utils';
import { StripeBillingResolver } from './stripe-billing.resolver';
import {
  GetProductsCheckoutDataMessage,
  GetProductsCheckoutDataMessageReply,
  GetServicesCheckoutDataMessage,
  GetServicesCheckoutDataMessageReply,
  GetShoppingCartItemsMessage,
  GetShoppingCartItemsMessageReply,
  StripeAccountCreatedEvent,
  UserHasStripeAccountMessageReply,
} from 'nest-dto';
import { StripeBillingModule } from './stripe-billing.module';
import { STRIPE_INJECT_TOKEN } from '../constants';

describe('StripeBilling integration tests', () => {
  let resolver: StripeBillingResolver;
  let mockStripe = {
    accounts: {
      create: jest.fn(),
      list: jest.fn(),
      retrieve: jest.fn(),
    },
    accountLinks: {
      create: jest.fn(),
    },
    paymentIntents: {
      create: jest.fn(),
    },
    transfers: {
      create: jest.fn(),
    },
  };

  let mockKafkaEmit: jest.Mock;
  let mockKafkaSend: jest.Mock;
  let mockKafkaSubscribe: jest.Mock;
  let mockKafkaSubscribeToResponse: jest.Mock;
  let mockKafkaConnect: jest.Mock;

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockKafkaSend = jest.fn();
    mockKafkaSubscribe = jest.fn();
    mockKafkaSubscribeToResponse = jest.fn();
    mockKafkaConnect = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [StripeBillingModule],
    })
      .overrideProvider(SERVICES.BILLING_SERVICE.token)
      .useValue({
        emit: mockKafkaEmit,
        send: mockKafkaSend,
        subscribeToResponseOf: mockKafkaSubscribeToResponse,
        connect: mockKafkaConnect,
      })
      .overrideProvider(STRIPE_INJECT_TOKEN)
      .useValue(mockStripe)
      .compile();

    await module.init();

    resolver = module.get<StripeBillingResolver>(StripeBillingResolver);
  });

  it('should create stripe account connected account', async () => {
    mockKafkaSend.mockImplementation(() => ({
      subscribe: mockKafkaSubscribe.mockImplementation(
        (fn: (data: UserHasStripeAccountMessageReply) => any) => {
          fn(
            new UserHasStripeAccountMessageReply({
              success: true,
              error: null,
              data: { hasAccount: false },
            }),
          );
        },
      ),
    }));

    mockStripe.accounts.create.mockReturnValue({ id: 'test id' });
    mockStripe.accountLinks.create.mockReturnValue({ url: 'test url' });

    const res = await resolver.createConnectedAccount({
      ...mockedUser,
      stripeId: undefined,
    });

    expect(mockStripe.accounts.create).toBeCalledTimes(1);
    expect(mockStripe.accounts.create).toBeCalledWith({
      type: 'express',
    });

    expect(mockStripe.accountLinks.create).toBeCalledTimes(1);
    expect(mockStripe.accountLinks.create).toBeCalledWith(
      expect.objectContaining({
        account: 'test id',
        type: 'account_onboarding',
      }),
    );
    expect(res).toStrictEqual({
      url: 'test url',
    });

    await waitFor(() => {
      expect(mockKafkaEmit).toBeCalledTimes(1);
      expect(mockKafkaEmit).toBeCalledWith(
        KAFKA_EVENTS.BILLING_EVNETS.stripeAccountCreated,
        new StripeAccountCreatedEvent({
          stripeId: 'test id',
          userId: mockedUser.id,
        }),
      );
    });
  });

  it('should create payment intent', async () => {
    const mockShoppingData = [
      { id: 'cart 1', qty: 5, type: 'product' },
      { id: 'cart 2', qty: 10, type: 'product' },
      { id: 'cart 3', qty: 15, type: 'product' },
      { id: 'cart 5', qty: 20, type: 'hotel-room' },
      { id: 'cart 6', qty: 25, type: 'restaurant' },
    ];

    const getReply = (message: string) => {
      switch (message) {
        case KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsCheckoutData:
          return new GetProductsCheckoutDataMessageReply({
            error: null,
            success: true,
            data: {
              products: [
                {
                  id: '1',
                  price: 45,
                  sellerId: '12354',
                  sellerStripeId: '1',
                  title: 'title',
                },
              ],
            },
          });

        case KAFKA_MESSAGES.SERVICES_MESSAGES.getServicesCheckoutData:
          return new GetServicesCheckoutDataMessageReply({
            data: {
              services: [
                {
                  id: '1',
                  price: 25,
                  sellerId: '12345',
                  sellerStripeId: '1',
                  title: 'title',
                },
              ],
            },
            error: null,
            success: true,
          });
        case KAFKA_MESSAGES.SHOPPING_CART_MESSAGES.getShoppingCartItems:
          return new GetShoppingCartItemsMessageReply({
            success: true,
            error: null,
            data: {
              items: mockShoppingData,
            },
          });
      }
    };

    mockKafkaSend.mockImplementation((event) => ({
      subscribe: mockKafkaSubscribe.mockImplementation(
        (fn: (data: any) => any) => {
          fn(getReply(event));
        },
      ),
    }));

    mockStripe.paymentIntents.create.mockReturnValue({
      client_secret: 'client secret',
    });

    const res = await resolver.createPaymentIntent(mockedUser);

    console.log(JSON.stringify(mockKafkaSend.mock.calls, null, 2));

    expect(mockKafkaSend.mock.calls[0]).toEqual([
      KAFKA_MESSAGES.SHOPPING_CART_MESSAGES.getShoppingCartItems,
      new GetShoppingCartItemsMessage({
        ownerId: mockedUser.id,
      }),
    ]);

    expect(mockKafkaSend.mock.calls[2]).toEqual([
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsCheckoutData,
      new GetProductsCheckoutDataMessage({
        products: [
          { id: 'cart 1', qty: 5 },
          { id: 'cart 2', qty: 10 },
          { id: 'cart 3', qty: 15 },
        ],
      }),
    ]);
    expect(mockKafkaSend.mock.calls[1]).toEqual([
      KAFKA_MESSAGES.SERVICES_MESSAGES.getServicesCheckoutData,
      new GetServicesCheckoutDataMessage({
        services: [
          { id: 'cart 5', qty: 20, type: 'hotel-room' },
          { id: 'cart 6', qty: 25, type: 'restaurant' },
        ],
      }),
    ]);
    expect(mockStripe.paymentIntents.create).toBeCalledTimes(1);
    expect(mockStripe.paymentIntents.create).toBeCalledWith({
      amount: 70,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      transfer_group: mockedUser.id,
    });
    expect(res).toBe('client secret');
  });
});
