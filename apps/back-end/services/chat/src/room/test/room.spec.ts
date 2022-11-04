import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';

import { PrismaModule } from '../../app.module';
import { RoomModule } from '../room.module';
import { RoomResolver } from '../room.resolver';

describe('RoomResolver', () => {
  let resolver: RoomResolver;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [RoomModule, PrismaModule],
    }).compile();

    await module.init();

    prisma = module.get(PrismaService);
    resolver = module.get(RoomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get my chat rooms', async () => {
    let rooms = await resolver.getMyChatRooms(mockedUser);

    expect(rooms.length).toBe(0);
    expect(rooms.every((v) => v.membersUserIds.includes(mockedUser.id))).toBe(
      true,
    );

    await prisma.room.create({
      data: {
        roomType: 'private',
        members: [{ userId: mockedUser.id, unSeenNum: 0, online: false }],
      },
    });

    rooms = await resolver.getMyChatRooms(mockedUser);

    expect(rooms.length).toBe(1);
    expect(rooms.every((v) => v.membersUserIds.includes(mockedUser.id))).toBe(
      true,
    );
    await module.close();
  });
});
