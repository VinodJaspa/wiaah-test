import { ApolloFederationDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '@prisma-module';
import {
  mockedUser,
  secendMockedUser,
  sleep,
  thirdMockedUser,
  waitFor,
} from 'nest-utils';
import { Story } from 'prismaClient';
import { PrismaService } from 'prismaService';

import * as request from 'supertest';
import { RecentStory } from '../entities';

import { StoryModule } from '../story.module';

describe('Story tests', () => {
  let app: NestApplication;
  let mockUserFromRequest: jest.Mock;
  let prisma: PrismaService;

  beforeEach(async () => {
    mockUserFromRequest = jest.fn().mockReturnValue(mockedUser);
    const moduleRef = await Test.createTestingModule({
      imports: [
        StoryModule,
        PrismaModule,
        GraphQLModule.forRoot({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          context: ({ req, res }: any) => ({
            req,
            res,
            user: mockUserFromRequest(),
          }),
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();

    await prisma.follow.create({
      data: {
        followerProfileId: mockedUser.shopId,
        followingProfileId: secendMockedUser.shopId,
        followerUserId: mockedUser.id,
        followingUserId: secendMockedUser.id,
      },
    });
  });

  function requestGraphql<TData extends Record<string, any>>(
    query: string,
    variables: TData,
  ) {
    return request(app.getHttpServer()).post('/graphql').send({
      query,
      variables,
    });
  }

  it('should create story, other users gets updated recent stories, other users can see story, story owner can see new story viewers', async () => {
    const recent_stories_query = `
    query getRecentStories {
      getRecentStories {
            newStory
            userId
            user {
                id
            }
        }
    }
    `;

    const res = await requestGraphql(recent_stories_query, {}).expect(200);

    expect(res.body.errors).toStrictEqual(undefined);
    expect(res.body.data).toStrictEqual({
      getRecentStories: [],
    });

    const create_story_mutation = `
      mutation createStory($content:String!) {
        createStory(
            createStoryInput:{
                content:$content,
            }
        ) {
            type
            id
            content
        }
    }
    `;

    mockUserFromRequest.mockReturnValue(secendMockedUser);

    const storyCreated = await requestGraphql(create_story_mutation, {
      content: 'test content',
    }).expect(200);

    expect(storyCreated.body.errors).toBe(undefined);
    expect(storyCreated.body).toMatchObject({
      data: {
        createStory: {
          content: 'test content',
          type: 'text',
        },
      },
    });

    const story = await prisma.story.findFirst();
    expect(story).toMatchObject({
      content: 'test content',
      type: 'text',
      publisherId: secendMockedUser.id,
    } as Story);

    mockUserFromRequest.mockReturnValue(mockedUser);

    let recentStories = await requestGraphql(recent_stories_query, {}).expect(
      200,
    );

    expect(recentStories.body).toMatchObject({
      data: {
        getRecentStories: [
          {
            newStory: true,
            userId: secendMockedUser.id,
          } as RecentStory,
        ],
      },
    });

    mockUserFromRequest.mockReturnValue(secendMockedUser);
    recentStories = await requestGraphql(recent_stories_query, {}).expect(200);

    expect(recentStories.body).toMatchObject({
      data: {
        getRecentStories: [],
      },
    });

    mockUserFromRequest.mockReturnValue(mockedUser);

    const view_user_story_query = `
    query getUserStory($userId:String!) {
      getUserStory(
          userId:$userId
      ){
          id
          publisherId
          content
          type
        }
      }
    `;

    let viewRes = await requestGraphql(view_user_story_query, {
      userId: secendMockedUser.id,
    });

    expect(viewRes.body).toMatchObject({
      data: {
        getUserStory: {
          publisherId: secendMockedUser.id,
          content: 'test content',
          type: 'text',
        },
      },
    });

    await waitFor(async () => {
      expect((await prisma.story.findFirst()).viewsCount).toEqual(1);
    });

    mockUserFromRequest.mockReturnValue(thirdMockedUser);
    viewRes = await requestGraphql(view_user_story_query, {
      userId: secendMockedUser.id,
    });

    expect(viewRes.body.errors).toBeDefined();
    expect(viewRes.body).toMatchObject({
      data: null,
    });

    await waitFor(async () => {
      expect((await prisma.story.findFirst()).viewsCount).toBe(1);
    });
    // like / unlike story
    mockUserFromRequest.mockReturnValue(mockedUser);

    const like_story_mutation = `
      mutation likeStory($storyId:ID!) {
        likeStory(
            likeStoryInput:{
                storyId:$storyId
            }
          )
        }
    `;

    let likeRes = await requestGraphql(like_story_mutation, {
      storyId: story.id,
    });

    expect(likeRes.body).toStrictEqual({
      data: {
        likeStory: true,
      },
    });

    expect((await prisma.storyLike.findMany()).length).toBe(1);
    expect((await prisma.storyLike.findFirst()).storyId).toBe(story.id);
    expect((await prisma.storyLike.findFirst()).userId).toBe(mockedUser.id);

    mockUserFromRequest.mockReturnValue(secendMockedUser);
    likeRes = await requestGraphql(like_story_mutation, {
      storyId: story.id,
    }).expect(200);

    expect(likeRes.body.errors).toBeDefined();

    expect((await prisma.storyLike.findMany()).length).toBe(1);
    expect((await prisma.storyLike.findFirst()).userId).toBe(mockedUser.id);

    mockUserFromRequest.mockReturnValue(mockedUser);
    const dislike_story_mutation = `
      mutation likeStory($storyId:ID!) {
        likeStory(
            likeStoryInput:{
                storyId:$storyId
            }
          )
        }
    `;

    let dislikeRes = await requestGraphql(dislike_story_mutation, {
      storyId: story.id,
    });

    expect(dislikeRes.body).toStrictEqual({
      data: {
        likeStory: true,
      },
    });

    expect((await prisma.storyLike.findMany()).length).toBe(0);

    mockUserFromRequest.mockReturnValue(secendMockedUser);

    dislikeRes = await requestGraphql(dislike_story_mutation, {
      storyId: story.id,
    }).expect(200);

    expect(dislikeRes.body.errors).toBeDefined();

    expect((await prisma.storyLike.findMany()).length).toBe(0);

    // get story data

    const get_my_stories_query = `
    query getMyStories {
      getMyStories {
          id
      }
    }
    `;

    mockUserFromRequest.mockReturnValue(mockedUser);
    let storiesRes = await requestGraphql(get_my_stories_query, {}).expect(200);

    expect(storiesRes.body.errors).not.toBeDefined();
    expect(storiesRes.body.data.getMyStories).toStrictEqual([]);

    mockUserFromRequest.mockReturnValue(secendMockedUser);
    storiesRes = await requestGraphql(get_my_stories_query, {}).expect(200);

    expect(storiesRes.body.errors).not.toBeDefined();
    expect(storiesRes.body.data.getMyStories).toStrictEqual([{ id: story.id }]);

    // story views

    const get_story_views_query = `
    query getStoryViews($storyId:ID!){
    getStoryViews (
        getStoryViewsInput:{
            storyId:$storyId,
            pagination:{
                page:1,
                take:10
            }
        }
    ){
        viewerId
        storyId
    }
}
    `;

    mockUserFromRequest.mockReturnValue(mockedUser);
    let viewsRes = await requestGraphql(get_story_views_query, {
      storyId: story.id,
    }).expect(200);

    expect(viewsRes.body.errors).toBeDefined();
    expect(viewsRes.body.data).toBe(null);

    mockUserFromRequest.mockReturnValue(secendMockedUser);
    viewsRes = await requestGraphql(get_story_views_query, {
      storyId: story.id,
    }).expect(200);

    expect(viewsRes.body.errors).not.toBeDefined();
    expect(viewsRes.body.data).toStrictEqual({
      getStoryViews: [
        {
          storyId: story.id,
          viewerId: mockedUser.id,
        },
      ],
    });
  });

  async function validateStoryViewCount(storyId: string, count: number) {
    const story = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
    console.log({ story });
    expect(story.viewsCount).toBe(count);
    expect(
      (
        await prisma.follow.findUnique({
          where: {
            followRelation: {
              followerUserId: mockedUser.id,
              followingUserId: story.publisherId,
            },
          },
        })
      ).followerLastStorySeenAt,
    ).toStrictEqual(story.createdAt);
  }

  it('should get next and prev story', async () => {
    const create_story_mutation = `
      mutation createStory($content:String!) {
        createStory(
            createStoryInput:{
                content:$content,
            }
        ) {
            type
            id
            content
        }
    }
    `;

    mockUserFromRequest.mockReturnValue(secendMockedUser);

    const storyCreated1 = await requestGraphql(create_story_mutation, {
      content: 'test content',
    }).expect(200);
    const storyCreated2 = await requestGraphql(create_story_mutation, {
      content: 'test content',
    }).expect(200);
    const storyCreated3 = await requestGraphql(create_story_mutation, {
      content: 'test content',
    }).expect(200);
    const storyCreated4 = await requestGraphql(create_story_mutation, {
      content: 'test content',
    }).expect(200);
    const storyCreated5 = await requestGraphql(create_story_mutation, {
      content: 'test content',
    }).expect(200);

    const view_user_story_query = `
    query getUserStory($userId:String!) {
      getUserStory(
          userId:$userId
      ){
          id
          publisherId
          content
          type
        }
      }
    `;

    mockUserFromRequest.mockReturnValue(mockedUser);
    let viewRes = await requestGraphql(view_user_story_query, {
      userId: secendMockedUser.id,
    });

    expect(viewRes.body.data.getUserStory.id).toBe(
      storyCreated1.body.data.createStory.id,
    );
    await waitFor(async () => {
      await validateStoryViewCount(storyCreated1.body.data.createStory.id, 1);
    });

    console.log(await prisma.story.findMany());
    viewRes = await requestGraphql(view_user_story_query, {
      userId: secendMockedUser.id,
    });

    expect(viewRes.body.data.getUserStory.id).toBe(
      storyCreated2.body.data.createStory.id,
    );
  });
});
