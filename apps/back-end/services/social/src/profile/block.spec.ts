import { TestingModule, Test } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import {
  KAFKA_EVENTS,
  mockedUser,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { ProfileVisibility } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { ProfileResolver } from './profile.resolver';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { ProfileBlockEvent } from 'nest-dto';

describe('Block/unblock functionlaity', () => {
  let service: ProfileService;
  let resolver: ProfileResolver;
  let mockMongo: MongoMemoryReplSet;
  let mockKafkaEmit: jest.Mock;

  const createProfileMockInput = {
    photo: 'test-photo',
    username: 'username',
    profession: 'test pro',
    bio: 'test bio',
    visibility: 'public' as ProfileVisibility,
  };

  afterEach(async () => await mockMongo.stop());

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockMongo = await MongoMemoryReplSet.create({
      replSet: { count: 1 },
      instanceOpts: [{ storageEngine: 'wiredTiger' }],
    });
    process.env.DATABASE_URL = mockMongo.getUri('testDB');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        ProfileResolver,
        PrismaService,
        {
          provide: SERVICES.SOCIAL_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    resolver = module.get<ProfileResolver>(ProfileResolver);
  });

  it('should block profile and prevent interactions and fire profile blocked kafka event and unblock profile and fire profile unblocked kafka event', async () => {
    const firstProfile = await resolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );
    const secendProfile = await resolver.createProfile(
      createProfileMockInput,
      secendMockedUser,
    );

    // first profile blocks secend profile
    const res = await resolver.BlockProfile(
      {
        profileId: secendProfile.id,
      },
      mockedUser,
    );

    expect(mockKafkaEmit).toBeCalledWith(
      KAFKA_EVENTS.SOCIAL_EVENTS.profileBlocked,
      new ProfileBlockEvent({
        blockedProfileId: secendProfile.id,
        blockerProfileId: firstProfile.id,
      }),
    );
    expect(res).toBe(true);

    let canInteract = await service.canInteractWith(
      firstProfile.id,
      secendProfile.id,
    );

    expect(canInteract).toBe(false);

    const unblock = await resolver.unBlockProfile(
      { profileId: secendProfile.id },
      mockedUser,
    );

    expect(unblock).toBe(true);

    canInteract = await service.canInteractWith(
      firstProfile.id,
      secendProfile.id,
    );

    expect(canInteract).toBe(true);
  });
});
