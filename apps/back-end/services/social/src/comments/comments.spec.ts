import { ContentManagementModule } from '@content-management';
import { Profile } from '@entities';
import { CreateNewsfeedPostInput, CreateProfileInput } from '@input';
import { ContentHostTypeEnum } from '@keys';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileModule } from '@profile-module';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { mockedUser, secendMockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

describe('comments testing', () => {
  let service: CommentsService;
  let resolver: CommentsResolver;
  let mockMongo: MongoMemoryReplSet;
  let mockKafkaEmit: jest.Mock;
  let prisma: PrismaService;

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
        CommentsResolver,
        CommentsService,
        PrismaService,
        {
          provide: SERVICES.SOCIAL_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<CommentsService>(CommentsService);
    resolver = module.get<CommentsResolver>(CommentsResolver);
  });

  it('should create and delete comment on post', async () => {
    let firstProfile = await prisma.profile.create({
      data: {
        ...createProfileMockInput,
        lastActive: new Date(),
        ownerId: mockedUser.id,
      },
    });

    let secendProfile = await prisma.profile.create({
      data: {
        ...createProfileMockInput,
        lastActive: new Date(),
        ownerId: secendMockedUser.id,
      },
    });

    let newsFeedPost = await prisma.newsfeedPost.create({
      data: {
        ...createNewsfeedMockInput,
        userId: mockedUser.id,
        authorProfileId: firstProfile.id,
      },
    });

    expect((await resolver.findAll()).length).toBe(0);

    const createdComment = await resolver.createComment(
      {
        attachments: [],
        authorProfileId: secendProfile.id,
        content: 'test content',
        contentId: newsFeedPost.id,
        contentType: 'post_newsfeed',
        mentions: [],
      },
      secendMockedUser,
    );

    expect((await resolver.findAll()).length).toBe(1);

    newsFeedPost = await prisma.newsfeedPost.findUnique({
      where: { id: newsFeedPost.id },
    });

    expect(newsFeedPost.comments).toBe(1);

    // update authorization tests

    let updateTested = false;
    try {
      await resolver.updateComment(
        {
          content: 'new updated content',
          id: createdComment.id,
        },
        mockedUser,
      );
    } catch (error) {
      const isInstance = error instanceof UnauthorizedException;
      expect(isInstance).toBe(true);
      updateTested = true;
    }

    expect(updateTested).toBe(true);

    await resolver.updateComment(
      {
        content: 'update!!',
        id: createdComment.id,
      },
      secendMockedUser,
    );

    expect((await resolver.findAll()).at(0).content).toBe('update!!');

    // remove comment
    let tested = false;
    try {
      await resolver.removeComment(createdComment.id, mockedUser);
    } catch (error) {
      const isInstance = error instanceof UnauthorizedException;
      expect(isInstance).toBe(true);
      tested = true;
    }

    expect(tested).toBe(true);

    await resolver.removeComment(createdComment.id, secendMockedUser);

    expect((await resolver.findAll()).length).toBe(0);

    newsFeedPost = await prisma.newsfeedPost.findUnique({
      where: { id: newsFeedPost.id },
    });

    expect(newsFeedPost.comments).toBe(0);
  });

  it('should comment on other comments', async () => {
    let firstProfile = await prisma.profile.create({
      data: {
        ...createProfileMockInput,
        lastActive: new Date(),
        ownerId: mockedUser.id,
      },
    });

    let secendProfile = await prisma.profile.create({
      data: {
        ...createProfileMockInput,
        lastActive: new Date(),
        ownerId: secendMockedUser.id,
      },
    });

    let newsFeedPost = await prisma.newsfeedPost.create({
      data: {
        ...createNewsfeedMockInput,
        userId: mockedUser.id,
        authorProfileId: firstProfile.id,
      },
    });

    expect((await resolver.findAll()).length).toBe(0);

    const createdComment = await resolver.createComment(
      {
        attachments: [],
        authorProfileId: secendProfile.id,
        content: 'test content',
        contentId: newsFeedPost.id,
        contentType: 'post_newsfeed',
        mentions: [],
      },
      secendMockedUser,
    );

    expect((await resolver.findAll()).length).toBe(1);

    newsFeedPost = await prisma.newsfeedPost.findUnique({
      where: { id: newsFeedPost.id },
    });

    expect(newsFeedPost.comments).toBe(1);

    const secendComment = await resolver.createComment(
      {
        attachments: [],
        authorProfileId: firstProfile.id,
        content: 'secend comment',
        contentId: createdComment.id,
        contentType: ContentHostTypeEnum.COMMENT,
        mentions: [],
      },
      mockedUser,
    );

    newsFeedPost = await prisma.newsfeedPost.findUnique({
      where: { id: newsFeedPost.id },
    });

    expect((await resolver.findAll()).length).toBe(2);

    expect((await resolver.findAll()).at(1)).toEqual(
      expect.objectContaining({
        hostId: createdComment.id,
        hostType: ContentHostTypeEnum.COMMENT,
      }),
    );
  });
});
