import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prismaService';
import { AppModule } from '../app.module';
import { ObjectId } from 'mongodb';
import {
  accountType,
  AuthorizationDecodedUser,
  MockedAdminUser,
  mockedUser,
  requestGraphql,
} from 'nest-utils';
import { BanCitiesInput } from './dto/create-banned-country.input';

describe('country banning', () => {
  let app: INestApplication;

  const prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const bansellersquery = `
        mutation ban($ids:[ID!]!){
          banSellersCitites(
            args:{
              citiesIds:$ids
            }
          )
        }
      `;

  const unbansellersquery = `mutation unban($ids:[String!]!){
        unBanSellersCities(
          args:{
            citiesIds:$ids
          }
        )
      }`;

  const unbanbuyersquery = `mutation unban($ids:[String!]!){
        unBanBuyersCities(
          args:{
            citiesIds:$ids
          }
        )
      }`;

  const banbuyersquery = `
    mutation ban(
        $ids:[String!]!
    ){
        banBuyersCities(
            args:{
                citiesIds:$ids
            }
        )
    }`;

  it('Should ban buyer city', async () => {
    let cities = await prisma.bannedCity.findMany();
    let input: BanCitiesInput = {
      citiesIds: [new ObjectId().toHexString(), new ObjectId().toHexString()],
    };
    expect(cities).toHaveLength(0);

    let res = await reqGql(banbuyersquery, input, mockedUser);

    cities = await prisma.bannedCity.findMany();
    expect(res.body.errors).toBeDefined();
    expect(cities).toHaveLength(0);

    res = await reqGql(banbuyersquery, input, MockedAdminUser);

    cities = await prisma.bannedCity.findMany();
    expect(res.body.errors).not.toBeDefined();
    expect(cities).toHaveLength(2);
    expect(
      cities.every(
        (v) =>
          input.citiesIds.includes(v.cityId) &&
          v.bannedFor === accountType.BUYER,
      ),
    ).toBe(true);

    res = await reqGql(unbanbuyersquery, input, MockedAdminUser);

    cities = await prisma.bannedCity.findMany();
    expect(res.body.errors).not.toBeDefined();
    expect(cities).toHaveLength(0);
  });
  it('Should ban seller city', async () => {
    let cities = await prisma.bannedCity.findMany();
    let input: BanCitiesInput = {
      citiesIds: [new ObjectId().toHexString(), new ObjectId().toHexString()],
    };
    expect(cities).toHaveLength(0);

    let res = await reqGql(bansellersquery, input, mockedUser);

    cities = await prisma.bannedCity.findMany();
    expect(res.body.errors).toBeDefined();
    expect(cities).toHaveLength(0);

    res = await reqGql(bansellersquery, input, MockedAdminUser);

    cities = await prisma.bannedCity.findMany();
    expect(res.body.errors).not.toBeDefined();
    expect(cities).toHaveLength(2);
    expect(
      cities.every(
        (v) =>
          input.citiesIds.includes(v.cityId) &&
          v.bannedFor === accountType.SELLER,
      ),
    ).toBe(true);

    res = await reqGql(unbansellersquery, input, MockedAdminUser);

    cities = await prisma.bannedCity.findMany();
    expect(res.body.errors).not.toBeDefined();
    expect(cities).toHaveLength(0);
  });
});
