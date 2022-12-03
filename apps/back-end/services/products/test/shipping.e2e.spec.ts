import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma-client';
import {
  CreateShippingRuleInput,
  UpdateShippingRuleInput,
} from '@shipping-rules/dto';
import { Kafka } from 'kafkajs';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  mockedUser,
  requestGraphql,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { AppModule } from '../src/app.module';

describe('shipping e2e', () => {
  let app: INestApplication;
  let kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.SHIPPING_SERVICE.clientId,
  });

  let producer = kafka.producer();
  let consumer = kafka.consumer({
    groupId: SERVICES.SHIPPING_SERVICE.groupId,
  });

  let prisma = new PrismaClient();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.SHIPPING_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.SHIPPING_SERVICE.groupId,
        },
      },
    });

    await app.startAllMicroservices();
    await app.init();
  });

  beforeEach(async () => {
    await producer.connect();
    await consumer.connect();
  });

  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
    await consumer.disconnect();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const createShippingRuleMutation = `
  mutation create(
    $countries:[ShippingCountryInput!]!
    $name:String!
    $cost:Float!
    $shippingTypes:[ShippingType!]!
    $deliveryTimeRange:ShippingDeliveryTimeRangeInput!
  ){
    createShippingRule(
        createShippingRuleArgs :{
            countries:$countries
            name:$name
            cost:$cost
            shippingTypes:$shippingTypes
            deliveryTimeRange:$deliveryTimeRange
        }
    ){
        id
        sellerId
        name
        countries {
            name
            code
        }
        cost
        shippingTypes
        deliveryTimeRange {
            from 
            to
        }
    }
  }
  `;
  const updateShippingRuleMutation = `
  mutation update(
    $id:ID!
    $countries:[ShippingCountryInput!]!
    $name:String!
    $cost:Float!
    $shippingTypes:[ShippingType!]!
    $deliveryTimeRange:ShippingDeliveryTimeRangeInput!
  ){
    updateShippingRule(
        updateShippingRuleArgs:{
            id:$id
            countries:$countries
            name:$name
            cost:$cost
            shippingTypes:$shippingTypes
            deliveryTimeRange:$deliveryTimeRange
        }
    ){
        id
        sellerId
        name
        countries {
            name
            code
        }
        cost
        shippingTypes
        deliveryTimeRange {
            from 
            to
        }
    }
  }
  `;

  const deleteShippingRule = `
  mutation delete(
    $id:ID!
  ){
    deleteShippingRule(
        id:$id
    ){
        id
        sellerId
        name
        countries {
            name
            code
        }
        cost
        shippingTypes
        deliveryTimeRange {
            from 
            to
        }
    }
  }
  `;

  it('should crud shipping rule', async () => {
    const createInput: CreateShippingRuleInput = {
      cost: 15,
      countries: [
        {
          code: 'eg',
          name: 'egypt',
        },
      ],
      deliveryTimeRange: {
        from: 7,
        to: 10,
      },
      name: 'eg rule',
      shippingTypes: ['click_and_collect', 'paid'],
    };
    const createRes = await reqGql(
      createShippingRuleMutation,
      createInput,
      mockedUser,
    );

    expect(createRes.body.errors).not.toBeDefined();
    expect(createRes.body.data.createShippingRule.sellerId).toBe(mockedUser.id);

    expect((await prisma.shippingRule.findMany()).length).toBe(1);

    let rule = (await prisma.shippingRule.findMany()).at(0);

    expect(rule).toMatchObject(createInput);

    let updateInput: UpdateShippingRuleInput = {
      id: rule.id,
      cost: 35,
      countries: [
        {
          code: 'us',
          name: 'usa',
        },
      ],
      deliveryTimeRange: {
        from: 3,
        to: 5,
      },
      name: 'updated',
      shippingTypes: ['click_and_collect'],
    };

    let updateRes = await reqGql(
      updateShippingRuleMutation,
      updateInput,
      secendMockedUser,
    );
    expect(updateRes.body.errors).toBeDefined();

    updateRes = await reqGql(
      updateShippingRuleMutation,
      updateInput,
      mockedUser,
    );
    expect(updateRes.body.errors).not.toBeDefined();

    rule = (await prisma.shippingRule.findMany()).at(0);
    expect(rule).toMatchObject(updateInput);

    let deleteRes = await reqGql(
      deleteShippingRule,
      { id: rule.id },
      secendMockedUser,
    );
    expect(deleteRes.body.errors).toBeDefined();

    deleteRes = await reqGql(deleteShippingRule, { id: rule.id }, mockedUser);
    expect(deleteRes.body.errors).not.toBeDefined();
    expect(await prisma.shippingRule.findMany()).toHaveLength(0);
  });
});
