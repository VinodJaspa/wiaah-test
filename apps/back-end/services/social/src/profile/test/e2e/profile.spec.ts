import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '@prisma-module';
import { ProfileModule } from '@profile-module';
import { mockedUser } from 'nest-utils';

describe('profile e2e tests', () => {
  let app: INestApplication;
  let mockGetUser: jest.Mock;

  beforeEach(async () => {
    mockGetUser = jest.fn().mockReturnValue(mockedUser);
    const moduleRef = await Test.createTestingModule({
      imports: [
        ProfileModule,
        PrismaModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          context: (ctx) => ({ ...ctx, user: mockGetUser() }),
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
  });

  it('Should');
});
