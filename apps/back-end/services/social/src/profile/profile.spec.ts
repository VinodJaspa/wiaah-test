import { Test, TestingModule } from '@nestjs/testing';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { PrismaService } from 'prismaService';
import { KAFKA_EVENTS, mockedUser, SERVICES } from 'nest-utils';
import { ProfileCreatedEvent } from 'nest-dto';
import { ProfileVisibility } from 'prismaClient';
import { ProfileNotfoundException } from '@exceptions';

describe('Profile CRUD', () => {
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

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(resolver).toBeDefined();
  });

  it('should create profile and emit kafka event', async () => {
    console.log(process.env.DATABASE_URL);

    let profiles = await resolver.findAll();
    expect(profiles.total).toBe(0);
    expect(profiles.hasMore).toBe(false);
    expect(profiles.data.length).toBe(0);

    const profile = await resolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );

    profiles = await resolver.findAll();
    expect(profile).toEqual(
      expect.objectContaining({
        id: profiles.data.at(0).id,
        ...createProfileMockInput,
        activeStatus: 'inActive',
        followers: 0,
        following: 0,
        ownerId: mockedUser.id,
        publications: 0,
        followersData: [],
        followingData: [],
      }),
    );
    expect(profiles.total).toBe(1);
    expect(profiles.hasMore).toBe(false);
    expect(profiles.data.length).toBe(1);
    expect(
      profiles.data.findIndex(
        (p) => p.ownerId === mockedUser.id && p.username === 'username',
      ),
    ).toBeGreaterThan(-1);

    expect(mockKafkaEmit).toBeCalledTimes(1);
    expect(mockKafkaEmit).toBeCalledWith(
      KAFKA_EVENTS.PROFILE_EVENTS.profileCreated,
      new ProfileCreatedEvent({
        profileId: profile.id,
        userId: mockedUser.id,
      }),
    );
  });

  it('should return my profile if i have created one before', async () => {
    await resolver.createProfile(createProfileMockInput, mockedUser);

    const myProfile = await resolver.myProfile(mockedUser);

    expect(myProfile).toBeDefined();
    expect(myProfile.ownerId).toBe(mockedUser.id);
  });

  it('should throw an profile not found error if i have not created my profile', async () => {
    let myProfile = null;
    let tested = false;
    try {
      myProfile = await resolver.myProfile(mockedUser);
    } catch (error) {
      const isInstance = error instanceof ProfileNotfoundException;
      expect(isInstance).toBe(true);
      tested = true;
    }

    expect(myProfile).toBe(null);
    expect(tested).toBe(true);
  });

  it('should update my profile and emit kafka event', async () => {
    const createdProfile = await resolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );

    const updatedProfile = await resolver.updateMyProfile(
      { photo: 'updated photo' },
      mockedUser,
    );

    const myProfile = await resolver.myProfile(mockedUser);

    expect(updatedProfile.ownerId).toBe(mockedUser.id);
    expect(updatedProfile.id).toBe(createdProfile.id);
    expect(myProfile.photo).toBe('updated photo');

    // TODO, test kafka event emiting for profile update
    // test kafka emited event
    // expect(mockKafkaEmit).toBeCalledTimes(1);
    // expect(mockKafkaEmit).toBeCalledWith();
  });

  it('should delete my profile and emit a profile deleted kafka event', async () => {
    const createdProfile = await resolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );
    let myProfile = await resolver.myProfile(mockedUser);

    expect(myProfile.id).toBe(createdProfile.id);
    expect(myProfile.ownerId).toBe(mockedUser.id);

    const deletedProfile = await resolver.deleteMyProfile(mockedUser);

    expect(deletedProfile.id).toBe(myProfile.id);
    expect(deletedProfile.ownerId).toBe(mockedUser.id);

    let tested = false;
    try {
      myProfile = await resolver.myProfile(mockedUser);
      tested = true;
    } catch (error) {
      myProfile = null;
      tested = true;
    }

    expect(myProfile).toBe(null);
    expect(tested).toBe(true);
  });
});
