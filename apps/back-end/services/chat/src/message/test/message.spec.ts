import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser, secendMockedUser } from 'nest-utils';
import { GetRoomByUserIdQuery, Room } from '@room';
import { PrismaModule } from '../../app.module';
import { MessageModule } from '../message.module';
import { MessageResolver } from '../message.resolver';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import { ChatMessage } from '../entities';
import { PrismaService } from 'prismaService';

let mockGetRoomByUserIdQueryExcute = jest.fn();

@QueryHandler(GetRoomByUserIdQuery)
export class MockGetRoomByUserIdQuery
  implements IQueryHandler<GetRoomByUserIdQuery>
{
  execute = mockGetRoomByUserIdQueryExcute;
}

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let prisma: PrismaService;

  mockGetRoomByUserIdQueryExcute.mockClear();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MessageModule, PrismaModule],
      providers: [MockGetRoomByUserIdQuery],
    }).compile();

    await module.init();

    prisma = module.get(PrismaService);
    resolver = module.get(MessageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should send message to a new user', async () => {
    const mockRoom: Room = {
      createdAt: new Date(),
      id: new ObjectId().toHexString(),
      membersUserIds: [mockedUser.id, secendMockedUser.id],
      roomType: 'private',
      unSeenMessages: 0,
      updatedAt: new Date(),
    };
    mockGetRoomByUserIdQueryExcute.mockImplementation(() => mockRoom);
    const res = await resolver.sendMessage(
      {
        content: 'test msg',
        userId: secendMockedUser.id,
      },
      mockedUser,
    );

    expect(res).toMatchObject({
      attachments: [],
      content: 'test msg',
      createdAt: res.createdAt,
      id: res.id,
      roomId: mockRoom.id,
      mentionsUserIds: [],
      updatedAt: res.updatedAt,
      userId: mockedUser.id,
    } as ChatMessage);
    expect(res.roomId).toBe(mockRoom.id);
    expect((await prisma.message.findMany()).length).toBe(1);
    expect((await prisma.message.findMany()).at(0)).toMatchObject({
      attachments: [],
      content: 'test msg',
      createdAt: res.createdAt,
      id: res.id,
      roomId: mockRoom.id,
      mentionsUserIds: [],
      updatedAt: res.updatedAt,
      userId: mockedUser.id,
    });
  });
});
