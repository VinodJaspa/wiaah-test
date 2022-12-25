import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prismaService';
import { AppModule } from '../app.module';
import { ObjectId } from 'mongodb';
import {
  AuthorizationDecodedUser,
  mockedUser,
  requestGraphql,
} from 'nest-utils';

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
    expect(cities).toHaveLength(0);

    const res = await reqGql(banbuyersquery, {}, mockedUser);

    cities = await prisma.bannedCity.findMany();
    expect(res.body.errors).toBeDefined();
    expect(cities).toHaveLength(0);
  });
});
