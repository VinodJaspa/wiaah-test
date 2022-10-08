import { ContentManagementModule } from '@content-management';
import { NewsfeedPost } from '@entities';
import { ProfileNotfoundException } from '@exceptions';
import { CreateNewsfeedPostInput, CreateProfileInput } from '@input';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileModule } from '@profile';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import {
  AuthorizationDecodedUser,
  mockedUser,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { NewsfeedPostsResolver } from './newsfeed-posts.resolver';
import { NewsfeedPostsService } from './newsfeed-posts.service';

async function createProfile(
  input: CreateProfileInput,
  user: AuthorizationDecodedUser,
) {
  const prisma = new PrismaService();
  return await prisma.profile.create({
    data: {
      ...input,
      ownerId: user.id,
      lastActive: new Date(),
    },
  });
}

describe('newsfeed posts testing', () => {
  let service: NewsfeedPostsService;
  let resolver: NewsfeedPostsResolver;
  let mockMongo: MongoMemoryReplSet;
  let mockKafkaEmit: jest.Mock;

  const createProfileMockInput: CreateProfileInput = {
    photo: 'test-photo',
    username: 'username',
    profession: 'test pro',
    bio: 'test bio',
    visibility: 'public',
  };

  const createNewsfeedMockInput: CreateNewsfeedPostInput = {
    attachments: [{ src: 'test src', type: 'img' }],
    content: 'test content',
    mentions: [{ profileId: 'test profile id', userId: 'test user id' }],
    tags: [{ tag: 'test' }, { tag: 'fun' }],
    title: 'test title',
    visibility: 'public',
    location: {
      address: 'test address',
      city: 'test city',
      country: 'test country',
      state: 'test state',
    },
  };

  const updatedNewsfeedMockInput: CreateNewsfeedPostInput = {
    attachments: [{ src: 'test attach', type: 'text' }],
    content: 'test updated content',
    location: {
      address: 'updated address',
      city: 'updated City',
      country: 'updated country',
      state: 'updated state',
    },
    mentions: [{ userId: 'updated user id', profileId: 'updated profile id' }],
    tags: [{ tag: 'updated' }, { tag: 'update' }],
    title: 'updated title',
    visibility: 'hidden',
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
      imports: [ProfileModule, ContentManagementModule],
      providers: [
        NewsfeedPostsResolver,
        NewsfeedPostsService,
        PrismaService,
        {
          provide: SERVICES.SOCIAL_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    }).compile();

    service = module.get<NewsfeedPostsService>(NewsfeedPostsService);
    resolver = module.get<NewsfeedPostsResolver>(NewsfeedPostsResolver);
  });

  it('should throw and error when creating a post and the user doesnt have a profile', async () => {
    let tested = false;
    try {
      const post = await resolver.createNewsfeedPost(
        createNewsfeedMockInput,
        mockedUser,
      );
    } catch (error) {
      const isInstance = error instanceof ProfileNotfoundException;

      expect(isInstance).toBe(true);
      tested = true;
    }

    expect(tested).toBe(true);
  });

  it('should create and return newsfeed post succesfully if user has profile, and fires post created kafka event', async () => {
    const profile = await createProfile(createProfileMockInput, mockedUser);
    const post = await resolver.createNewsfeedPost(
      createNewsfeedMockInput,
      mockedUser,
    );

    const allPosts = await resolver.findAll();

    expect(allPosts.length).toBe(1);

    expect(post).toBeDefined();
    expect(post.userId).toBe(mockedUser.id);
    expect(post.authorProfileId).toBe(profile.id);
    expect(post).toEqual(
      expect.objectContaining({
        ...createNewsfeedMockInput,
        userId: mockedUser.id,
        authorProfileId: profile.id,
      }),
    );

    // TODO: ADD NEWSFEED POST CREATED EVENT
    // expect(mockKafkaEmit).toBeCalledTimes(1)
    // expect(mockKafkaEmit).toBeCalledWith(KAFKA_EVENTS.NEWSFEED_POST_EVENTS.postCreated,new NewsfeedPostCreatedEvent())
  });

  it('should update post if the user is the owner of it', async () => {
    const profile = await createProfile(createProfileMockInput, mockedUser);
    const post = await resolver.createNewsfeedPost(
      createNewsfeedMockInput,
      mockedUser,
    );

    expect((await resolver.findAll()).at(0).userId).toBe(profile.ownerId);
    const objectKeys = Object.entries(updatedNewsfeedMockInput);
    let trackKeys = 0;
    const updatedPost = await resolver.updateNewsfeedPost(
      { ...updatedNewsfeedMockInput, id: post.id },
      mockedUser,
    );

    Object.entries(updatedNewsfeedMockInput).forEach(([key, value], i) => {
      expect(updatedPost[key]).toStrictEqual(value);
      trackKeys++;
    });

    expect(trackKeys).toBe(objectKeys.length);
  });

  it('should throw an error when updating a post and the user is not the owner of it', async () => {
    const profile = await createProfile(createProfileMockInput, mockedUser);
    const post = await resolver.createNewsfeedPost(
      createNewsfeedMockInput,
      mockedUser,
    );

    expect((await resolver.findAll()).at(0).userId).toBe(profile.ownerId);
    let updatedPost: NewsfeedPost = null;
    let tested = false;

    const secendProfile = await createProfile(
      createProfileMockInput,
      secendMockedUser,
    );

    try {
      updatedPost = await resolver.updateNewsfeedPost(
        { ...updatedNewsfeedMockInput, id: post.id },
        secendMockedUser,
      );
    } catch (error) {
      const isInstance = error instanceof UnauthorizedException;
      expect(isInstance).toBe(true);
      tested = true;
    }

    expect(updatedPost).toBeNull();
    expect(tested).toBe(true);
  });

  it('should remove post if the user is the owner of it', async () => {
    await createProfile(createProfileMockInput, mockedUser);
    const post = await resolver.createNewsfeedPost(
      createNewsfeedMockInput,
      mockedUser,
    );

    expect((await resolver.findAll()).length).toBe(1);

    const deleted = await resolver.removeNewsfeedPost(post.id, mockedUser);

    expect(deleted.id).toBe(post.id);
    expect(deleted.userId).toBe(mockedUser.id);

    expect((await resolver.findAll()).length).toBe(0);
  });

  it('should throw an error if user trying to delete a post hes not the owner of it', async () => {
    await createProfile(createProfileMockInput, mockedUser);
    const post = await resolver.createNewsfeedPost(
      createNewsfeedMockInput,
      mockedUser,
    );

    expect((await resolver.findAll()).length).toBe(1);

    let deleted: NewsfeedPost = null;
    let tested = false;
    try {
      deleted = await resolver.removeNewsfeedPost(post.id, secendMockedUser);
    } catch (error) {
      const isInstance = error instanceof UnauthorizedException;
      expect(isInstance).toBe(true);
      tested = true;
    }

    expect(deleted).toBeNull();
    expect(tested).toBe(true);
    expect((await resolver.findAll()).length).toBe(1);
  });
});
