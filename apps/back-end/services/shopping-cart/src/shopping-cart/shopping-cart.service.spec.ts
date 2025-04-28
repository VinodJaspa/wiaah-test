import { AddShoppingCartServiceItemInput } from '@dto';
import { AppliedVoucher, CartItem, ShoppingCart } from '@entities';
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ApplyableVoucherMessageReply,
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
  GetServiceMetaDataMessage,
  GetServiceMetaDataMessageReply,
  GetVoucherDataMessageReply,
} from 'nest-dto';
import {
  KAFKA_MESSAGES,
  mockedUser,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let mockKafkaEmit: jest.Mock;
  let mockKafkaSend: jest.Mock;

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockKafkaSend = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        PrismaService,
        {
          provide: SERVICES.SHOPPING_CART_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
            send: mockKafkaSend,
          },
        },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create only one shoppingCart record per account', async () => {
    await service.createShoppingCart(mockedUser.id);

    const shoppingcarts = await service.getShoppingCarts();
    expect(shoppingcarts.length).toBe(1);
    expect(shoppingcarts.at(0).ownerId).toBe(mockedUser.id);

    let duplicationTested = false;
    try {
      await service.createShoppingCart(mockedUser.id);
    } catch (error) {
      const isInstance = error instanceof UnprocessableEntityException;
      expect(isInstance).toBe(true);
      duplicationTested = true;
    }

    expect(duplicationTested).toBe(true);

    expect(shoppingcarts.length).toBe(1);
    expect(shoppingcarts.at(0).ownerId).toBe(mockedUser.id);
  });

  it('tell if a user has a shopping cart', async () => {
    let has = await service.ownerCartExists(mockedUser.id);
    expect(has).toBe(false);

    await service.createShoppingCart(mockedUser.id);
    has = await service.ownerCartExists(mockedUser.id);
    expect(has).toBe(true);
  });

  it('should get a shopping cart by its owner id', async () => {
    const mockIds = [mockedUser.id, mockedUser.shopId, secendMockedUser.id];

    for (const id of mockIds) {
      await service.createShoppingCart(id);
    }

    const targetCart = await service.getShoppingCartByOwnerId(
      mockedUser.shopId,
    );

    expect(targetCart.ownerId).toBe(mockedUser.shopId);

    let notFoundTested = false;

    try {
      await service.getShoppingCartByOwnerId(secendMockedUser.shopId);
    } catch (error) {
      const isInstance = error instanceof NotFoundException;
      expect(isInstance).toBe(true);
      notFoundTested = true;
    }

    expect(notFoundTested).toBe(true);
  });

  describe('add product', () => {
    let item: CartItem;
    let mockProductKafkaResponseData;
    let mockProductInput: AddShoppingCartServiceItemInput;

    beforeEach(async () => {
      await service.createShoppingCart(mockedUser.id);

      mockProductKafkaResponseData = {
        name: 'test product name',
        price: 15,
        shopId: 'test shop id',
        thumbnail: 'test photo',
      };
      mockKafkaSend.mockImplementation(() => ({
        subscribe: (fn: (data: GetProductMetaDataMessageReply) => any) => {
          fn(
            new GetProductMetaDataMessageReply({
              success: true,
              error: null,
              data: mockProductKafkaResponseData,
            }),
          );
        },
      }));

      mockProductInput = {
        itemId: 'test item id',
        itemType: 'product',
        quantity: 2,
      };

      item = await service.addProduct(mockedUser, mockProductInput);
    });

    it('should add item of type product to shopping cart', async () => {
      expect(mockKafkaSend).toBeCalled();
      expect(mockKafkaSend).toBeCalledWith(
        KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductMetaData,
        new GetProductMetaDataMessage({
          productId: mockProductInput.itemId,
          userId: mockedUser.id,
        }),
      );

      const cart = await service.getShoppingCartByOwnerId(mockedUser.id);

      expect(cart.cartItems.length).toBe(1);
      expect(item).toStrictEqual(cart.cartItems.at(0));
      expect(cart.cartItems.at(0)).toEqual(
        expect.objectContaining({
          ...mockProductInput,
          providerId: mockProductKafkaResponseData.shopId,
          name: mockProductKafkaResponseData.name,
          price: mockProductKafkaResponseData.price,
          thumbnail: mockProductKafkaResponseData.thumbnail,
        }),
      );
    });

    it('should incress the item quantity if the user already has it in his cart', async () => {
      let cart = await service.getShoppingCartByOwnerId(mockedUser.id);
      expect(cart).toBeDefined();
      expect(cart.cartItems.length).toBe(1);

      await service.addProduct(mockedUser, mockProductInput);

      cart = await service.getShoppingCartByOwnerId(mockedUser.id);

      expect(cart.cartItems.length).toBe(1);
      expect(cart.cartItems.at(0).quantity).toBe(4);
    });
    it('should remove item from shopping cart', async () => {
      let cart = await service.getShoppingCartByOwnerId(mockedUser.id);
      expect(cart.cartItems.length).toBe(1);

      let removedItem = await service.removeItem(mockedUser, {
        itemId: 'test',
      });

      cart = await service.getShoppingCartByOwnerId(mockedUser.id);
      expect(cart.cartItems.length).toBe(1);

      removedItem = await service.removeItem(mockedUser, {
        itemId: mockProductInput.itemId,
      });

      expect(removedItem).toBe(true);

      cart = await service.getShoppingCartByOwnerId(mockedUser.id);
      expect(cart.cartItems.length).toBe(0);
    });
    it('should clear shopping cart', async () => {
      await service.addProduct(mockedUser, {
        ...mockProductInput,
        itemId: 'another product testid',
      });
      let cart = await service.getShoppingCartByOwnerId(mockedUser.id);
      expect(cart.cartItems.length).toBe(2);

      await service.clearShoppingCart(mockedUser.id);

      cart = await service.getShoppingCartByOwnerId(mockedUser.id);
      expect(cart.cartItems.length).toBe(0);
    });
  });

  it('should fail if product info is wrong', async () => {
    await service.createShoppingCart(mockedUser.id);

    mockKafkaSend.mockImplementation(() => ({
      subscribe: (fn: (data: GetProductMetaDataMessageReply) => any) => {
        fn(
          new GetProductMetaDataMessageReply({
            data: null,
            error: new NotFoundException('test product not found'),
            success: false,
          }),
        );
      },
    }));

    let failTested = false;
    try {
      await service.addProduct(mockedUser, {
        itemId: 'testitemId',
        itemType: 'product',
        quantity: 1,
      });
    } catch (error) {
      const isInstance = error instanceof NotFoundException;
      expect(isInstance).toBe(true);
      failTested = true;
    }

    expect(failTested).toBe(true);
    expect(
      (await service.getShoppingCartByOwnerId(mockedUser.id)).cartItems.length,
    ).toBe(0);
  });

  it('should add item of type service to shopping cart', async () => {
    const mockServiceKafkaResponseData = {
      name: 'service name',
      price: 354,
      thumbnail: 'test thumb',
      providerId: 'test provider id',
    };

    await service.createShoppingCart(mockedUser.id);

    mockKafkaSend.mockImplementation(() => ({
      subscribe: (fn: (data: GetServiceMetaDataMessageReply) => any) => {
        fn(
          new GetServiceMetaDataMessageReply({
            success: true,
            error: null,
            data: mockServiceKafkaResponseData,
          }),
        );
      },
    }));

    const mockServiceInput: AddShoppingCartServiceItemInput = {
      itemId: 'test service',
      itemType: 'service',
      quantity: 2,
    };

    const servciceItem = await service.addService(mockedUser, mockServiceInput);

    expect(mockKafkaSend).toBeCalledTimes(1);
    expect(mockKafkaSend).toBeCalledWith(
      KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceMetaData,
      new GetServiceMetaDataMessage({
        serviceId: mockServiceInput.itemId,
        userId: mockedUser.id,
      }),
    );

    const cart = await service.getShoppingCartByOwnerId(mockedUser.id);

    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems.at(0)).toStrictEqual(servciceItem);
    expect(cart.cartItems.at(0)).toStrictEqual({
      ...mockServiceKafkaResponseData,
      ...mockServiceInput,
    });
  });

  it('should fail if service info is wrong', async () => {
    await service.createShoppingCart(mockedUser.id);

    mockKafkaSend.mockImplementation(() => ({
      subscribe: (fn: (data: GetServiceMetaDataMessageReply) => any) => {
        fn(
          new GetServiceMetaDataMessageReply({
            data: null,
            error: new NotFoundException('test service not found'),
            success: false,
          }),
        );
      },
    }));

    let failTested = false;
    try {
      await service.addService(mockedUser, {
        itemId: 'testitemId',
        itemType: 'service',
        quantity: 1,
      });
    } catch (error) {
      const isInstance = error instanceof NotFoundException;
      expect(isInstance).toBe(true);
      failTested = true;
    }

    expect(failTested).toBe(true);
    expect(
      (await service.getShoppingCartByOwnerId(mockedUser.id)).cartItems.length,
    ).toBe(0);
  });

  describe('shopping cart voucher', () => {
    let cart: ShoppingCart;
    beforeEach(async () => {
      await service.createShoppingCart(mockedUser.id);

      mockKafkaSend.mockImplementation(() => ({
        subscribe: (fn: (data: GetProductMetaDataMessageReply) => any) => {
          fn(
            new GetProductMetaDataMessageReply({
              success: true,
              error: null,
              data: {
                name: 'test product name',
                price: 15,
                shopId: 'test shop id',
                thumbnail: 'test photo',
              },
            }),
          );
        },
      }));

      await service.addProduct(mockedUser, {
        itemId: 'item 1',
        itemType: 'product',
        quantity: 1,
      });

      cart = await service.getShoppingCartByOwnerId(mockedUser.id);
      expect(cart.appliedVoucher).toBeNull();
    });

    it('should apply and remove voucher code to the cart if the code applyable', async () => {
      mockKafkaSend.mockImplementation(() => ({
        subscribe: (fn: (data: ApplyableVoucherMessageReply) => any) => {
          fn(
            new ApplyableVoucherMessageReply({
              data: {
                amount: 15,
                currency: 'usd',
                code: 'test voucher',
                convertedAmount: 10,
                convertedToCurrency: 'eur',
                applyable: true,
              },
              error: null,
              success: true,
            }),
          );
        },
      }));

      cart = await service.applyVoucher(mockedUser.id, {
        voucherCode: 'test voucher',
      });

      expect(cart).toStrictEqual(
        await service.getShoppingCartByOwnerId(mockedUser.id),
      );
      expect(cart.appliedVoucher).toStrictEqual<AppliedVoucher>({
        amount: 15,
        code: 'test voucher',
        convertedAmount: 10,
        convertedToCurrency: 'eur',
        currency: 'usd',
      });

      const removedVoucherCart = await service.removeVoucher(mockedUser.id);

      expect(removedVoucherCart).toStrictEqual(
        await service.getShoppingCartByOwnerId(mockedUser.id),
      );

      expect(
        (await service.getShoppingCartByOwnerId(mockedUser.id)).appliedVoucher,
      ).toBeNull();
    });

    it('should fail if voucher is not applyable', async () => {
      mockKafkaSend.mockImplementation(() => ({
        subscribe: (fn: (data: ApplyableVoucherMessageReply) => any) => {
          fn(
            new ApplyableVoucherMessageReply({
              data: {
                amount: 10,
                applyable: false,
                code: 'test voucher',
                convertedAmount: 8,
                convertedToCurrency: 'eur',
                currency: 'usd',
              },
              error: null,
              success: true,
            }),
          );
        },
      }));

      let applyTested = false;
      try {
        await service.applyVoucher(mockedUser.id, {
          voucherCode: 'test voucher',
        });
      } catch (error) {
        const isInstance = error instanceof BadRequestException;
        expect(isInstance).toBe(true);
        applyTested = true;
      }

      expect(applyTested).toBe(true);
    });
  });
});
