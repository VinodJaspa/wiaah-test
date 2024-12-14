import { CreateAccountVerificationInput } from '@acc-verification/dto';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma-client';
import {
  AuthorizationDecodedUser,
  MockedAdminUser,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { AppModule } from '../src/app.module';

describe('account verification e2e', () => {
  let app: INestApplication;
  const mockKafka = new NestKafkaClientMock();

  const prisma: PrismaClient;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.ACCOUNTS_SERVICE.token)
      .useValue(mockKafka)
      .compile();

    app = module.createNestApplication();
    app.init();
  });

  afterAll(() => {
    if (app) {
      app.close();
    }
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should create a verification request', async () => {
    const getAccVerificationsQuery = `
        query {
            getAccountVerificationRequests {
                userId
                acceptedById
                accepted
            }
        }
    `;

    const requestAccountVerificationMutation = `
        mutation req(
            $username:String!
            $fullName:String!
            $knownAs:String!
            $categoryId:ID!
            $idPhoto:String!
        ){
            requestAccountVerification(
                args:{
                    username:$username
                    fullName:$fullName
                    knownAs:$knownAs
                    categoryId:$categoryId
                    idPhoto:$idPhoto   
                }
            )
        }
    `;

    let getAccsRes = await reqGql(getAccVerificationsQuery, {}, mockedUser);
    console.log(JSON.stringify(getAccsRes.body, null, 2));
    expect(getAccsRes.body.errors).toBeDefined();

    getAccsRes = await reqGql(getAccVerificationsQuery, {}, MockedAdminUser);

    expect(getAccsRes.body.errors).not.toBeDefined();
    expect(getAccsRes.body.data.getAccountVerificationRequests).toHaveLength(0);

    const createRes = await reqGql(
      requestAccountVerificationMutation,
      {
        fullName: 'test name',
        categoryId: secendMockedUser.id,
        idPhoto: 'test photo src',
        knownAs: 'test knownas',
        username: 'test username',
      } as CreateAccountVerificationInput,
      mockedUser,
    );

    expect(createRes.body.errors).not.toBeDefined();
    expect(createRes.body.data.requestAccountVerification).toBe(true);

    getAccsRes = await reqGql(getAccVerificationsQuery, {}, MockedAdminUser);

    expect(getAccsRes.body.errors).not.toBeDefined();
    expect(getAccsRes.body.data.getAccountVerificationRequests).toHaveLength(1);
  });
});
