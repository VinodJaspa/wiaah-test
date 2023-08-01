import { Args, Query, Resolver } from '@nestjs/graphql';
import { ServicePost } from './entities/service-post.entity';
import { PrismaService } from 'prismaService';
import { GetUserServicesPostsInput } from './dto/get-user-services-posts.input';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlCurrentUser,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import {
  GetBulkUsersPaidBookingMessage,
  GetBulkUsersPaidBookingMessageReply,
  GetFilteredServicesMessage,
  GetFilteredServicesMessageReply,
  GetUserInterestsScoresMessage,
  GetUserInterestsScoresMessageReply,
  GetUserMostInteractionersMessage,
  GetUserMostInteractionersMessageReply,
  GetUserPaidBookingMessage,
  GetUserPaidBookingMessageReply,
} from 'nest-dto';
import { ClientKafka } from '@nestjs/microservices';
import { PostVisibility, TypeOfService } from 'prismaClient';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetRecommendedServicePostsInput } from './dto/get-recommended-service-posts.input';
import { ServicePostHashtagSearch } from './entities/service-post-hashtag-search';
import { GetHashtagTopServicePostsInput } from './dto/get-hashtag-top-service-posts.input';

@Resolver(() => ServicePost)
export class ServicePostResolver {
  rateWeight = 1;
  likeWeight = 1;
  commentWeight = 1;
  sharesWeight = 1;
  salesWeight = 1;
  distanceWeight = 1;
  keywordsWeight = 1;
  hadPurchasedWeight = 1;
  friendsPurchasedWeight = 1;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Query(() => ServicePost)
  async getServicePost(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const allowedViewers: PostVisibility[] = [PostVisibility.public];
    const res = await this.prisma.servicePost.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      const isFollower = await this.prisma.follow.findUnique({
        where: {
          followRelation: {
            followerUserId: user.id,
            followingUserId: res.userId,
          },
        },
      });

      if (isFollower) {
        allowedViewers.push(PostVisibility.followers);
      }
    }

    if (!res || !allowedViewers.includes(res.visibility))
      throw new NotFoundException('Service not found');

    return res;
  }

  @Query(() => [ServicePost])
  async getUserServicePosts(
    @Args('args') args: GetUserServicesPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    let visibility: PostVisibility[] = ['public'];

    const isFollower = await this.prisma.follow.findUnique({
      where: {
        followRelation: {
          followerUserId: user.id,
          followingUserId: args.userId,
        },
      },
    });

    if (isFollower) visibility.push('followers');

    return this.prisma.servicePost.findMany({
      where: {
        AND: [
          {
            userId: args.userId,
          },
          {
            visibility: {
              in: visibility,
            },
          },
        ],
      },
      take: args.pagination.take,
      cursor: {
        id: args.pagination.cursor,
      },
    });
  }

  @Query(() => [ServicePost])
  async getRecommendedServicePosts(
    @Args('args') args: GetRecommendedServicePostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ServicePost[]> {
    const { skip, take } = ExtractPagination(args.pagination);
    let serviceIds: string[] = [];

    const MostInteractionersPromise = KafkaMessageHandler<
      string,
      GetUserMostInteractionersMessage,
      GetUserMostInteractionersMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserMostInteractioners(),
      new GetUserMostInteractionersMessage({
        pagination: { page: 1, take: 50 },
        userId: user.id,
      }),
    );

    const myPaidServicesPromise = KafkaMessageHandler<
      string,
      GetUserPaidBookingMessage,
      GetUserPaidBookingMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.BOOKING_MESSAGES.getBookedPaidServices(),
      new GetUserPaidBookingMessage({
        userId: user.id,
      }),
    );

    const myKeywordsPromise = KafkaMessageHandler<
      string,
      GetUserInterestsScoresMessage,
      GetUserInterestsScoresMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getUserPaidProducts,
      new GetUserInterestsScoresMessage({
        userId: user.id,
        pagination: {
          page: 1,
          take: 50,
        },
      }),
    );

    const {
      results: { data, success },
    } = await MostInteractionersPromise;

    const {
      results: { data: myPaidServicesData },
    } = await myPaidServicesPromise;

    const {
      results: { data: keywordData, success: keywordsSuccess },
    } = await myKeywordsPromise;

    const servicesPosts = await this.prisma.servicePost.findMany({
      where: {
        OR: [
          {
            serviceId: {
              in: serviceIds,
            },
          },
        ],
      },
      take,
      skip,
    });

    if (success) {
      const {
        results: { data: friendsPaidProductsData },
      } = await KafkaMessageHandler<
        string,
        GetBulkUsersPaidBookingMessage,
        GetBulkUsersPaidBookingMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.PRODUCTS_MESSAGES.getBulkUsersPaidProducts,
        new GetBulkUsersPaidBookingMessage({
          pagination: {
            page: 1,
            take: 10,
          },
          userIds: data.users.map((v) => v.id),
        }),
      );

      const filteredServices = await KafkaMessageHandler<
        string,
        GetFilteredServicesMessage,
        GetFilteredServicesMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.PRODUCTS_MESSAGES.getFilteredProducts,
        new GetFilteredServicesMessage({
          keywords: keywordData.keywords.map((v) => v.value),
          city: user.city,
          country: user.country,
          lat: user.lat,
          lon: user.lon,
          pagination: { page: 0, take: 50 },
        }),
      );

      const filteredProductsIds =
        filteredServices?.results?.data?.services?.map((v) => v.id);

      serviceIds = serviceIds.concat(filteredProductsIds);

      const services = await this.prisma.servicePost.findMany({
        where: {
          AND: [
            {
              serviceId: {
                in: serviceIds,
              },
            },
            {
              visibility: {
                not: 'hidden',
              },
            },
            {
              serviceType: args.serviceType as TypeOfService,
            },
          ],
        },
        orderBy: {
          reactionNum: 'desc',
        },
      });

      const weightedProducts: (ServicePost & { score: number })[] =
        services.reduce((acc, curr) => {
          let score = 0;

          const serviceDetails = filteredServices.results.data.services.find(
            (v) => v.id === curr.serviceId,
          );

          if (serviceDetails?.rate)
            score += serviceDetails.rate * this.rateWeight;

          if (serviceDetails?.sales)
            score += serviceDetails.sales * this.salesWeight;

          if (serviceDetails?.distence)
            score += serviceDetails.distence * this.distanceWeight;

          if (serviceDetails.keywords) {
            const metKeywords = keywordData.keywords.filter((v) =>
              serviceDetails.keywords.includes(v.value),
            );
            const metKeywordsScore = metKeywords.reduce(
              (acc, curr) => acc + curr.score,
              0,
            );

            score += metKeywordsScore * this.keywordsWeight;
          }

          if (myPaidServicesData.bookings) {
            const product = myPaidServicesData.bookings.find(
              (v) => v.serviceId === curr.serviceId,
            );
            if (product) score += this.hadPurchasedWeight * 1;
          }

          if (friendsPaidProductsData?.users) {
            const friend = friendsPaidProductsData.users.find((v) =>
              v.bookings.some((c) => c.serviceId === curr.serviceId),
            );
            const friendInteration = friend
              ? data.users.find((v) => v.id === friend.id)
              : null;

            if (friend && friendInteration)
              score += this.friendsPurchasedWeight * friendInteration.score;
          }

          if (curr.reactionNum) score += curr.reactionNum * this.likeWeight;

          if (curr.comments) score += curr.comments * this.commentWeight;

          if (curr.shares) score += curr.shares * this.sharesWeight;

          return [...acc, { ...curr, score }];
        }, []);

      const sortedServices: ServicePost[] = weightedProducts.sort(
        (first, next) => next.score - first.score,
      );
      return sortedServices;
    }
  }

  @Query(() => ServicePostHashtagSearch)
  async getHashtagTopServicePosts(
    @Args('args') args: GetHashtagTopServicePostsInput,
  ): Promise<ServicePostHashtagSearch> {
    const topViewed = await this.prisma.servicePost.findFirst({
      where: {
        hashtags: {
          has: args.tag,
        },
        visibility: 'public',
      },
      orderBy: {
        views: 'desc',
      },
    });
    const topCommented = await this.prisma.servicePost.findFirst({
      where: {
        hashtags: {
          has: args.tag,
        },
        visibility: 'public',
      },
      orderBy: {
        comments: 'desc',
      },
    });
    const topLiked = await this.prisma.servicePost.findFirst({
      where: {
        hashtags: {
          has: args.tag,
        },
        visibility: 'public',
      },
      orderBy: {
        reactionNum: 'desc',
      },
    });
    const topShared = await this.prisma.servicePost.findFirst({
      where: {
        hashtags: {
          has: args.tag,
        },
        visibility: 'public',
      },
      orderBy: {
        shares: 'desc',
      },
    });

    return {
      commented: topCommented,
      liked: topLiked,
      shared: topShared,
      viewed: topViewed,
    };
  }
}
