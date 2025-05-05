import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import {
  AuthorizationDecodedUser,
  NestKafkaClientMock,
  requestGraphql,
  SERVICES,
  KafkaMessageHandler,
  mockedUser,
} from 'nest-utils';

import * as NestUtils from 'nest-utils';
import {
  GetBulkUserMostInteractionersMessageReply,
  GetUserMostInteractionersMessageReply,
} from 'nest-dto';
import { ObjectId } from 'mongodb';

jest.mock('nest-utils', () => ({
  ...((jest.requireActual('nest-utils') as typeof NestUtils) || {}),
  KafkaMessageHandler: jest.fn(),
}));

describe('friends tests', () => {
  let app: INestApplication;
  const kafkaMock = new NestKafkaClientMock();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.DISCOVER.token)
      .useValue(kafkaMock)
      .compile();

    app = module.createNestApplication();

    await app.init();
  });
  const mockKafkaHandler = KafkaMessageHandler as jest.Mock;

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const getFriendSuggestionsQuery = `
  query{
    getMyFriendSuggestions {
        accounts {
            id
        }
    }
  }`;

  it('should get friend suggestions', async () => {
    const interactioner1 = new ObjectId().toHexString();
    const interactioner2 = new ObjectId().toHexString();
    const interactioner3 = new ObjectId().toHexString();
    mockKafkaHandler.mockReturnValueOnce(
      new GetUserMostInteractionersMessageReply({
        success: true,
        data: { users: [{ id: interactioner1, score: 24 }] },
        error: null,
      }),
    );

    mockKafkaHandler.mockReturnValueOnce(
      new GetBulkUserMostInteractionersMessageReply({
        success: true,
        data: {
          users: [
            {
              id: interactioner1,
              users: [
                { id: interactioner3, score: 15 },
                { id: interactioner2, score: 30 },
              ],
            },
          ],
        },
        error: null,
      }),
    );

    let res = await reqGql(getFriendSuggestionsQuery, {}, null);

    expect(res.body.errors).toBeDefined();

    res = await reqGql(getFriendSuggestionsQuery, {}, mockedUser);

    expect(res.body.errors).not.toBeDefined();

    expect(res.body.data.getMyFriendSuggestions.accounts).toHaveLength(2);
    expect(res.body.data.getMyFriendSuggestions.accounts[0].id).toBe(
      interactioner2,
    );
    expect(res.body.data.getMyFriendSuggestions.accounts[1].id).toBe(
      interactioner3,
    );

    expect(mockKafkaHandler).toBeCalledTimes(2);
  });
});
