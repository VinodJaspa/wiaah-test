import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { mockedUser, requestGraphql, secendMockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { PrismaModule } from '../app.module';

import { IdentityVerificationModule } from './identity-verification.module';

describe('id verification e2e testing', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mockGetUser: jest.Mock;

  beforeEach(async () => {
    mockGetUser = jest.fn().mockResolvedValue(mockedUser);

    const moduleRef = await Test.createTestingModule({
      imports: [
        PrismaModule,
        IdentityVerificationModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          context: (ctx) => ({ ...ctx, user: mockGetUser() }),
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prisma = moduleRef.get(PrismaService);
  });

  //   afterEach(() => app.close());

  const reqGraphql = (q: string, v: Record<string, any>) =>
    requestGraphql(app, q, v);

  it('should send id verficaition request', async () => {
    const requestIdVerificationMutation = `
        mutation request(
            $first:String!,
            $last:String!,
            $fullAddress:String!,
            $dateOfBirth:String!,
            $id_front:String!,
            $id_back:String!
        ){
            requestIdVerification (
                requestInput:{
                    firstName:$first,
                    lastName:$last,
                    fullAddress:$fullAddress,
                    dateOfBirth:$dateOfBirth,
                    id_front:$id_front,
                    id_back:$id_back
                }
            )

        }
        `;
    const res = await reqGraphql(requestIdVerificationMutation, {
      first: 'test first',
      last: 'test last',
      fullAddress: 'test address',
      dateOfBirth: new Date().toString(),
      id_front: 'front',
      id_back: 'back',
    });

    let req = await prisma.userIdenityVerificationRequest.findFirst();
    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.requestIdVerification).toBe(req.VVC);
    expect(req.accepted).toBe(false);
    expect(req.compeleted).toBe(false), expect(req.userId).toBe(mockedUser.id);

    const provideVvcPicMutation = `
        mutation vvcPic($vvcPic:String!) {
            provideVVCPicture(
                pic:$vvcPic
            )
        }
    `;
    // provide vvc pic without requesting a verification

    mockGetUser.mockReturnValue(secendMockedUser);

    const unValidRes = await reqGraphql(provideVvcPicMutation, {
      vvcPic: 'test pic url',
    });
    req = await prisma.userIdenityVerificationRequest.findFirst();

    expect(unValidRes.body.data.provideVVCPicture).toBe(false);
    expect(req.compeleted).toBe(false);
    expect(req.VVCPicture).toBe(null);

    // provide user face picture with vvc code

    mockGetUser.mockReturnValue(mockedUser);

    const validRes = await reqGraphql(provideVvcPicMutation, {
      vvcPic: 'test pic url',
    });
    req = await prisma.userIdenityVerificationRequest.findFirst();

    expect(validRes.body.data.provideVVCPicture).toBe(true);
    expect(req.compeleted).toBe(true);
    expect(req.VVCPicture).toBe('test pic url');
  });
});
