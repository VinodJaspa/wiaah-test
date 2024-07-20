import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AccountsModule } from '../accounts.module';
import * as request from 'supertest';
import { PrismaService } from 'prismaService';
import { AccountType } from '@prisma-client';
import { mockedUser as _mockedUser } from 'nest-utils';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Account } from 'dist/accounts/entities';

describe('accounts tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mockGetUser: jest.Mock;
  let mockedUser = _mockedUser;

  beforeEach(async () => {
    mockGetUser = jest.fn().mockReturnValue(mockedUser);
    const moduleRef = await Test.createTestingModule({
      imports: [
        AccountsModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          context({ req, res }) {
            return { req, res, user: mockGetUser() };
          },
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prisma = await moduleRef.get(PrismaService);
    const res = await prisma.account.create({
      data: {
        email: 'test@email.com',
        firstName: 'first',
        lastName: 'last',
        password: 'pass123',
        accountType: AccountType.seller,
        birthDate: '1999-03-03',
        companyRegisterationNumber: '1324',
        verified: true,
      },
    });
    mockedUser = { ...mockedUser, id: res.id };
  });

  afterEach(async () => {
    await app.close();
  });

  function requestGraphql(query: string, variables: Record<string, any>) {
    return request(app.getHttpServer()).post('/graphql').send({
      query,
      variables,
    });
  }

  it('should update accountInfo', async () => {
    const update_account_info_mutation = `
        mutation editAccount ($first:String!, $last:String!, $CRN:String!) {
            editAccount(
                editAccountInput:{
                    firstName:$first,
                    lastName:$last,
                    companyRegisterationNumber:$CRN
                }
            ){
                id
                email
                companyRegisterationNumber
            }
        }
    `;

    mockGetUser.mockReturnValue(mockedUser);

    const res = await requestGraphql(update_account_info_mutation, {
      first: 'test first',
      last: 'test last',
      CRN: 'test crn',
    });

    expect(res.body.errors).not.toBeDefined();
    expect(await prisma.account.findFirst()).toMatchObject({
      firstName: 'test first',
      companyRegisterationNumber: 'test crn',
      email: 'test@email.com',
      lastName: 'test last',
    } as Account);
  });
});
