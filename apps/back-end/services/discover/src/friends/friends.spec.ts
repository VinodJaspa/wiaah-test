import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import {
  AuthorizationDecodedUser,
  NestKafkaClientMock,
  requestGraphql,
  SERVICES,
  KafkaMessageHandler,
} from 'nest-utils';

import * as NestUtils from 'nest-utils';
import { GetUserMostInteractionersMessage } from 'nest-dto';

jest.mock('nest-utils', () => ({
  ...((jest.requireActual('nest-utils') as typeof NestUtils) || {}),
  KafkaMessageHandler: jest.fn(),
}));

describe('friends tests', () => {
  let app: INestApplication;
  let kafkaMock = NestKafkaClientMock;

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
  query get(){
    getMyFriendSuggestions {
        accounts {
            id
        }
    }
  }`;

  it('should get friend suggestions', async () => {
    mockKafkaHandler.mockReturnValueOnce(
      new GetUserMostInteractionersMessage({}),
    );

    let res = await reqGql(getFriendSuggestionsQuery, {}, null);

    expect(res.body.errors).toBeDefined();

    res = await reqGql(getFriendSuggestionsQuery, {}, null);

    expect(res.body.errors).not.toBeDefined();

    expect(res.body.data.getMyFriendSuggestions).toHaveLength(10);
  });
});
