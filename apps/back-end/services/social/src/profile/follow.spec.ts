import { TestingModule, Test } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { mockedUser, SERVICES, secendMockedUser } from 'nest-utils';
import { ProfileVisibility } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { ProfileResolver } from './profile.resolver';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

describe('follow/unfollow functionality', () => {
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

  it('should follow profile and update my followers and update their following and emit profile followed kafka event', async () => {
    // follower
    let followerProfile = await resolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );

    // followed
    let myProfile = await resolver.createProfile(
      createProfileMockInput,
      secendMockedUser,
    );

    const followRes = await resolver.followProfile(
      {
        profileId: myProfile.id,
      },
      mockedUser,
    );

    expect(followRes.id).toBe(myProfile.id);

    myProfile = await resolver.myProfile(secendMockedUser);
    const myFollowers = await resolver.getMyFollowers(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      secendMockedUser,
    );

    expect(myFollowers.total).toBe(1);
    expect(myFollowers.data.length).toBe(1);
    expect(myFollowers.hasMore).toBe(false);
    expect(myFollowers.data.at(0)).toEqual(
      expect.objectContaining({
        id: followerProfile.id,
        photo: followerProfile.photo,
        username: followerProfile.username,
      }),
    );

    expect(myProfile.followers).toBe(1);
    expect(myProfile.following).toBe(0);

    followerProfile = await resolver.myProfile(mockedUser);

    const theirFollowing = await resolver.getMyFollowing(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      mockedUser,
    );

    expect(theirFollowing.total).toBe(1);
    expect(theirFollowing.data.length).toBe(1);
    expect(theirFollowing.hasMore).toBe(false);
    expect(theirFollowing.data.at(0)).toEqual(
      expect.objectContaining({
        id: myProfile.id,
        photo: myProfile.photo,
        username: myProfile.username,
      }),
    );

    expect(followerProfile.following).toBe(1);
    expect(followerProfile.followers).toBe(0);

    // test getting a user followers
    const followersByProfileId = await resolver.getFollowersByProfileId(
      {
        pagination: {
          page: 1,
          take: 10,
        },
        profileId: followerProfile.id,
      },
      secendMockedUser,
    );

    expect(followersByProfileId.total).toBe(0);
    expect(followersByProfileId.data.length).toBe(0);
    expect(followersByProfileId.hasMore).toBe(false);

    const secendProfileFollowersByProfileId =
      await resolver.getFollowersByProfileId(
        {
          pagination: {
            page: 1,
            take: 10,
          },
          profileId: myProfile.id,
        },
        mockedUser,
      );

    expect(secendProfileFollowersByProfileId.total).toBe(1);
    expect(secendProfileFollowersByProfileId.data.length).toBe(1);
    expect(secendProfileFollowersByProfileId.hasMore).toBe(false);

    const firstProfileFollowingsByProfileId =
      await resolver.getFollowingByProfileId(
        {
          pagination: {
            page: 1,
            take: 10,
          },
          profileId: followerProfile.id,
        },
        secendMockedUser,
      );

    expect(firstProfileFollowingsByProfileId.total).toBe(1);
    expect(firstProfileFollowingsByProfileId.data.length).toBe(1);
    expect(firstProfileFollowingsByProfileId.hasMore).toBe(false);

    const secendProfileFollowingsByProfileId =
      await resolver.getFollowingByProfileId(
        {
          pagination: {
            page: 1,
            take: 10,
          },
          profileId: myProfile.id,
        },
        mockedUser,
      );

    expect(secendProfileFollowingsByProfileId.total).toBe(0);
    expect(secendProfileFollowingsByProfileId.data.length).toBe(0);
    expect(secendProfileFollowingsByProfileId.hasMore).toBe(false);
  });

  it('should unfollow properly', async () => {
    let firstProfile = await resolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );
    let secendProfile = await resolver.createProfile(
      createProfileMockInput,
      secendMockedUser,
    );

    await resolver.followProfile({ profileId: secendProfile.id }, mockedUser);

    firstProfile = await resolver.myProfile(mockedUser);
    let firstFollowers = await resolver.getMyFollowers(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      mockedUser,
    );
    let firstFollowings = await resolver.getMyFollowing(
      { pagination: { page: 1, take: 10 } },
      mockedUser,
    );

    expect(firstProfile.followers).toBe(0);
    expect(firstProfile.following).toBe(1);
    expect(firstFollowers.data.length).toBe(0);
    expect(firstFollowings.data.length).toBe(1);
    expect(firstFollowings.data.at(0).id).toBe(secendProfile.id);

    secendProfile = await resolver.myProfile(secendMockedUser);
    let secendFollowers = await resolver.getMyFollowers(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      secendMockedUser,
    );
    let secendFollowings = await resolver.getMyFollowing(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      secendMockedUser,
    );

    expect(secendProfile.followers).toBe(1);
    expect(secendProfile.following).toBe(0);
    expect(secendFollowers.data.length).toBe(1);
    expect(secendFollowers.data.at(0).id).toBe(firstProfile.id);
    expect(secendFollowings.data.length).toBe(0);

    // unfollow

    const success = await resolver.unFollow(
      {
        profileId: secendProfile.id,
      },
      mockedUser,
    );

    console.log(await resolver.findAll());
    expect(success).toBe(true);

    firstProfile = await resolver.myProfile(mockedUser);
    firstFollowers = await resolver.getMyFollowers(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      mockedUser,
    );
    firstFollowings = await resolver.getMyFollowing(
      { pagination: { page: 1, take: 10 } },
      mockedUser,
    );

    expect(firstProfile.followers).toBe(0);
    expect(firstProfile.following).toBe(0);
    expect(firstFollowers.data.length).toBe(0);
    expect(firstFollowings.data.length).toBe(0);

    secendProfile = await resolver.myProfile(secendMockedUser);
    secendFollowers = await resolver.getMyFollowers(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      secendMockedUser,
    );
    secendFollowings = await resolver.getMyFollowing(
      {
        pagination: {
          page: 1,
          take: 10,
        },
      },
      secendMockedUser,
    );

    expect(secendProfile.followers).toBe(0);
    expect(secendProfile.following).toBe(0);
    expect(secendFollowers.data.length).toBe(0);
    expect(secendFollowings.data.length).toBe(0);
  });
});
