import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { Test } from '@nestjs/testing';
import {
  AuthorizationDecodedUser,
  GqlPaginationInput,
  KAFKA_BROKERS,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';

import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma-client';
import { CreateProductInput, UpdateProdutctInput } from '@products/dto';

let mockSellerUser: AuthorizationDecodedUser = {
  ...mockedUser,
  accountType: 'seller',
};
let mockBuyerUser: AuthorizationDecodedUser = {
  ...secendMockedUser,
  accountType: 'buyer',
};

describe('products e2e', () => {
  let app: INestApplication;
  let kafkaMock = new NestKafkaClientMock();
  let kafka = new Kafka({
    brokers: KAFKA_BROKERS,
  });
  let prisma = new PrismaClient();
  let producer = kafka.producer();

  beforeAll(async () => {
    await producer.connect();
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.PRODUCTS_SERVICE.token)
      .useValue(kafkaMock)
      .compile();

    app = module.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.PRODUCTS_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.PRODUCTS_SERVICE.groupId,
        },
      },
    });
    await app.startAllMicroservices();
    await app.init();
  });
  beforeEach(() => {
    kafkaMock.reset();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    await producer.disconnect();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should create, update products properly', async () => {
    const createInput: CreateProductInput = {
      title: 'test t',
      attributes: [{ name: 'test', values: ['v1', 'v2'] }],
      brand: 'brend',
      cashback: {
        amount: 5,
        type: 'cash',
        units: 15,
      },
      description: 'test desc',
      discount: {
        amount: 15,
        units: 5,
      },
      visibility: 'public',
      type: 'goods',
      presentations: [{ src: 'testSrc', type: 'image' }],
      categoryId: '',
      price: 15,
      stock: 15,
    };

    let updateInput: UpdateProdutctInput = {
      id: '',
      title: 'update t',
      attributes: [{ name: 'update', values: ['U1', 'U2'] }],
      brand: 'updete',
      cashback: {
        amount: 3,
        type: 'percent',
        units: 25,
      },
      description: 'test update desc',
      discount: {
        amount: 20,
        units: 10,
      },
      visibility: 'hidden',
      type: 'digital',
      presentations: [{ src: 'update src', type: 'video' }],
      categoryId: 'update cate id',
      price: 20,
      stock: 10,
    };

    const createProductMutation = `
        mutation create(
            $type: ProductType!
            $title: String!
            $description: String!
            $categoryId: ID!
            $attributes: [ProductAttributeInput!]!
            $stock: Int!
            $discount: DiscountInput!
            $cashback: CashBackInput!
            $presentations: [ProductPresentationInput!]!
            $price: Float!
            $brand: String!
            $visibility: VisibilityEnum!
        ){
            createNewProduct(
              createNewProductInput:{
                type:$type 
                title:$title 
                description:$description 
                categoryId:$categoryId 
                attributes:$attributes
                stock:$stock 
                discount:$discount 
                cashback:$cashback 
                presentations:$presentations
                price:$price 
                brand:$brand 
                visibility:$visibility 
              }
            ){
                id
                sellerId
                title
                description
            }
        }
    `;

    const updateProductMutation = `
        mutation update(
            $id:ID!
            $type: ProductType!
            $title: String!
            $description: String!
            $categoryId: ID!
            $attributes: [ProductAttributeInput!]!
            $stock: Int!
            $discount: DiscountInput!
            $cashback: CashBackInput!
            $presentations: [ProductPresentationInput!]!
            $price: Float!
            $brand: String!
            $visibility: VisibilityEnum!
        ){
            updateProduct(
              updateProductArgs:{
                id:$id
                type:$type 
                title:$title 
                description:$description 
                categoryId:$categoryId 
                attributes:$attributes
                stock:$stock 
                discount:$discount 
                cashback:$cashback 
                presentations:$presentations
                price:$price 
                brand:$brand 
                visibility:$visibility 
              }
            ){
                id
                sellerId
                title
                description
            }
        }
    `;

    const deleteProductMutation = `
        mutation delete(
          $id:ID!
        ){
          deleteProduct(
            productId:$id
          ){
            id
          }
        }
    `;

    const getMyProductsQuery = `
        query get(
          $page:Int!
          $take:Int!
        ){
          getMyProducts(
            args:{
              page:$page
              take:$take
            }
          ){
            sellerId
            earnings
            sales
          }
        }
    `;

    let createRes = await reqGql(
      createProductMutation,
      createInput,
      mockBuyerUser,
    );

    expect(createRes.body.errors).toBeDefined();

    createRes = await reqGql(
      createProductMutation,
      createInput,
      mockSellerUser,
    );

    expect(createRes.body.errors).not.toBeDefined();

    expect(await prisma.product.count()).toBe(1);
    expect(await prisma.product.findFirst()).toMatchObject({
      ...createInput,
      sellerId: mockSellerUser.id,
    });

    let myProdsRes = await reqGql(
      getMyProductsQuery,
      { page: 1, take: 5 } as GqlPaginationInput,
      mockBuyerUser,
    );
    expect(myProdsRes.body.errors).toBeDefined();

    myProdsRes = await reqGql(
      getMyProductsQuery,
      { page: 1, take: 5 } as GqlPaginationInput,
      mockSellerUser,
    );
    expect(myProdsRes.body.errors).not.toBeDefined();
    expect(myProdsRes.body.data.getMyProducts).toStrictEqual([
      {
        sellerId: mockSellerUser.id,
        earnings: 0,
        sales: 0,
      },
    ]);

    // update product
    updateInput = {
      ...updateInput,
      id: createRes.body.data.createNewProduct.id,
    };

    let updateRes = await reqGql(
      updateProductMutation,
      { ...updateInput, id: createRes.body.data.createNewProduct.id },
      mockBuyerUser,
    );

    expect(updateRes.body.errors).toBeDefined();
    expect(await prisma.product.findFirst()).toMatchObject(createInput);

    updateRes = await reqGql(
      updateProductMutation,
      { ...updateInput, id: createRes.body.data.createNewProduct.id },
      { ...mockBuyerUser, accountType: 'seller' },
    );

    expect(updateRes.body.errors).toBeDefined();
    expect(await prisma.product.findFirst()).toMatchObject(createInput);

    updateRes = await reqGql(
      updateProductMutation,
      updateInput,
      mockSellerUser,
    );

    expect(updateRes.body.errors).not.toBeDefined();
    expect(await prisma.product.findFirst()).toMatchObject(updateInput);

    // delete
    let deleteRes = await reqGql(
      deleteProductMutation,
      { id: updateInput.id },
      mockBuyerUser,
    );

    expect(deleteRes.body.errors).toBeDefined();
    expect(await prisma.product.findFirst()).toMatchObject(updateInput);

    deleteRes = await reqGql(
      deleteProductMutation,
      { id: updateInput.id },
      { ...mockBuyerUser, accountType: 'seller' },
    );

    expect(deleteRes.body.errors).toBeDefined();
    expect(await prisma.product.findFirst()).toMatchObject(updateInput);

    deleteRes = await reqGql(
      deleteProductMutation,
      { id: updateInput.id },
      mockSellerUser,
    );
    expect(deleteRes.body.errors).not.toBeDefined();
    expect(await prisma.product.count()).toBe(0);
  });
});
