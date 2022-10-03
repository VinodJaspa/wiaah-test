import { CommentsResolver } from '@comments';
import { ContentDiscoveryModule } from '@content-discovery';
import { ContentManagementModule } from '@content-management';
import { CreateNewsfeedPostInput, CreateProfileInput } from '@input';
import { ClientKafka } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsfeedPostsResolver } from '@posts-newsfeed';
import { ProfileResolver } from '@profile';
import { ProfileModule } from '@profile-module';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { mockedUser, secendMockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { ReactionResolver } from './reaction.resolver';
import { ReactionService } from './reaction.service';

describe('Reaction tests', () => {
  let service: ReactionService;
  let resolver: ReactionResolver;
  let mockMongo: MongoMemoryReplSet;
  let mockKafkaEmit: jest.Mock;
  let profileResolver: ProfileResolver;
  let newsfeedResolver: NewsfeedPostsResolver;
  let commentsResolver: CommentsResolver;

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

  afterEach(async () => await mockMongo.stop());

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockMongo = await MongoMemoryReplSet.create({
      replSet: { count: 1 },
      instanceOpts: [{ storageEngine: 'wiredTiger' }],
    });
    process.env.DATABASE_URL = mockMongo.getUri('testDB');

    const module: TestingModule = await Test.createTestingModule({
      imports: [ProfileModule, ContentManagementModule, ContentDiscoveryModule],
      providers: [
        ReactionResolver,
        ReactionService,
        PrismaService,
        {
          provide: SERVICES.SOCIAL_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    })
      .overrideProvider(ClientKafka)
      .useValue({ emit: mockKafkaEmit })
      .compile();

    service = module.get<ReactionService>(ReactionService);
    resolver = module.get<ReactionResolver>(ReactionResolver);
    profileResolver = module.get<ProfileResolver>(ProfileResolver);
    newsfeedResolver = module.get<NewsfeedPostsResolver>(NewsfeedPostsResolver);
    commentsResolver = module.get<CommentsResolver>(CommentsResolver);
  });

  it('should create a reaction record on post', async () => {
    await profileResolver.createProfile(createProfileMockInput, mockedUser);

    const secendProfile = await profileResolver.createProfile(
      createProfileMockInput,
      secendMockedUser,
    );

    let post = await newsfeedResolver.createNewsfeedPost(
      createNewsfeedMockInput,
      mockedUser,
    );

    expect((await newsfeedResolver.findAll()).length).toBe(1);
    expect((await newsfeedResolver.findAll()).at(0).id).toBe(post.id);

    const reaction = await resolver.createReaction(
      {
        authorProfileId: secendProfile.id,
        contentId: post.id,
        contentType: 'post_newsfeed',
      },
      secendMockedUser,
    );

    expect(reaction).toBeDefined();
    expect((await service.findAll()).length).toBe(1);

    expect((await newsfeedResolver.findAll()).at(0).reactionNum).toBe(1);

    await resolver.removeReaction(
      {
        contentId: post.id,
        contentType: 'post_newsfeed',
      },
      secendMockedUser,
    );

    expect((await newsfeedResolver.findAll()).at(0).reactionNum).toBe(0);

    expect((await service.findAll()).length).toBe(0);
  });

  it('should create a reaction record on comment', async () => {
    const profile = await profileResolver.createProfile(
      createProfileMockInput,
      mockedUser,
    );

    const secendProfile = await profileResolver.createProfile(
      createProfileMockInput,
      secendMockedUser,
    );
    let post = await newsfeedResolver.createNewsfeedPost(
      createNewsfeedMockInput,
      mockedUser,
    );
    let comment = await commentsResolver.createComment(
      {
        attachments: [],
        authorProfileId: profile.id,
        content: 'test comment content',
        contentId: post.id,
        contentType: 'post_newsfeed',
        mentions: [],
      },
      secendMockedUser,
    );

    expect((await commentsResolver.findAll()).length).toBe(1);
    expect((await commentsResolver.findAll()).at(0).id).toBe(comment.id);

    const reaction = await resolver.createReaction(
      {
        authorProfileId: secendProfile.id,
        contentId: comment.id,
        contentType: 'comment',
      },
      mockedUser,
    );

    expect(reaction).toBeDefined();

    expect((await commentsResolver.findAll()).at(0).likes).toBe(1);

    await resolver.removeReaction(
      {
        contentId: comment.id,
        contentType: 'comment',
      },
      mockedUser,
    );

    expect((await service.findAll()).length).toBe(0);
    expect((await commentsResolver.findAll()).at(0).likes).toBe(0);
  });
});
