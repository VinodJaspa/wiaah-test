import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { mockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import * as request from 'supertest';

import { CreateShopInput } from '../dto';
import { ShopModule } from '../shop.module';
import { ElasticGlobalModule } from '../../app.module';

describe('shop e2e tests', () => {
  let app: INestApplication;
  let mockGetUser: jest.Mock;
  let prisma: PrismaService;

  beforeEach(async () => {
    mockGetUser = jest.fn().mockReturnValue(mockedUser);
    const moduleRef = await Test.createTestingModule({
      imports: [
        ShopModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          context: (ctx) => ({ ...ctx, user: mockGetUser() }),
        }),
        ElasticGlobalModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prisma = await moduleRef.get(PrismaService);

    await prisma.shop.create({
      data: {
        banner: '',
        description: '',
        location: {
          address: '',
          city: '',
          country: '',
          lat: 1,
          long: 5,
          state: '',
        },
        name: '',
        ownerId: mockedUser.id,
        verified: true,
      },
    });
  });

  afterEach(async () => await app.close());

  function requestGraphql(query: string, variables: Record<string, any>) {
    return request(app.getHttpServer()).post('/graphql').send({
      query,
      variables,
    });
  }

  it('should update shop', async () => {
    const input = {
      banner: 'test banner',
      description: 'test desc',
      location: {
        address: 'test add',
        city: 'test city',
        country: 'test country',
        lat: 4,
        long: 5,
        state: 'test state',
      },
      name: 'test name',
      storeType: ['product'],
      targetGenders: ['male'],
      vendorType: ['individual'],
    } as CreateShopInput;

    const update_shop_mutation = `
    mutation updateMyShop (
        $banner:String!,
        $description:String!,
        $location_address:String!,
        $location_city:String!,
        $location_state:String!,
        $location_country:String!,
        $location_lat:Float!,
        $location_lon:Float!,
        $name:String!,
        $storeType:[StoreType!]!,
        $targetGenders:[TargetGenders!]!,
        $vendorType:[VendorType!]!
        ){
            updateMyShop(
                updateMyShopInput:{
                    banner:$banner,
                    description:$description,
                    location:{
                        address:$location_address,
                        city:$location_city,
                        country:$location_country,
                        lat:$location_lat,
                        long:$location_lon,
                        state:$location_state
                    },
                    name:$name,
                    storeType:$storeType,
                    targetGenders:$targetGenders,
                    vendorType:$vendorType
                }
                ){
                    id
                    name
                    banner
                    location {
                        address
                        city
                        country
                lat
                long
                state
            }
            name
            storeType
            targetGenders
            vendorType
        }
    }
    `;
    const res = await requestGraphql(update_shop_mutation, {
      ...input,
      location_address: input.location.address,
      location_city: input.location.city,
      location_state: input.location.state,
      location_country: input.location.country,
      location_lat: input.location.lat,
      location_lon: input.location.long,
    });
    // console.log(JSON.stringify({ res: res.body }, null, 2));

    expect(await prisma.shop.findFirst()).toMatchObject(input);
  });
});
