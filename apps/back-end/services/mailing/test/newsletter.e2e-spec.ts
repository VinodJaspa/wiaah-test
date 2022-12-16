import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  AuthorizationDecodedUser,
  MockedAdminUser,
  mockedUser,
  requestGraphql,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';
import { AppModule } from 'src/app.module';

describe('newsletter', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should get newsletters', async () => {
    prisma.newsletter.createMany({
      data: [...Array(15)].map(() => ({
        ownerId: mockedUser.id,
        emailSettings: {},
      })),
    });

    const query = `
    query getall(
        $take:Int!
        $page!
    ){
        getNewletterSubscribers(
            args:{
                pagination:{
                    take:$take
                    page:$page
                }
            }
        ){
            id
        }
    }`;

    let res = await reqGql(query, { take: 5, page: 1 }, mockedUser);

    expect(res.body.errors).toBeDefined();

    res = await reqGql(query, { take: 5, page: 1 }, MockedAdminUser);

    expect(res.body.errors).not.toBeDefined();
  });
});
